<?php
/**
 * HIBRADE Security Monitoring Script
 * This script monitors security events and logs suspicious activities
 */

// Include security configuration
$config = require 'security-config.php';

// Security Monitoring Class
class SecurityMonitor {
    private $logFile;
    private $config;

    public function __construct() {
        global $config;
        $this->config = $config;
        $this->logFile = $this->config['SECURITY_LOG_FILE'];
        $this->ensureLogFile();
    }

    private function ensureLogFile() {
        if (!file_exists($this->logFile)) {
            touch($this->logFile);
            if (file_exists($this->logFile)) {
                chmod($this->logFile, 0600); // Secure permissions
            }
        }
    }

    public function logSecurityEvent($event, $details = [], $severity = 'INFO') {
        $timestamp = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

        $logEntry = [
            'timestamp' => $timestamp,
            'ip' => $ip,
            'user_agent' => $userAgent,
            'event' => $event,
            'severity' => $severity,
            'details' => json_encode($details)
        ];

        $logLine = json_encode($logEntry) . PHP_EOL;
        file_put_contents($this->logFile, $logLine, FILE_APPEND | LOCK_EX);

        // Rotate log if too large
        if (filesize($this->logFile) > $this->config['MAX_LOG_SIZE']) {
            $this->rotateLog();
        }

        // Alert on high severity events
        if ($severity === 'CRITICAL' || $severity === 'HIGH') {
            $this->sendAlert($logEntry);
        }
    }

    private function rotateLog() {
        $backupFile = $this->logFile . '.' . date('Y-m-d-H-i-s') . '.bak';
        rename($this->logFile, $backupFile);
        touch($this->logFile);
        chmod($this->logFile, 0600);
    }

    private function sendAlert($logEntry) {
        $alertEmail = $this->config['ALERT_EMAIL'];
        if (!empty($alertEmail)) {
            $subject = "HIBRADE Security Alert: {$logEntry['event']}";
            $message = "Security Event Detected:\n\n" .
                      "Time: {$logEntry['timestamp']}\n" .
                      "IP: {$logEntry['ip']}\n" .
                      "Event: {$logEntry['event']}\n" .
                      "Severity: {$logEntry['severity']}\n" .
                      "Details: {$logEntry['details']}\n";

            mail($alertEmail, $subject, $message);
        }
    }

    public function checkSuspiciousActivity($input) {
        $patterns = $this->config['SUSPICIOUS_PATTERNS'] ?? [];
        foreach ($patterns as $pattern) {
            if (stripos($input, $pattern) !== false) {
                $this->logSecurityEvent('SUSPICIOUS_PATTERN_DETECTED', [
                    'pattern' => $pattern,
                    'input' => substr($input, 0, 100) . '...'
                ], 'HIGH');
                return true;
            }
        }
        return false;
    }

    public function checkRateLimit($identifier, $action = 'general') {
        $key = "rate_limit_{$action}_{$identifier}";
        $currentTime = time();

        // Simple file-based rate limiting (for better performance, use Redis/Memcached)
        $rateFile = sys_get_temp_dir() . '/hibrade_rate_' . md5($key) . '.tmp';

        if (file_exists($rateFile)) {
            $data = json_decode(file_get_contents($rateFile), true);
            if ($data && isset($data['count']) && isset($data['window_start'])) {
                if ($currentTime - $data['window_start'] < $this->config['RATE_LIMIT_WINDOW']) {
                    if ($data['count'] >= $this->config['RATE_LIMIT_REQUESTS']) {
                        $this->logSecurityEvent('RATE_LIMIT_EXCEEDED', [
                            'identifier' => $identifier,
                            'action' => $action,
                            'count' => $data['count']
                        ], 'MEDIUM');
                        return false;
                    }
                    $data['count']++;
                } else {
                    $data = ['count' => 1, 'window_start' => $currentTime];
                }
            } else {
                $data = ['count' => 1, 'window_start' => $currentTime];
            }
        } else {
            $data = ['count' => 1, 'window_start' => $currentTime];
        }

        file_put_contents($rateFile, json_encode($data));
        return true;
    }

    public function validateSecurityHeaders() {
        $missingHeaders = [];
        foreach ($this->config['REQUIRED_HEADERS'] as $header) {
            if (!isset($_SERVER['HTTP_' . strtoupper(str_replace('-', '_', $header))])) {
                $missingHeaders[] = $header;
            }
        }

        if (!empty($missingHeaders)) {
            $this->logSecurityEvent('MISSING_SECURITY_HEADERS', [
                'missing' => $missingHeaders
            ], 'MEDIUM');
        }
    }

    public function getSecurityStats() {
        $stats = [
            'total_events' => 0,
            'critical_events' => 0,
            'high_events' => 0,
            'recent_events' => []
        ];

        if (file_exists($this->logFile)) {
            $lines = file($this->logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $stats['total_events'] = count($lines);

            $recentLines = array_slice($lines, -10); // Last 10 events
            foreach ($recentLines as $line) {
                $entry = json_decode($line, true);
                if ($entry) {
                    $stats['recent_events'][] = $entry;
                    if ($entry['severity'] === 'CRITICAL') $stats['critical_events']++;
                    if ($entry['severity'] === 'HIGH') $stats['high_events']++;
                }
            }
        }

        return $stats;
    }
}

// Initialize security monitor
$securityMonitor = new SecurityMonitor();

// Function to sanitize input
function sanitizeInput($input) {
    global $securityMonitor;

    // Check for suspicious patterns
    if ($securityMonitor->checkSuspiciousActivity($input)) {
        return false; // Block suspicious input
    }

    // Sanitize HTML
    $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');

    // Remove null bytes and other dangerous characters
    $input = str_replace(["\0", "\r", "\n"], '', $input);

    return $input;
}

// Function to validate email with security checks
function validateSecureEmail($email) {
    global $securityMonitor;

    // Check for suspicious patterns in email
    if ($securityMonitor->checkSuspiciousActivity($email)) {
        $securityMonitor->logSecurityEvent('SUSPICIOUS_EMAIL_DETECTED', [
            'email' => substr($email, 0, 50) . '...'
        ], 'HIGH');
        return false;
    }

    // Basic email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    // Additional security checks
    $email = strtolower($email);

    // Check for common attack patterns
    $suspiciousPatterns = [
        '..', ' ', '<', '>', '"', "'", '\\',
        'javascript:', 'vbscript:', 'data:', 'file:'
    ];

    foreach ($suspiciousPatterns as $pattern) {
        if (strpos($email, $pattern) !== false) {
            $securityMonitor->logSecurityEvent('MALICIOUS_EMAIL_PATTERN', [
                'email' => $email,
                'pattern' => $pattern
            ], 'HIGH');
            return false;
        }
    }

    return $email;
}

// Function to check rate limiting
function checkRateLimit($identifier, $action = 'form_submit') {
    global $securityMonitor;
    return $securityMonitor->checkRateLimit($identifier, $action);
}

// Function to log security events
function logSecurityEvent($event, $details = [], $severity = 'INFO') {
    global $securityMonitor;
    $securityMonitor->logSecurityEvent($event, $details, $severity);
}

// Validate security headers on each request
$securityMonitor->validateSecurityHeaders();

?>
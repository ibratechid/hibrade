<?php
/**
 * HIBRADE Security Test Suite
 * This script tests all security measures implemented
 */

require_once 'security-monitor.php';

class SecurityTester {
    private $securityMonitor;
    private $results = [];

    public function __construct() {
        $this->securityMonitor = new SecurityMonitor();
    }

    public function runAllTests() {
        echo "<h1>HIBRADE Security Test Results</h1>";
        echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px; border-radius: 5px;'>";

        $this->testInputSanitization();
        $this->testSuspiciousPatternDetection();
        $this->testRateLimiting();
        $this->testEmailValidation();
        $this->testSecurityHeaders();
        $this->testFileSecurity();

        echo "</div>";
        echo "<h2>Test Summary</h2>";
        echo "<p>Tests Passed: " . count(array_filter($this->results)) . " / " . count($this->results) . "</p>";
    }

    private function testInputSanitization() {
        echo "<h3>Testing Input Sanitization</h3>";

        $testCases = [
            ["<script>alert('xss')</script>", "XSS Script"],
            ["<img src=x onerror=alert(1)>", "XSS Image"],
            ["' OR '1'='1", "SQL Injection"],
            ["normal text", "Normal Input"],
            ["<b>bold</b>", "HTML Tags"]
        ];

        foreach ($testCases as $testCase) {
            $result = sanitizeInput($testCase[0]);
            $passed = $result !== false && !preg_match('/<script|<img|on\w+=|\' OR \'/', $result);
            $this->results[] = $passed;

            echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
            echo "✓ " . $testCase[1] . ": " . ($passed ? 'PASSED' : 'FAILED');
            echo "</div>";
        }
    }

    private function testSuspiciousPatternDetection() {
        echo "<h3>Testing Suspicious Pattern Detection</h3>";

        $testCases = [
            ["union select * from users", "SQL Union"],
            ["<iframe src='evil.com'>", "Iframe Injection"],
            ["javascript:alert(1)", "JavaScript URL"],
            ["eval(base64_decode('test'))", "PHP Eval"],
            ["normal query", "Normal Query"]
        ];

        foreach ($testCases as $testCase) {
            $detected = $this->securityMonitor->checkSuspiciousActivity($testCase[0]);
            $expected = !in_array($testCase[1], ["Normal Query"]);
            $passed = $detected === $expected;
            $this->results[] = $passed;

            echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
            echo "✓ " . $testCase[1] . ": " . ($passed ? 'PASSED' : 'FAILED');
            echo "</div>";
        }
    }

    private function testRateLimiting() {
        echo "<h3>Testing Rate Limiting</h3>";

        $identifier = 'test_user_' . time();

        // Test normal requests
        $passed = true;
        for ($i = 0; $i < 5; $i++) {
            if (!checkRateLimit($identifier)) {
                $passed = false;
                break;
            }
        }

        $this->results[] = $passed;
        echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
        echo "✓ Rate Limiting (Normal): " . ($passed ? 'PASSED' : 'FAILED');
        echo "</div>";
    }

    private function testEmailValidation() {
        echo "<h3>Testing Email Validation</h3>";

        $testCases = [
            ["user@example.com", "Valid Email", true],
            ["user+tag@example.com", "Valid Email with Tag", true],
            ["<script>alert(1)</script>@evil.com", "XSS in Email", false],
            ["user@javascript:alert(1)", "JavaScript in Email", false],
            ["normal@domain.com", "Normal Email", true],
            ["invalid-email", "Invalid Email", false]
        ];

        foreach ($testCases as $testCase) {
            $result = validateSecureEmail($testCase[0]);
            $passed = ($result !== false) === $testCase[2];
            $this->results[] = $passed;

            echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
            echo "✓ " . $testCase[1] . ": " . ($passed ? 'PASSED' : 'FAILED');
            echo "</div>";
        }
    }

    private function testSecurityHeaders() {
        echo "<h3>Testing Security Headers</h3>";

        $headers = [
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection',
            'Content-Security-Policy'
        ];

        $passed = true;
        foreach ($headers as $header) {
            $headerKey = 'HTTP_' . strtoupper(str_replace('-', '_', $header));
            if (!isset($_SERVER[$headerKey])) {
                $passed = false;
                break;
            }
        }

        $this->results[] = $passed;
        echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
        echo "✓ Security Headers: " . ($passed ? 'PASSED' : 'FAILED');
        echo "</div>";
    }

    private function testFileSecurity() {
        echo "<h3>Testing File Security</h3>";

        // Test file extension validation
        $allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
        $testFiles = [
            ['test.jpg', true],
            ['test.exe', false],
            ['test.php', false],
            ['test.pdf', true]
        ];

        $passed = true;
        foreach ($testFiles as $file) {
            $ext = strtolower(pathinfo($file[0], PATHINFO_EXTENSION));
            $isAllowed = in_array('.' . $ext, $allowedExts);
            if ($isAllowed !== $file[1]) {
                $passed = false;
                break;
            }
        }

        $this->results[] = $passed;
        echo "<div style='margin: 5px 0; color: " . ($passed ? 'green' : 'red') . ";'>";
        echo "✓ File Extension Validation: " . ($passed ? 'PASSED' : 'FAILED');
        echo "</div>";
    }
}

// Run security tests
if (isset($_GET['run_tests'])) {
    $tester = new SecurityTester();
    $tester->runAllTests();
} else {
    echo "<h1>HIBRADE Security Test Suite</h1>";
    echo "<p><a href='?run_tests=1' style='background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Run Security Tests</a></p>";
    echo "<p>This will test all security measures including input sanitization, pattern detection, rate limiting, email validation, and security headers.</p>";
}
?>
<?php
/**
 * HIBRADE Security Configuration
 * This file contains all security settings
 */

return [
    // Security Event Logging
    'SECURITY_LOG_FILE' => 'security.log',
    'MAX_LOG_SIZE' => 10485760,  // 10MB
    'LOG_RETENTION_DAYS' => 30,

    // Rate Limiting Configuration
    'RATE_LIMIT_REQUESTS' => 10,
    'RATE_LIMIT_WINDOW' => 60,  // seconds
    'RATE_LIMIT_BLOCK_DURATION' => 300,  // 5 minutes

    // Suspicious Activity Detection
    'SUSPICIOUS_PATTERNS' => [
        'union select',
        'drop table',
        'script',
        'javascript:',
        'vbscript:',
        'onload=',
        'onerror=',
        '<iframe',
        '<object',
        '<embed',
        'eval(',
        'base64_decode',
        'system(',
        'exec(',
        'shell_exec'
    ],

    // IP Blacklist (add suspicious IPs here)
    'BLACKLISTED_IPS' => [
        // Add IPs that show malicious behavior
    ],

    // Security Headers Verification
    'REQUIRED_HEADERS' => [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Content-Security-Policy',
        'Strict-Transport-Security'  // When HTTPS is enabled
    ],

    // File Upload Security
    'ALLOWED_EXTENSIONS' => ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
    'MAX_FILE_SIZE' => 5242880,  // 5MB
    'UPLOAD_PATH' => 'uploads/',

    // Database Security (if applicable)
    'DB_ENCRYPTION_KEY' => 'CHANGE_THIS_TO_A_STRONG_KEY',
    'SESSION_TIMEOUT' => 3600,  // 1 hour

    // API Security (if applicable)
    'API_RATE_LIMIT' => 100,
    'API_KEY_LENGTH' => 32,
    'CORS_ALLOWED_ORIGINS' => ['https://hibrade.com'],

    // Monitoring Alerts
    'ALERT_EMAIL' => 'security@hibrade.com',
    'ALERT_THRESHOLDS' => [
        'failed_logins' => 5,
        'suspicious_requests' => 10,
        'blocked_ips' => 3
    ],

    // Backup Security
    'BACKUP_ENCRYPTION' => true,
    'BACKUP_RETENTION' => 90,  // days

    // Incident Response
    'INCIDENT_LOG_FILE' => 'incidents.log',
    'AUTO_BLOCK_SUSPICIOUS' => true,
    'NOTIFICATION_WEBHOOK' => ''  // Add webhook URL for alerts
];
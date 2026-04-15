<?php
echo 'Testing security includes...' . PHP_EOL;
$config = require 'security-config.php';
echo 'Config loaded. Type: ' . gettype($config) . PHP_EOL;
if (is_array($config)) {
    echo 'Config is array with ' . count($config) . ' items' . PHP_EOL;
}
include 'security-monitor.php';
echo 'All includes successful!' . PHP_EOL;
?>
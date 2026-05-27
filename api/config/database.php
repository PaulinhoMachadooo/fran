<?php

function loadEnvFile(string $path): void {
  if (!is_readable($path)) return;

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  if (!is_array($lines)) return;

  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || str_starts_with($line, '#')) continue;
    $parts = explode('=', $line, 2);
    if (count($parts) !== 2) continue;

    $key = trim($parts[0]);
    $value = trim($parts[1]);
    $value = trim($value, "\"'");

    if ($key !== '' && getenv($key) === false) {
      putenv("{$key}={$value}");
      $_ENV[$key] = $value;
      $_SERVER[$key] = $value;
    }
  }
}

// Suporte para Hostinger/Apache (quando variáveis do hPanel não são injetadas no PHP)
loadEnvFile(__DIR__ . '/../../.env');
loadEnvFile(__DIR__ . '/../.env');

return [
  'host' => getenv('DB_HOST') ?: 'localhost',
  'port' => getenv('DB_PORT') ?: '3306',
  'database' => getenv('DB_NAME') ?: '',
  'username' => getenv('DB_USER') ?: '',
  'password' => getenv('DB_PASS') ?: '',
  'charset' => getenv('DB_CHARSET') ?: 'utf8mb4',
];

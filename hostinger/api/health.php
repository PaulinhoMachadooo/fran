<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    db()->query('SELECT 1');
    jsonResponse(['status' => 'ok', 'database' => 'connected']);
} catch (Throwable $e) {
    jsonResponse(['status' => 'error', 'database' => 'disconnected'], 500);
}

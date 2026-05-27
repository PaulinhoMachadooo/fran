<?php
require_once __DIR__ . '/../config/bootstrap.php';

try {
  $pdo = db();
  $stmt = $pdo->query('SELECT DATABASE() AS db_name, NOW() AS server_time');
  $meta = $stmt->fetch();

  $countStmt = $pdo->query('SELECT COUNT(*) AS total_clientes FROM clientes');
  $count = $countStmt->fetch();

  jsonResponse([
    'ok' => true,
    'database' => $meta['db_name'] ?? null,
    'server_time' => $meta['server_time'] ?? null,
    'total_clientes' => (int)($count['total_clientes'] ?? 0),
  ]);
} catch (Throwable $e) {
  jsonResponse([
    'ok' => false,
    'error' => 'Falha de conexão com o banco',
    'detail' => $e->getMessage(),
  ], 500);
}

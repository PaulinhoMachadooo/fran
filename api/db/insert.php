<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/helpers.php';

$payload = jsonInput();
$table = validateTable($payload['table'] ?? '');
$rows = $payload['rows'] ?? [];
if (!is_array($rows) || count($rows) === 0) jsonResponse(['error' => 'rows vazio'], 422);

$inserted = [];
foreach ($rows as $row) {
  $cols = array_keys($row);
  $ph = array_map(fn($c) => ':' . $c, $cols);
  $sql = sprintf('INSERT INTO `%s` (%s) VALUES (%s)', $table, implode(',', array_map(fn($c) => "`$c`", $cols)), implode(',', $ph));
  $stmt = db()->prepare($sql);
  $stmt->execute($row);
  $id = $row['id'] ?? db()->lastInsertId();
  $s = db()->prepare("SELECT * FROM `$table` WHERE id = :id LIMIT 1");
  $s->execute(['id' => $id]);
  $inserted[] = $s->fetch();
}
jsonResponse(['data' => $inserted], 201);

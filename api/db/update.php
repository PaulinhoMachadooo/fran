<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/helpers.php';

$payload = jsonInput();
$table = validateTable($payload['table'] ?? '');
$values = $payload['values'] ?? [];
$filters = $payload['filters'] ?? [];
if (!$values || !$filters) jsonResponse(['error' => 'values e filters são obrigatórios'], 422);

$sets = [];
$params = [];
foreach ($values as $k => $v) { $sets[] = "`$k` = :set_$k"; $params["set_$k"] = $v; }
$w = [];
foreach ($filters as $k => $v) { $w[] = "`$k` = :where_$k"; $params["where_$k"] = $v; }

$sql = sprintf('UPDATE `%s` SET %s WHERE %s', $table, implode(',', $sets), implode(' AND ', $w));
db()->prepare($sql)->execute($params);

$stmt = db()->prepare("SELECT * FROM `$table` WHERE " . implode(' AND ', array_map(fn($k) => "`$k` = :$k", array_keys($filters))));
$stmt->execute($filters);
jsonResponse(['data' => $stmt->fetchAll()]);

<?php
require_once __DIR__ . '/../config/bootstrap.php';
$data = jsonInput();
requireFields($data, ['email', 'password']);

$stmt = db()->prepare('SELECT * FROM usuarios WHERE email = :email LIMIT 1');
$stmt->execute(['email' => $data['email']]);
$user = $stmt->fetch();
if (!$user || !password_verify($data['password'], $user['senha_hash'])) {
  jsonResponse(['error' => ['message' => 'Credenciais inválidas']], 401);
}
unset($user['senha_hash']);
jsonResponse(['data' => ['user' => $user, 'session' => ['user' => $user]]]);

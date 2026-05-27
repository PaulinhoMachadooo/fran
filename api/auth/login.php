<?php
require_once __DIR__ . '/helpers.php';
$data = jsonInput();
requireFields($data, ['email', 'password']);
$stmt = db()->prepare('SELECT * FROM usuarios WHERE email = :email LIMIT 1');
$stmt->execute(['email' => $data['email']]);
$user = $stmt->fetch();
if (!$user || !password_verify($data['password'], $user['senha_hash'])) {
  jsonResponse(['error' => 'Credenciais inválidas'], 401);
}
$publicUser = ['id' => $user['id'], 'nome' => $user['nome'], 'email' => $user['email']];
jsonResponse(['token' => issueToken($publicUser), 'user' => $publicUser]);

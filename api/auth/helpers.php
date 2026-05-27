<?php
require_once __DIR__ . '/../config/bootstrap.php';

function issueToken(array $user): string {
  $payload = base64_encode(json_encode(['uid' => $user['id'], 'iat' => time()]));
  return rtrim(strtr($payload, '+/', '-_'), '=');
}

function parseBearerToken(): ?string {
  $headers = getallheaders();
  $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
  if (!str_starts_with($auth, 'Bearer ')) return null;
  return trim(substr($auth, 7));
}

function decodeToken(string $token): ?array {
  $raw = base64_decode(strtr($token, '-_', '+/'), true);
  if (!$raw) return null;
  $data = json_decode($raw, true);
  return is_array($data) ? $data : null;
}

function currentUserFromToken(): ?array {
  $token = parseBearerToken();
  if (!$token) return null;
  $payload = decodeToken($token);
  if (!$payload || empty($payload['uid'])) return null;
  $stmt = db()->prepare('SELECT id, nome, email FROM usuarios WHERE id = :id LIMIT 1');
  $stmt->execute(['id' => $payload['uid']]);
  $user = $stmt->fetch();
  return $user ?: null;
}

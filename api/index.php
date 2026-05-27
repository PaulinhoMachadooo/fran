<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base = '/api';
$route = str_starts_with($path, $base) ? substr($path, strlen($base)) : $path;

$map = [
  '/db/select' => __DIR__ . '/db/select.php',
  '/db/insert' => __DIR__ . '/db/insert.php',
  '/db/update' => __DIR__ . '/db/update.php',
  '/db/delete' => __DIR__ . '/db/delete.php',
  '/auth/sign-in' => __DIR__ . '/auth/sign-in.php',
  '/auth/sign-up' => __DIR__ . '/auth/sign-up.php',
  '/auth/login' => __DIR__ . '/auth/login.php',
  '/auth/register' => __DIR__ . '/auth/register.php',
  '/auth/me' => __DIR__ . '/auth/me.php',
  '/auth/sign-out' => __DIR__ . '/auth/sign-out.php',
  '/auth/session' => __DIR__ . '/auth/session.php',
  '/clientes' => __DIR__ . '/resources/clientes.php',
];

if (isset($map[$route])) {
  require $map[$route];
  exit;
}

if (preg_match('#^/clientes/[^/]+$#', $route)) {
  require __DIR__ . '/resources/clientes.php';
  exit;
}
http_response_code(404);
echo json_encode(['error' => 'Rota não encontrada']);

<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

// Initialize App with PSR-7
$app = AppFactory::create();

$db = new PDO(
  "mysql:host=localhost;dbname=social_auth",
  "root",
  "password"
);

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//Test
$app->get('/test', function (Request $request, Response $response) {
  $response->getBody()->write("Auth service running!");
  return $response;
});

$app->run();

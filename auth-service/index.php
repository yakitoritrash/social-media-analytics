<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

// Initialize App with PSR-7
$app = AppFactory::create();

//Test
$app->get('/test', function (Request $request, Response $response) {
  $response->getBody()->write("Auth service running!");
  return $response;
});

$app->run();


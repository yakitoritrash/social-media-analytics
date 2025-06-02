<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// Initialize App with PSR-7
$app = AppFactory::create();

try {
  $db = new PDO(
    "mysql:unix_socket=/run/mysqld/mysqld.sock; ;dbname=" . $_ENV['DB_NAME'],
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
  );
} catch (PDOException $e) {
  die("DB Connection failed: " . $e->getMessage());
}
//Test

$app->get('/test-db', function (Request $request, Response $response) use ($db) { $stmt = $db->query("SELECT 1 AS test");
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  $response->getBody()->write(json_encode($result));
  return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/register', function (Request $request, Response $response) use ($db) {
  $data = $request->getParsedBody();

  if (empty($data['username']) || empty($data['password'])) {
    $response->getBody()->write(json_encode(["error" => "Username and password required"]));
    return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(400);
  }

});
$app->run();

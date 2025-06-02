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
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

try {
  $db = new PDO(
    "mysql:unix_socket=/run/mysqld/mysqld.sock;dbname=" . $_ENV['DB_NAME'],
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
  error_log("Parsed input: " . print_r($data, true));
  if (empty($data['username']) || empty($data['password'])) {
    $response->getBody()->write(json_encode(["error" => "Username and password required"]));
    return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(400);
  }
$hash = password_hash($data['password'], PASSWORD_BCRYPT);

try {
  $checkStmt = $db->prepare("SELECT id FROM users WHERE username = ?");
  $checkStmt->execute([$data['username']]);

  if ($checkStmt->fetch()) {
    $response->getBody()->write(json_encode(["error" => "Username already exists"]));
    return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(400);
  }
  $insertStmt = $db->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
  $insertStmt->execute([$data['username'], $hash]);

  $response->getBody()->write(json_encode(["success" => true, "message" => "User registered."]));
  return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(201);
} catch (PDOException $e) {
  $response->getBody()->write(json_encode(["error" => "Registration failed", "detail" => $e->getMessage()]));
  return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(500);
}
});

$app->run();

const http = require("http");

const createRouter = require("./router");
const ucfirst = require("./utils/ucfirst");

const hostname = "127.0.0.1";
const port = 3000;

const router = createRouter({ hostname, port });

router.add("/hello", (_, res, { query }) => {
  res.statusCode = 200;

  const name = query.get("name");

  const message = name
    ? `"Hello, ${ucfirst(name)}", status code ${res.statusCode}`
    : `"Hello, world", status code ${res.statusCode}`;

  res.end(message);
});

router.add("/goodbye", (_, res, { query }) => {
  res.statusCode = 200;

  const name = query.get("name");

  const message = name
    ? `"Goodbye, ${ucfirst(name)}", status code ${res.statusCode}`
    : `"Goodbye", status code ${res.statusCode}`;

  res.end(message);
});

router.fallback((_, res) => {
  res.statusCode = 404;
  res.end(`status code ${res.statusCode}`);
});

const server = http.createServer(router.handle);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

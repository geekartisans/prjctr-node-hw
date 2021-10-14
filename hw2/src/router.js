const { URL } = require("url");

module.exports = function Router({ hostname, port }) {
  const routes = {};

  let defaults = (_, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  };

  function add(path, handler) {
    routes[path] = handler;
  }

  function fallback(handler) {
    defaults = handler;
  }

  function handle(req, res) {
    const { pathname, searchParams } = new URL(req.url, `http://${hostname}:${port}`);

    const match = routes[pathname];

    match ? match(req, res, { query: searchParams }) : defaults(req, res);
  }

  return { add, fallback, handle };
};

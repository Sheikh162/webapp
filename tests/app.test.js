const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');

const app = require('../server.js');

let server;
let base;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
});

describe('webapp', () => {
  it('GET / returns Success with environment and version', async () => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'Success');
    assert.ok(body.environment);
    assert.ok(body.version);
  });

  it('GET /health returns OK', async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), 'OK');
  });
});

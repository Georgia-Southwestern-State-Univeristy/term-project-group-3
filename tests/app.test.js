const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');

// Mock DOM before requiring app
global.document = {
  addEventListener: () => {},
  getElementById: () => ({
    addEventListener: () => {},
    value: '',
    innerHTML: '',
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
};

// Mock window
global.window = {};

// Now require app
require('../src/app');

describe('App module', () => {
  it('loads without errors', () => {
    // If we got here, app.js loaded successfully
    assert.strictEqual(true, true);
  });
});

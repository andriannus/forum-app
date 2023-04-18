import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

export const handlers = [];

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

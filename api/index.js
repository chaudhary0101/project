import app from '../server/server.js';

export default async function handler(request, response) {
  // Pass the request and response to the Express app
  app(request, response);
}
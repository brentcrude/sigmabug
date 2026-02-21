export function createSocket(token) {
  return new WebSocket(`ws://localhost:8000/ws/${token}`);
}
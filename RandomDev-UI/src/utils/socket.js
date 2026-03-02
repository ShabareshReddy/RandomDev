import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

// Singleton socket — created once, reused across the app
let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true,  // send the cookie for JWT auth
      autoConnect: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

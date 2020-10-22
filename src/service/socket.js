import io from "socket.io-client";
import { SOCKET_URL } from "./../config.json";

console.log(SOCKET_URL);
const socket = io(SOCKET_URL)

export default socket;

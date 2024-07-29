
import { io } from "socket.io-client";

export let socket:any = null;
export function connectSocket (){
      socket = io("http://192.168.1.19:4040");
}

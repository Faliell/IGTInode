import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

//ouvir
eventEmitter.on("eventTest", (obj) => console.log(obj));

//emitir
eventEmitter.emit("eventTest", "resposta teste");

import {
  Client,
  DataMessage,
  IncomingMessage,
  Message,
  Request,
  isErrorMessage,
} from "@signald-node/protocol";
import { randomUUID } from "crypto";
import EventEmitter from "events";
import { NetConnectOpts, Socket, createConnection } from "net";

const isIncomingMessage = (
  message: Message
): message is DataMessage<IncomingMessage> => {
  return message.type === "IncomingMessage";
};

export class Signald implements Client {
  private socket: Socket;
  private messageEmitter = new EventEmitter();

  constructor(path: string, onConnect?: () => void)
  constructor(options: NetConnectOpts, onConnect?: () => void)
  constructor(options: any, onConnect?: () => void) {
    this.socket = createConnection(options, onConnect);

    this.socket.on("data", this.processData);
  }

  private processData = (data: Buffer) => {
    data
      .toString()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .forEach((line) => {
        console.log(`< ${line}`);
        const message = JSON.parse(line);
        this.messageEmitter.emit("message", message);
      });
  };

  async submit<TResponse = {}>(request: Request) {
    const { id = randomUUID(), ...requestWithoutId } = request;

    if (this.socket.readyState !== "open") {
      throw new Error("Socket is not open");
    }

    const payload = JSON.stringify({ id, ...requestWithoutId });
    console.log(`> ${payload}`);
    this.socket.write(`${payload}\n`);

    const response = await new Promise<Message<TResponse>>((resolve) => {
      const onMessage = (message: Message) => {
        if (message.id === id) {
          resolve(message as Message<TResponse>);
          this.unsubscribe(onMessage);
        }
      };

      this.subscribe(onMessage);
    });

    if (isErrorMessage(response)) {
      console.error(response.error_type);
      throw new Error(response.error);
    }

    return response.data;
  }

  subscribe(handler: (message: Message) => void) {
    this.messageEmitter.on("message", handler);
  }
  unsubscribe(handler: (message: Message) => void) {
    this.messageEmitter.off("message", handler);
  }
}

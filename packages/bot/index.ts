import { Signald } from "@signald/client";
import {
  IncomingMessage,
  SetProfile,
  set_profile,
  subscribe,
} from "@signald/protocol";

export type MessageHandler = (
  client: Signald,
  message: IncomingMessage
) => Promise<void>;

type BotOptions = {
  connectOptions?: ConstructorParameters<typeof Signald>[0];
  profile?: Omit<SetProfile, "account">;
};

export class SignaldBot {
  private account: string;
  private client: Signald;
  private handlers: MessageHandler[];
  private options?: BotOptions;

  constructor(
    account: string,
    handlers: MessageHandler[],
    options?: BotOptions
  ) {
    this.account = account;
    this.handlers = handlers;
    this.options = options;
    this.client = new Signald(
      options?.connectOptions ?? ("/signald/signald.sock" as any),
      () => this.onReady()
    );

    console.log("🤖 Starting signald bot");
  }

  private async onReady() {
    // profile is needed to be able to join groups
    await set_profile(this.client, {
      account: this.account,
      ...(this.options?.profile ?? { name: "🤖 Bot" }),
    });

    await subscribe(this.client, {
      account: this.account,
    });

    this.client.subscribe(async (message) => {
      try {
        await Promise.all(
          this.handlers.map((handler) => handler(this.client, message))
        );
      } catch (error: any) {
        console.error(`Error handling message. ${JSON.stringify(error)}`);
      }
    });

    console.log("🤖 Ready!");
  }
}

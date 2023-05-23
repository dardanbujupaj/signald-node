import { Signald } from "@signald-node/client";
import {
  Client,
  DataMessage,
  IncomingMessage,
  Message,
  list_accounts,
  send,
  subscribe,
} from "@signald-node/protocol";
import nodeSchedule from "node-schedule";

type ScheduledRule = {
  schedule: string;
  handler: (client: Client) => void;
};
type PrefixRule = {
  prefix: string;
  handler: (client: Client, message: IncomingMessage) => void;
};

type Rule = ScheduledRule | PrefixRule;

const isIncomingMessage = (
  message: Message
): message is DataMessage<IncomingMessage> => {
  return message.type === "IncomingMessage";
};

async function handleIncomingMessage(
  client: Signald,
  message: IncomingMessage
) {
  const messageContent =
    message.sync_message?.sent?.message ?? message.data_message;

  if (messageContent?.body?.toLocaleLowerCase() === "hello") {
    const recipient = messageContent.groupV2?.id
      ? {
          recipientGroupId: messageContent.groupV2.id,
        }
      : {
          recipientAddress: message.source,
        };
    console.log(recipient);

    send(client, {
      account: message.account,
      ...recipient,
      messageBody: "received 👍🏻",
    });
  }
}

class Bot {
  private client: Signald;
  private rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
    this.client = new Signald({ host: "0.0.0.0", port: 12345 }, () =>
      this.onReady()
    );
    console.log("🤖 Starting signald bot");
  }

  private async onReady() {
    const accountList = await list_accounts(this.client, {});
    for (const account of accountList.accounts) {
      console.log(`Subscribe to ${account.account_id}`);
      subscribe(this.client, {
        account: account.account_id,
      });
    }

    for (const rule of this.rules) {
      if ("schedule" in rule) {
        nodeSchedule.scheduleJob(rule.schedule, () =>
          rule.handler(this.client)
        );
      }
    }

    this.client.subscribe(async (message) => {
      if (isIncomingMessage(message)) {
        try {
          await handleIncomingMessage(this.client, message.data);
        } catch (error) {
          console.error(JSON.stringify(error));
        }
      }
    });

    console.log("🤖 Ready!");
  }
}

new Bot([]);

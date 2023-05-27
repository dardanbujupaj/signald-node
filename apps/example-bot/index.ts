import { MessageHandler, SignaldBot } from "@signald-node/bot";
import { Signald, getReplyRecipient } from "@signald-node/client";
import { IncomingMessage, mark_read, react } from "@signald-node/protocol";

const handleGreeting: MessageHandler = async (
  client: Signald,
  message: IncomingMessage
) => {
  const messageContent = message.data_message;

  if (messageContent?.body?.toLowerCase() === "hello") {
    const recipient = getReplyRecipient(message);

    react(client, {
      username: message.account!,
      ...recipient,
      reaction: {
        emoji: "👋",
        remove: false,
        targetAuthor: message.source,
        targetSentTimestamp: messageContent?.timestamp,
      },
    });
  }
};

const handleMarkRead: MessageHandler = async (
  client: Signald,
  message: IncomingMessage
) => {
  if (!message.data_message) return;
  mark_read(client, {
    account: message.account!,
    to: message.source!,
    timestamps: [message.data_message.timestamp!],
  });
};

new SignaldBot(
  process.env.SIGNAL_PHONE_NUMBER!,
  [handleGreeting, handleMarkRead],
  {
    connectOptions: { host: "0.0.0.0", port: 12345 },
    profile: {
      name: "🤖 Example Bot",
    },
  }
);

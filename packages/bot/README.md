# @signald/bot

## Installation

```
`npm install @signald/bot @signald/protocol`
```

## Usage

1. Setup signald and register an account (https://signald.org/articles/getting-started/)
2. Initialize the bot with the registered phone number and any message handlers you want use

```
import { MessageHandler, SignaldBot } from "@signald/bot";
import { getReplyRecipient } from "@signald/client";
import { react } from "@signald/protocol";

export const handleThumbsUp: MessageHandler = async (client, message) => {
  const recipient = getReplyRecipient(message);

  react(client, {
    username: message.account!,
    ...recipient,
    reaction: {
      emoji: "👍🏻",
      remove: false,
      targetAuthor: message.source,
      targetSentTimestamp: message.timestamp,
    },
  });
};

new SignaldBot("+00000000000", [handleThumbsUp]);
```

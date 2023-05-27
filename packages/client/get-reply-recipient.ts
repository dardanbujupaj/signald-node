import { IncomingMessage } from "@signald-node/protocol";

/**
 * Recipient (either groupId or address) to reply to
 *
 * @example
 * const message = // IncomingMessage from signald
 * const recipient = getReplyRecipient(message)
 * send(client, {
 *   account: message.account,
 *   ...recipient,
 *   messageBody: "I received your message!"
 * })
 */
export const getReplyRecipient = (message: IncomingMessage) => {
  return message.data_message?.groupV2?.id
    ? {
        recipientGroupId: message.data_message.groupV2.id,
      }
    : {
        recipientAddress: message.source,
      };
};

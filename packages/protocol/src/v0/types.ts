/**
 * @deprecated
 */
export type JsonAccountList = {
  accounts?: JsonAccount[];
};

/**
 * @deprecated
 */
export type JsonMessageEnvelope = {
  username?: string;
  uuid?: string;
  source?: JsonAddress;
  sourceDevice?: number;
  type?: string;
  /**
   * this field is no longer available and will never be populated
   */
  relay?: string;
  timestamp?: number;
  timestampISO?: string;
  serverTimestamp?: number;
  serverDeliveredTimestamp?: number;
  hasLegacyMessage?: boolean;
  hasContent?: boolean;
  isUnidentifiedSender?: boolean;
  dataMessage?: JsonDataMessage;
  syncMessage?: JsonSyncMessage;
  callMessage?: JsonCallMessage;
  receipt?: JsonReceiptMessage;
  typing?: JsonTypingMessage;
};

/**
 * @deprecated
 */
export type JsonAccount = {
  deviceId?: number;
  username?: string;
  filename?: string;
  uuid?: string;
  registered?: boolean;
  has_keys?: boolean;
  subscribed?: boolean;
};

/**
 * @deprecated
 */
export type JsonAddress = {
  number?: string;
  uuid?: string;
  relay?: string;
};

/**
 * @deprecated
 */
export type JsonDataMessage = {
  /**
   * the timestamp that the message was sent at, according to the sender's device. This is used to uniquely identify this message for things like reactions and quotes.
   */
  timestamp?: number;
  /**
   * files attached to the incoming message
   */
  attachments?: JsonAttachment[];
  /**
   * the text body of the incoming message.
   */
  body?: string;
  /**
   * if the incoming message was sent to a v1 group, information about that group will be here
   */
  group?: JsonGroupInfo;
  /**
   * is the incoming message was sent to a v2 group, basic identifying information about that group will be here. For full information, use list_groups
   */
  groupV2?: JsonGroupV2Info;
  endSession?: boolean;
  /**
   * the expiry timer on the incoming message. Clients should delete records of the message within this number of seconds
   */
  expiresInSeconds?: number;
  profileKeyUpdate?: boolean;
  /**
   * if the incoming message is a quote or reply to another message, this will contain information about that message
   */
  quote?: JsonQuote;
  /**
   * if the incoming message has a shared contact, the contact's information will be here
   */
  contacts?: SharedContact[];
  /**
   * if the incoming message has a link preview, information about that preview will be here
   */
  previews?: JsonPreview[];
  /**
   * if the incoming message is a sticker, information about the sicker will be here
   */
  sticker?: JsonSticker;
  /**
   * indicates the message is a view once message. View once messages typically include no body and a single image attachment. Official Signal clients will prevent the user from saving the image, and once the user has viewed the image once they will destroy the image.
   */
  viewOnce?: boolean;
  /**
   * if the message adds or removes a reaction to another message, this will indicate what change is being made
   */
  reaction?: JsonReaction;
  /**
   * if the inbound message is deleting a previously sent message, indicates which message should be deleted
   */
  remoteDelete?: RemoteDelete;
  /**
   * list of mentions in the message
   */
  mentions?: JsonMention[];
};

/**
 * @deprecated
 */
export type JsonSyncMessage = {
  sent?: JsonSentTranscriptMessage;
  contacts?: JsonAttachment;
  contactsComplete?: boolean;
  groups?: JsonAttachment;
  blockedList?: JsonBlockedListMessage;
  request?: string;
  readMessages?: JsonReadMessage[];
  viewOnceOpen?: JsonViewOnceOpenMessage;
  verified?: JsonVerifiedMessage;
  configuration?: ConfigurationMessage;
  stickerPackOperations?: JsonStickerPackOperationMessage[];
  fetchType?: string;
  messageRequestResponse?: JsonMessageRequestResponseMessage;
};

/**
 * @deprecated
 */
export type JsonCallMessage = {
  offerMessage?: OfferMessage;
  answerMessage?: AnswerMessage;
  busyMessage?: BusyMessage;
  hangupMessage?: HangupMessage;
  iceUpdateMessages?: IceUpdateMessage[];
  destinationDeviceId?: number;
  isMultiRing?: boolean;
};

/**
 * @deprecated
 */
export type JsonReceiptMessage = {
  type?: string;
  timestamps?: number[];
  when?: number;
};

/**
 * @deprecated
 */
export type JsonTypingMessage = {
  action?: string;
  timestamp?: number;
  groupId?: string;
};

/**
 * @deprecated
 */
export type JsonAttachment = {
  contentType?: string;
  id?: string;
  size?: number;
  storedFilename?: string;
  filename?: string;
  customFilename?: string;
  caption?: string;
  width?: number;
  height?: number;
  voiceNote?: boolean;
  key?: string;
  digest?: string;
  blurhash?: string;
};

/**
 * @deprecated
 */
export type JsonGroupInfo = {
  groupId?: string;
  members?: JsonAddress[];
  name?: string;
  type?: string;
  avatarId?: number;
};

/**
 * @deprecated
 */
export type JsonGroupV2Info = {
  id?: string;
  revision?: number;
  title?: string;
  description?: string;
  /**
   * path to the group's avatar on local disk, if available
   */
  avatar?: string;
  timer?: number;
  members?: JsonAddress[];
  pendingMembers?: JsonAddress[];
  requestingMembers?: JsonAddress[];
  /**
   * the signal.group link, if applicable
   */
  inviteLink?: string;
  /**
   * current access control settings for this group
   */
  accessControl?: GroupAccessControl;
  /**
   * detailed member list
   */
  memberDetail?: GroupMember[];
  /**
   * detailed pending member list
   */
  pendingMemberDetail?: GroupMember[];
};

/**
 * A quote is a reply to a previous message. ID is the sent time of the message being replied to
 * @deprecated
 */
export type JsonQuote = {
  /**
   * the client timestamp of the message being quoted
   */
  id?: number;
  /**
   * the author of the message being quoted
   */
  author?: JsonAddress;
  /**
   * the body of the message being quoted
   */
  text?: string;
  /**
   * list of files attached to the quoted message
   */
  attachments?: JsonQuotedAttachment[];
  /**
   * list of mentions in the quoted message
   */
  mentions?: JsonMention[];
};

export type SharedContact = {
  name?: Name;
  avatar?: Optional;
  phone?: Optional;
  email?: Optional;
  address?: Optional;
  organization?: Optional;
};

/**
 * @deprecated
 */
export type JsonPreview = {
  url?: string;
  title?: string;
  attachment?: JsonAttachment;
};

/**
 * @deprecated
 */
export type JsonSticker = {
  packID?: string;
  packKey?: string;
  stickerID?: number;
  attachment?: JsonAttachment;
  image?: string;
};

/**
 * @deprecated
 */
export type JsonReaction = {
  /**
   * the emoji to react with
   */
  emoji?: string;
  /**
   * set to true to remove the reaction. requires emoji be set to previously reacted emoji
   */
  remove?: boolean;
  /**
   * the author of the message being reacted to
   */
  targetAuthor?: JsonAddress;
  /**
   * the client timestamp of the message being reacted to
   */
  targetSentTimestamp?: number;
};

export type RemoteDelete = {
  targetSentTimestamp?: number;
};

/**
 * @deprecated
 */
export type JsonMention = {
  /**
   * The UUID of the account being mentioned
   */
  uuid?: string;
  /**
   * The number of characters in that the mention starts at. Note that due to a quirk of how signald encodes JSON, if this value is 0 (for example if the first character in the message is the mention) the field won't show up.
   */
  start?: number;
  /**
   * The length of the mention represented in the message. Seems to always be 1 but included here in case that changes.
   */
  length?: number;
};

/**
 * @deprecated
 */
export type JsonSentTranscriptMessage = {
  destination?: JsonAddress;
  timestamp?: number;
  expirationStartTimestamp?: number;
  message?: JsonDataMessage;
  unidentifiedStatus?: Map<any, any>;
  isRecipientUpdate?: boolean;
};

/**
 * @deprecated
 */
export type JsonBlockedListMessage = {
  addresses?: JsonAddress[];
  groupIds?: string[];
};

/**
 * @deprecated
 */
export type JsonReadMessage = {
  sender?: JsonAddress;
  timestamp?: number;
};

/**
 * @deprecated
 */
export type JsonViewOnceOpenMessage = {
  sender?: JsonAddress;
  timestamp?: number;
};

/**
 * @deprecated
 */
export type JsonVerifiedMessage = {
  destination?: JsonAddress;
  identityKey?: string;
  verified?: string;
  timestamp?: number;
};

export type ConfigurationMessage = {
  readReceipts?: Optional;
  unidentifiedDeliveryIndicators?: Optional;
  typingIndicators?: Optional;
  linkPreviews?: Optional;
};

/**
 * @deprecated
 */
export type JsonStickerPackOperationMessage = {
  packID?: string;
  packKey?: string;
  type?: string;
};

/**
 * @deprecated
 */
export type JsonMessageRequestResponseMessage = {
  person?: JsonAddress;
  groupId?: string;
  type?: string;
};

export type OfferMessage = {
  id?: number;
  sdp?: string;
  type?: Type;
  opaque?: string;
};

export type AnswerMessage = {
  id?: number;
  sdp?: string;
  opaque?: string;
};

export type BusyMessage = {
  id?: number;
};

export type HangupMessage = {
  id?: number;
  type?: Type;
  deviceId?: number;
  legacy?: boolean;
};

export type IceUpdateMessage = {
  id?: number;
  opaque?: string;
  sdp?: string;
};

/**
 * @deprecated
 */
export type JsonQuotedAttachment = {
  contentType?: string;
  fileName?: string;
  thumbnail?: JsonAttachment;
};

/**
 * group access control settings. Options for each controlled action are: UNKNOWN, ANY, MEMBER, ADMINISTRATOR, UNSATISFIABLE and UNRECOGNIZED
 * @deprecated
 */
export type GroupAccessControl = {
  /**
   * UNSATISFIABLE when the group link is disabled, ADMINISTRATOR when the group link is enabled but an administrator must approve new members, ANY when the group link is enabled and no approval is required
   */
  link?: string;
  /**
   * who can edit group info
   */
  attributes?: string;
  /**
   * who can add members
   */
  members?: string;
};

/**
 * @deprecated
 */
export type GroupMember = {
  uuid?: string;
  /**
   * possible values are: UNKNOWN, DEFAULT, ADMINISTRATOR and UNRECOGNIZED
   */
  role?: string;
  joined_revision?: number;
};

export type Name = {
  display?: Optional;
  given?: Optional;
  family?: Optional;
  prefix?: Optional;
  suffix?: Optional;
  middle?: Optional;
};

export type Optional = {
  empty?: boolean;
  present?: boolean;
};

export type Type = {};

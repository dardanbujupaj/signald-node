export type JsonAccountList = {
  accounts: JsonAccount[];
};

export type JsonMessageEnvelope = {
  username: string;
  uuid: string;
  source: JsonAddress;
  sourceDevice: number;
  type: string;
  relay: string;
  timestamp: number;
  timestampISO: string;
  serverTimestamp: number;
  serverDeliveredTimestamp: number;
  hasLegacyMessage: boolean;
  hasContent: boolean;
  isUnidentifiedSender: boolean;
  dataMessage: JsonDataMessage;
  syncMessage: JsonSyncMessage;
  callMessage: JsonCallMessage;
  receipt: JsonReceiptMessage;
  typing: JsonTypingMessage;
};

export type JsonAccount = {
  deviceId: number;
  username: string;
  filename: string;
  uuid: string;
  registered: boolean;
  has_keys: boolean;
  subscribed: boolean;
};

export type JsonAddress = {
  number: string;
  uuid: string;
  relay: string;
};

export type JsonDataMessage = {
  timestamp: number;
  attachments: JsonAttachment[];
  body: string;
  group: JsonGroupInfo;
  groupV2: JsonGroupV2Info;
  endSession: boolean;
  expiresInSeconds: number;
  profileKeyUpdate: boolean;
  quote: JsonQuote;
  contacts: SharedContact[];
  previews: JsonPreview[];
  sticker: JsonSticker;
  viewOnce: boolean;
  reaction: JsonReaction;
  remoteDelete: RemoteDelete;
  mentions: JsonMention[];
};

export type JsonSyncMessage = {
  sent: JsonSentTranscriptMessage;
  contacts: JsonAttachment;
  contactsComplete: boolean;
  groups: JsonAttachment;
  blockedList: JsonBlockedListMessage;
  request: string;
  readMessages: JsonReadMessage[];
  viewOnceOpen: JsonViewOnceOpenMessage;
  verified: JsonVerifiedMessage;
  configuration: ConfigurationMessage;
  stickerPackOperations: JsonStickerPackOperationMessage[];
  fetchType: string;
  messageRequestResponse: JsonMessageRequestResponseMessage;
};

export type JsonCallMessage = {
  offerMessage: OfferMessage;
  answerMessage: AnswerMessage;
  busyMessage: BusyMessage;
  hangupMessage: HangupMessage;
  iceUpdateMessages: IceUpdateMessage[];
  destinationDeviceId: number;
  isMultiRing: boolean;
};

export type JsonReceiptMessage = {
  type: string;
  timestamps: number[];
  when: number;
};

export type JsonTypingMessage = {
  action: string;
  timestamp: number;
  groupId: string;
};

export type JsonAttachment = {
  contentType: string;
  id: string;
  size: number;
  storedFilename: string;
  filename: string;
  customFilename: string;
  caption: string;
  width: number;
  height: number;
  voiceNote: boolean;
  key: string;
  digest: string;
  blurhash: string;
};

export type JsonGroupInfo = {
  groupId: string;
  members: JsonAddress[];
  name: string;
  type: string;
  avatarId: number;
};

export type JsonGroupV2Info = {
  id: string;
  revision: number;
  title: string;
  description: string;
  avatar: string;
  timer: number;
  members: JsonAddress[];
  pendingMembers: JsonAddress[];
  requestingMembers: JsonAddress[];
  inviteLink: string;
  accessControl: GroupAccessControl;
  memberDetail: GroupMember[];
  pendingMemberDetail: GroupMember[];
};

/** A quote is a reply to a previous message. ID is the sent time of the message being replied to */
export type JsonQuote = {
  id: number;
  author: JsonAddress;
  text: string;
  attachments: JsonQuotedAttachment[];
  mentions: JsonMention[];
};

export type SharedContact = {
  name: Name;
  avatar: Optional;
  phone: Optional;
  email: Optional;
  address: Optional;
  organization: Optional;
};

export type JsonPreview = {
  url: string;
  title: string;
  attachment: JsonAttachment;
};

export type JsonSticker = {
  packID: string;
  packKey: string;
  stickerID: number;
  attachment: JsonAttachment;
  image: string;
};

export type JsonReaction = {
  emoji: string;
  remove: boolean;
  targetAuthor: JsonAddress;
  targetSentTimestamp: number;
};

export type RemoteDelete = {
  targetSentTimestamp: number;
};

export type JsonMention = {
  uuid: string;
  start: number;
  length: number;
};

export type JsonSentTranscriptMessage = {
  destination: JsonAddress;
  timestamp: number;
  expirationStartTimestamp: number;
  message: JsonDataMessage;
  unidentifiedStatus: Map<any, any>;
  isRecipientUpdate: boolean;
};

export type JsonBlockedListMessage = {
  addresses: JsonAddress[];
  groupIds: string[];
};

export type JsonReadMessage = {
  sender: JsonAddress;
  timestamp: number;
};

export type JsonViewOnceOpenMessage = {
  sender: JsonAddress;
  timestamp: number;
};

export type JsonVerifiedMessage = {
  destination: JsonAddress;
  identityKey: string;
  verified: string;
  timestamp: number;
};

export type ConfigurationMessage = {
  readReceipts: Optional;
  unidentifiedDeliveryIndicators: Optional;
  typingIndicators: Optional;
  linkPreviews: Optional;
};

export type JsonStickerPackOperationMessage = {
  packID: string;
  packKey: string;
  type: string;
};

export type JsonMessageRequestResponseMessage = {
  person: JsonAddress;
  groupId: string;
  type: string;
};

export type OfferMessage = {
  id: number;
  sdp: string;
  type: Type;
  opaque: string;
};

export type AnswerMessage = {
  id: number;
  sdp: string;
  opaque: string;
};

export type BusyMessage = {
  id: number;
};

export type HangupMessage = {
  id: number;
  type: Type;
  deviceId: number;
  legacy: boolean;
};

export type IceUpdateMessage = {
  id: number;
  opaque: string;
  sdp: string;
};

export type JsonQuotedAttachment = {
  contentType: string;
  fileName: string;
  thumbnail: JsonAttachment;
};

/** group access control settings. Options for each controlled action are: UNKNOWN, ANY, MEMBER, ADMINISTRATOR, UNSATISFIABLE and UNRECOGNIZED */
export type GroupAccessControl = {
  link: string;
  attributes: string;
  members: string;
};

export type GroupMember = {
  uuid: string;
  role: string;
  joined_revision: number;
};

export type Name = {
  display: Optional;
  given: Optional;
  family: Optional;
  prefix: Optional;
  suffix: Optional;
  middle: Optional;
};

export type Optional = {
  empty: boolean;
  present: boolean;
};

export type Type = {};

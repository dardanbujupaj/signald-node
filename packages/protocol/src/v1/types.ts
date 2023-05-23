import {
  JsonSticker,
  ConfigurationMessage,
  JsonStickerPackOperationMessage,
  JsonQuotedAttachment,
} from "../v0/types";
/** Wraps all incoming messages sent to the client after a v1 subscribe request is issued */
export type ClientMessageWrapper = {
  type: string;
  version: string;
  data: Object;
  error: Boolean;
  account: string;
};

export type UntrustedIdentityError = {
  identifier: string;
  message: string;
  identity_key: IdentityKey;
};

export type ProtocolInvalidKeyIdError = {
  sender: string;
  timestamp: number;
  message: string;
  sender_device: number;
  content_hint: number;
  group_id: string;
};

export type DuplicateMessageError = {
  timestamp: number;
  message: string;
};

export type NetworkError = {
  message: string;
};

export type ProtocolInvalidMessageError = {
  sender: string;
  timestamp: number;
  message: string;
  sender_device: number;
  content_hint: number;
  group_id: string;
};

export type ProtocolNoSessionError = {
  sender: string;
  timestamp: number;
  message: string;
  sender_device: number;
  content_hint: number;
  group_id: string;
};

export type IncomingMessage = {
  account: string;
  source: JsonAddress;
  type: string;
  timestamp: number;
  source_device: number;
  server_receiver_timestamp: number;
  server_deliver_timestamp: number;
  has_legacy_message: boolean;
  has_content: boolean;
  unidentified_sender: boolean;
  data_message: JsonDataMessage;
  sync_message: JsonSyncMessage;
  call_message: CallMessage;
  receipt_message: ReceiptMessage;
  typing_message: TypingMessage;
  story_message: StoryMessage;
  server_guid: string;
  decryption_error_message: DecryptionErrorMessage;
};

/** prior attempt to indicate signald connectivity state. WebSocketConnectionState messages will be delivered at the  same time as well as in other parts of the websocket lifecycle. */
export type ListenerState = {
  connected: boolean;
};

/** indicates when the websocket connection state to the signal server has changed */
export type WebSocketConnectionState = {
  state: string;
  socket: string;
};

/** Broadcast to subscribed clients when there is a state change from the storage service */
export type StorageChange = {
  version: number;
};

export type SendRequest = {
  username?: string;
  account?: string;
  recipientAddress?: JsonAddress;
  recipientGroupId?: string;
  messageBody?: string;
  attachments?: JsonAttachment[];
  quote?: JsonQuote;
  timestamp?: number;
  mentions?: JsonMention[];
  previews?: JsonPreview[];
  members?: JsonAddress[];
  is_for_story?: boolean;
};

export type SendResponse = {
  results: JsonSendMessageResult[];
  timestamp: number;
};

export type NoSuchAccountError = {
  account: string;
  message: string;
};

export type ServerNotFoundError = {
  uuid: string;
  message: string;
};

export type InvalidProxyError = {
  message: string;
};

export type NoSendPermissionError = {
  message: string;
};

export type InvalidAttachmentError = {
  filename: string;
  message: string;
};

/** an internal error in signald has occurred. typically these are things that "should never happen" such as issues saving to the local disk, but it is also the default error type and may catch some things that should have their own error type. If you find tht your code is depending on the exception list for any particular behavior, please file an issue so we can pull those errors out to a separate error type: https://gitlab.com/signald/signald/-/issues/new */
export type InternalError = {
  exceptions: string[];
  message: string;
};

export type InvalidRequestError = {
  message: string;
};

export type UnknownGroupError = {
  message: string;
};

export type RateLimitError = {
  message: string;
};

export type InvalidRecipientError = {
  message: string;
};

export type AttachmentTooLargeError = {
  filename: string;
  message: string;
};

/** Indicates the server rejected our credentials or a failed group update. Typically means the linked device was removed by the primary device, or that the account was re-registered. For group updates, this can indicate that we lack permissions. */
export type AuthorizationFailedError = {
  message: string;
};

export type SQLError = {
  message: string;
};

export type ProofRequiredError = {
  token: string;
  options: string[];
  message: string;
  retry_after: number;
};

/** indicates signald received an http 500 status code from the server */
export type SignalServerError = {
  message: string;
};

/** react to a previous message */
export type ReactRequest = {
  username: string;
  recipientAddress?: JsonAddress;
  recipientGroupId?: string;
  reaction: JsonReaction;
  timestamp?: number;
  members?: JsonAddress[];
};

export type UnregisteredUserError = {
  message: string;
  e164_number: string;
};

export type VersionRequest = {};

export type JsonVersionMessage = {
  name: string;
  version: string;
  branch: string;
  commit: string;
};

/** Accept a v2 group invitation. Note that you must have a profile name set to join groups. */
export type AcceptInvitationRequest = {
  account: string;
  groupID: string;
};

/** Information about a Signal group */
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
  announcements: string;
  removed: boolean;
  banned_members: BannedGroupMember[];
  group_change: GroupChange;
};

export type OwnProfileKeyDoesNotExistError = {
  message: string;
};

/** Indicates the server rejected our group update. This can be due to errors such as trying to add a user that's already in the group. */
export type GroupPatchNotAcceptedError = {
  message: string;
};

/** approve a request to join a group */
export type ApproveMembershipRequest = {
  account: string;
  groupID: string;
  members: JsonAddress[];
};

export type GroupVerificationError = {
  message: string;
};

/** Query the server for the latest state of a known group. If the account is not a member of the group, an UnknownGroupError is returned. */
export type GetGroupRequest = {
  account: string;
  groupID: string;
  revision?: number;
};

export type InvalidGroupStateError = {
  message: string;
};

/** list all linked devices on a Signal account */
export type GetLinkedDevicesRequest = {
  account: string;
};

export type LinkedDevices = {
  devices: DeviceInfo[];
};

/** Join a group using the a signal.group URL. Note that you must have a profile name set to join groups. */
export type JoinGroupRequest = {
  account: string;
  uri: string;
};

export type JsonGroupJoinInfo = {
  groupID: string;
  title: string;
  description: string;
  memberCount: number;
  addFromInviteLink: number;
  revision: number;
  pendingAdminApproval: boolean;
};

export type InvalidInviteURIError = {
  message: string;
};

export type GroupNotActiveError = {
  message: string;
};

/** Remove a linked device from the Signal account. Only allowed when the local device id is 1 */
export type RemoveLinkedDeviceRequest = {
  account: string;
  deviceId: number;
};

/** modify a group. Note that only one modification action may be performed at once */
export type UpdateGroupRequest = {
  account: string;
  groupID: string;
  title?: string;
  description?: string;
  avatar?: string;
  updateTimer?: number;
  addMembers?: JsonAddress[];
  removeMembers?: JsonAddress[];
  updateRole?: GroupMember;
  updateAccessControl?: GroupAccessControl;
  resetLink?: boolean;
  announcements?: string;
};

/** A generic type that is used when the group version is not known */
export type GroupInfo = {
  v1: JsonGroupInfo;
  v2: JsonGroupV2Info;
};

/** returned in response to use v1 groups, which are no longer supported */
export type UnsupportedGroupError = {
  message: string;
};

export type SetProfile = {
  account: string;
  name: string;
  avatarFile: string;
  about: string;
  emoji: string;
  mobilecoin_address: string;
  visible_badge_ids: string[];
};

export type InvalidBase64Error = {
  message: string;
};

/** Resolve a partial JsonAddress with only a number or UUID to one with both. Anywhere that signald accepts a JsonAddress will except a partial, this is a convenience function for client authors, mostly because signald doesn't resolve all the partials it returns. */
export type ResolveAddressRequest = {
  account: string;
  partial: JsonAddress;
};

export type JsonAddress = {
  number: string;
  uuid: string;
  relay: string;
};

export type MarkReadRequest = {
  account: string;
  to: JsonAddress;
  timestamps: number[];
  when?: number;
};

/** Get all information available about a user */
export type GetProfileRequest = {
  account: string;
  async?: boolean;
  address: JsonAddress;
};

/** Information about a Signal user */
export type Profile = {
  name: string;
  avatar: string;
  address: JsonAddress;
  capabilities: Capabilities;
  color: string;
  about: string;
  emoji: string;
  contact_name: string;
  profile_name: string;
  inbox_position: number;
  expiration_time: number;
  mobilecoin_address: string;
  visible_badge_ids: string[];
};

export type ProfileUnavailableError = {
  message: string;
};

export type ListGroupsRequest = {
  account: string;
};

export type GroupList = {
  groups: JsonGroupV2Info[];
  legacyGroups: JsonGroupInfo[];
};

export type ListContactsRequest = {
  account: string;
  async?: boolean;
};

export type ProfileList = {
  profiles: Profile[];
};

export type CreateGroupRequest = {
  account: string;
  title: string;
  avatar?: string;
  members: JsonAddress[];
  timer?: number;
  member_role?: string;
};

export type NoKnownUUIDError = {
  message: string;
};

export type LeaveGroupRequest = {
  account: string;
  groupID: string;
};

/** Generate a linking URI. Typically this is QR encoded and scanned by the primary device. Submit the returned session_id with a finish_link request. */
export type GenerateLinkingURIRequest = {
  server?: string;
};

export type LinkingURI = {
  uri: string;
  session_id: string;
};

/** After a linking URI has been requested, finish_link must be called with the session_id provided with the URI. it will return information about the new account once the linking process is completed by the other device and the new account is setup. Note that the account setup process can sometimes take some time, if rapid userfeedback is required after scanning, use wait_for_scan first, then finish setup with finish_link. */
export type FinishLinkRequest = {
  overwrite?: boolean;
  device_name?: string;
  session_id?: string;
};

/** A local account in signald */
export type Account = {
  address: JsonAddress;
  pending: Boolean;
  pni: string;
  device_id: number;
  account_id: string;
};

export type NoSuchSessionError = {
  message: string;
};

export type UserAlreadyExistsError = {
  uuid: string;
  message: string;
};

export type ScanTimeoutError = {
  message: string;
};

/** Link a new device to a local Signal account */
export type AddLinkedDeviceRequest = {
  account: string;
  uri: string;
};

/** begin the account registration process by requesting a phone number verification code. when the code is received, submit it with a verify request */
export type RegisterRequest = {
  account: string;
  voice?: boolean;
  captcha?: string;
  server?: string;
};

export type CaptchaRequiredError = {
  more: string;
  message: string;
};

/** verify an account's phone number with a code after registering, completing the account creation process */
export type VerifyRequest = {
  account: string;
  code: string;
};

export type AccountHasNoKeysError = {
  message: string;
};

export type AccountAlreadyVerifiedError = {
  message: string;
};

export type AccountLockedError = {
  more: string;
  message: string;
};

/** Get information about a known keys for a particular address */
export type GetIdentitiesRequest = {
  account: string;
  address: JsonAddress;
};

/** a list of identity keys associated with a particular address */
export type IdentityKeyList = {
  address: JsonAddress;
  identities: IdentityKey[];
};

/** Trust another user's safety number using either the QR code data or the safety number text */
export type TrustRequest = {
  account: string;
  address: JsonAddress;
  safety_number?: string;
  qr_code_data?: string;
  trust_level?: string;
};

export type FingerprintVersionMismatchError = {
  message: string;
};

export type UnknownIdentityKeyError = {
  message: string;
};

export type InvalidFingerprintError = {
  message: string;
};

/** delete all account data signald has on disk, and optionally delete the account from the server as well. Note that this is not "unlink" and will delete the entire account, even from a linked device. */
export type DeleteAccountRequest = {
  account: string;
  server?: boolean;
};

/** send a typing started or stopped message */
export type TypingRequest = {
  account: string;
  address?: JsonAddress;
  group?: string;
  typing: boolean;
  when?: number;
};

export type InvalidGroupError = {
  message: string;
};

/** reset a session with a particular user */
export type ResetSessionRequest = {
  account: string;
  address: JsonAddress;
  timestamp?: number;
};

/** Request other devices on the account send us their group list, syncable config and contact list. */
export type RequestSyncRequest = {
  groups?: boolean;
  configuration?: boolean;
  contacts?: boolean;
  blocked?: boolean;
  keys?: boolean;
  account: string;
};

/** return all local accounts */
export type ListAccountsRequest = {};

export type AccountList = {
  accounts: Account[];
};

/** Get information about a group from a signal.group link */
export type GroupLinkInfoRequest = {
  account: string;
  uri: string;
};

export type GroupLinkNotActiveError = {
  message: string;
};

/** update information about a local contact */
export type UpdateContactRequest = {
  account: string;
  address: JsonAddress;
  name?: string;
  color?: string;
  inbox_position?: number;
};

/** Set the message expiration timer for a thread. Expiration must be specified in seconds, set to 0 to disable timer */
export type SetExpirationRequest = {
  account: string;
  address?: JsonAddress;
  group?: string;
  expiration: number;
};

/** set this device's name. This will show up on the mobile device on the same account under settings -> linked devices */
export type SetDeviceNameRequest = {
  account: string;
  device_name?: string;
};

/** get all known identity keys */
export type GetAllIdentities = {
  account: string;
};

export type AllIdentityKeyList = {
  identity_keys: IdentityKeyList[];
};

/** receive incoming messages. After making a subscribe request, incoming messages will be sent to the client encoded as ClientMessageWrapper. Send an unsubscribe request or disconnect from the socket to stop receiving messages. */
export type SubscribeRequest = {
  account: string;
};

/** See subscribe for more info */
export type UnsubscribeRequest = {
  account: string;
};

/** delete a message previously sent */
export type RemoteDeleteRequest = {
  account: string;
  address?: JsonAddress;
  group?: string;
  timestamp: number;
  members?: JsonAddress[];
};

/** add a new server to connect to. Returns the new server's UUID. */
export type AddServerRequest = {
  server: Server;
};

export type GetServersRequest = {};

export type ServerList = {
  servers: Server[];
};

export type RemoveServerRequest = {
  uuid?: string;
};

/** send a mobilecoin payment */
export type SendPaymentRequest = {
  account: string;
  address: JsonAddress;
  payment: Payment;
  when?: number;
};

/** Retrieves the remote config (feature flags) from the server. */
export type RemoteConfigRequest = {
  account: string;
};

export type RemoteConfigList = {
  config: RemoteConfig[];
};

/** deny a request to join a group */
export type RefuseMembershipRequest = {
  account: string;
  members: JsonAddress[];
  group_id: string;
  also_ban?: boolean;
};

export type SubmitChallengeRequest = {
  account: string;
  challenge: string;
  captcha_token?: string;
};

/** Determine whether an account identifier is registered on the Signal service. */
export type IsIdentifierRegisteredRequest = {
  account: string;
  identifier: string;
};

/** A message containing a single boolean, usually as a response */
export type BooleanMessage = {
  value: boolean;
};

/** An optional part of the linking process. Intended to be called after displaying the QR code, will return quickly after the user scans the QR code. finish_link must be called after wait_for_scan returns a non-error */
export type WaitForScanRequest = {
  session_id?: string;
};

/** Query the server for group revision history. The history contains information about the changes between each revision and the user that made the change. */
export type GetGroupRevisionPagesRequest = {
  account: string;
  group_id: string;
  from_revision: number;
  include_first_revision?: boolean;
};

/** The result of fetching a group's history along with paging data. */
export type GroupHistoryPage = {
  results: GroupHistoryEntry[];
  paging_data: PagingData;
};

/** Sends a sync message to the account's devices */
export type SendSyncMessageRequest = {
  account: string;
  view_once_open_message?: JsonViewOnceOpenMessage;
  message_request_response?: JsonMessageRequestResponseMessage;
};

export type JsonSendMessageResult = {
  address: JsonAddress;
  success: SendSuccess;
  networkFailure: boolean;
  unregisteredFailure: boolean;
  identityFailure: string;
  proof_required_failure: ProofRequiredError;
};

/** Bans users from a group. This works even if the users aren't in the group. If they are currently in the group, they will also be removed. */
export type BanUserRequest = {
  account: string;
  group_id: string;
  users: JsonAddress[];
};

/** Unbans users from a group. */
export type UnbanUserRequest = {
  account: string;
  group_id: string;
  users: JsonAddress[];
};

export type IdentityKey = {
  added: number;
  safety_number: string;
  qr_code_data: string;
  trust_level: string;
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
  payment: Payment;
  is_expiration_update: boolean;
  group_call_update: string;
  story_context: StoryContext;
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

export type CallMessage = {
  offer_message: OfferMessage;
  answer_message: AnswerMessage;
  busy_message: BusyMessage;
  hangup_message: HangupMessage;
  ice_update_message: IceUpdateMessage[];
  destination_device_id: number;
  multi_ring: boolean;
};

export type ReceiptMessage = {
  type: string;
  timestamps: number[];
  when: number;
};

export type TypingMessage = {
  action: string;
  timestamp: number;
  group_id: string;
};

export type StoryMessage = {
  group: JsonGroupV2Info;
  file: JsonAttachment;
  text: TextAttachment;
  allow_replies: Boolean;
};

export type DecryptionErrorMessage = {
  timestamp: number;
  device_id: number;
  ratchet_key: string;
};

/** represents a file attached to a message. When sending, only `filename` is required. */
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

/** A quote is a reply to a previous message. ID is the sent time of the message being replied to */
export type JsonQuote = {
  id: number;
  author: JsonAddress;
  text: string;
  attachments: JsonQuotedAttachment[];
  mentions: JsonMention[];
};

export type JsonMention = {
  uuid: string;
  start: number;
  length: number;
};

/** metadata about one of the links in a message */
export type JsonPreview = {
  url: string;
  title: string;
  description: string;
  date: number;
  attachment: JsonAttachment;
};

export type JsonReaction = {
  emoji: string;
  remove: boolean;
  targetAuthor: JsonAddress;
  targetSentTimestamp: number;
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

export type BannedGroupMember = {
  uuid: string;
  timestamp: number;
};

/** Represents a group change made by a user. This can also represent request link invites. Only the fields relevant to the group change performed will be set. Note that in signald, group changes are currently only received from incoming messages from a message subscription. */
export type GroupChange = {
  editor: JsonAddress;
  revision: number;
  new_members: GroupMember[];
  delete_members: JsonAddress[];
  modify_member_roles: GroupMember[];
  modified_profile_keys: GroupMember[];
  new_pending_members: GroupPendingMember[];
  delete_pending_members: JsonAddress[];
  promote_pending_members: GroupMember[];
  new_banned_members: BannedGroupMember[];
  new_unbanned_members: BannedGroupMember[];
  new_title: string;
  new_avatar: Boolean;
  new_timer: number;
  new_access_control: GroupAccessControl;
  new_requesting_members: GroupRequestingMember[];
  delete_requesting_members: JsonAddress[];
  promote_requesting_members: GroupMember[];
  new_invite_link_password: Boolean;
  new_description: string;
  new_is_announcement_group: string;
};

export type DeviceInfo = {
  id: number;
  name: string;
  created: number;
  lastSeen: number;
};

/** information about a legacy group */
export type JsonGroupInfo = {
  groupId: string;
  members: JsonAddress[];
  name: string;
  type: string;
  avatarId: number;
};

export type Capabilities = {
  gv2: boolean;
  storage: boolean;
  stories: boolean;
  "gv1-migration": boolean;
  sender_key: boolean;
  announcement_group: boolean;
  change_number: boolean;
};

/** a Signal server */
export type Server = {
  uuid: string;
  proxy: string;
  ca: string;
  service_url: string;
  cdn_urls: ServerCDN[];
  contact_discovery_url: string;
  key_backup_url: string;
  storage_url: string;
  zk_param: string;
  unidentified_sender_root: string;
  key_backup_service_name: string;
  key_backup_service_id: string;
  key_backup_mrenclave: string;
  cds_mrenclave: string;
  ias_ca: string;
};

/** details about a MobileCoin payment */
export type Payment = {
  receipt: string;
  note: string;
};

/** A remote config (feature flag) entry. */
export type RemoteConfig = {
  name: string;
  value: string;
};

export type GroupHistoryEntry = {
  group: JsonGroupV2Info;
  change: GroupChange;
};

export type PagingData = {
  has_more_pages: boolean;
  next_page_revision: number;
};

export type JsonViewOnceOpenMessage = {
  sender: JsonAddress;
  timestamp: number;
};

/** Responses to message requests from unknown users or groups */
export type JsonMessageRequestResponseMessage = {
  person: JsonAddress;
  groupId: string;
  type: string;
};

export type SendSuccess = {
  unidentified: boolean;
  needsSync: boolean;
  duration: number;
  devices: number[];
};

export type SharedContact = {
  name: SharedContactName;
  email: SharedContactEmail[];
  phone: SharedContactPhone[];
  address: SharedContactAddress[];
  avatar: SharedContactAvatar;
  organization: string;
};

export type RemoteDelete = {
  target_sent_timestamp: number;
};

export type StoryContext = {
  author: string;
  sent_timestamp: number;
};

export type JsonSentTranscriptMessage = {
  destination: JsonAddress;
  timestamp: number;
  expirationStartTimestamp: number;
  message: JsonDataMessage;
  story: StoryMessage;
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

export type JsonVerifiedMessage = {
  destination: JsonAddress;
  identityKey: string;
  verified: string;
  timestamp: number;
};

export type OfferMessage = {
  id: number;
  sdp: string;
  type: string;
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
  type: string;
  legacy: boolean;
  device_id: number;
};

export type IceUpdateMessage = {
  id: number;
  opaque: string;
  sdp: string;
};

export type TextAttachment = {
  text: string;
  style: string;
  preview: JsonPreview;
  text_foreground_color: string;
  text_background_color: string;
  background_gradient: Gradient;
  background_color: string;
};

export type GroupPendingMember = {
  uuid: string;
  role: string;
  timestamp: number;
  added_by_uuid: string;
};

export type GroupRequestingMember = {
  uuid: string;
  timestamp: number;
};

export type ServerCDN = {
  number: number;
  url: string;
};

export type SharedContactName = {
  display: string;
  given: string;
  middle: string;
  family: string;
  prefix: string;
  suffix: string;
};

export type SharedContactEmail = {
  type: string;
  value: string;
  label: string;
};

export type SharedContactPhone = {
  type: string;
  value: string;
  label: string;
};

export type SharedContactAddress = {
  type: string;
  label: string;
  street: string;
  pobox: string;
  neighborhood: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export type SharedContactAvatar = {
  attachment: JsonAttachment;
  is_profile: boolean;
};

export type Gradient = {
  colors: string[];
  angle: number;
  positions: number[];
  start_color: string;
  end_color: string;
};

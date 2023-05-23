import {
  JsonSticker,
  ConfigurationMessage,
  JsonStickerPackOperationMessage,
  JsonQuotedAttachment,
} from "../v0/types";
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

export type ListenerState = {
  connected: boolean;
};

export type WebSocketConnectionState = {
  state: string;
  socket: string;
};

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

export type SignalServerError = {
  message: string;
};

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

export type AcceptInvitationRequest = {
  account: string;
  groupID: string;
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
  announcements: string;
  removed: boolean;
  banned_members: BannedGroupMember[];
  group_change: GroupChange;
};

export type OwnProfileKeyDoesNotExistError = {
  message: string;
};

export type GroupPatchNotAcceptedError = {
  message: string;
};

export type ApproveMembershipRequest = {
  account: string;
  groupID: string;
  members: JsonAddress[];
};

export type GroupVerificationError = {
  message: string;
};

export type GetGroupRequest = {
  account: string;
  groupID: string;
  revision?: number;
};

export type InvalidGroupStateError = {
  message: string;
};

export type GetLinkedDevicesRequest = {
  account: string;
};

export type LinkedDevices = {
  devices: DeviceInfo[];
};

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

export type RemoveLinkedDeviceRequest = {
  account: string;
  deviceId: number;
};

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

export type GroupInfo = {
  v1: JsonGroupInfo;
  v2: JsonGroupV2Info;
};

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

export type GetProfileRequest = {
  account: string;
  async?: boolean;
  address: JsonAddress;
};

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

export type GenerateLinkingURIRequest = {
  server?: string;
};

export type LinkingURI = {
  uri: string;
  session_id: string;
};

export type FinishLinkRequest = {
  overwrite?: boolean;
  device_name?: string;
  session_id?: string;
};

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

export type AddLinkedDeviceRequest = {
  account: string;
  uri: string;
};

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

export type GetIdentitiesRequest = {
  account: string;
  address: JsonAddress;
};

export type IdentityKeyList = {
  address: JsonAddress;
  identities: IdentityKey[];
};

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

export type DeleteAccountRequest = {
  account: string;
  server?: boolean;
};

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

export type ResetSessionRequest = {
  account: string;
  address: JsonAddress;
  timestamp?: number;
};

export type RequestSyncRequest = {
  groups?: boolean;
  configuration?: boolean;
  contacts?: boolean;
  blocked?: boolean;
  keys?: boolean;
  account: string;
};

export type ListAccountsRequest = {};

export type AccountList = {
  accounts: Account[];
};

export type GroupLinkInfoRequest = {
  account: string;
  uri: string;
};

export type GroupLinkNotActiveError = {
  message: string;
};

export type UpdateContactRequest = {
  account: string;
  address: JsonAddress;
  name?: string;
  color?: string;
  inbox_position?: number;
};

export type SetExpirationRequest = {
  account: string;
  address?: JsonAddress;
  group?: string;
  expiration: number;
};

export type SetDeviceNameRequest = {
  account: string;
  device_name?: string;
};

export type GetAllIdentities = {
  account: string;
};

export type AllIdentityKeyList = {
  identity_keys: IdentityKeyList[];
};

export type SubscribeRequest = {
  account: string;
};

export type UnsubscribeRequest = {
  account: string;
};

export type RemoteDeleteRequest = {
  account: string;
  address?: JsonAddress;
  group?: string;
  timestamp: number;
  members?: JsonAddress[];
};

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

export type SendPaymentRequest = {
  account: string;
  address: JsonAddress;
  payment: Payment;
  when?: number;
};

export type RemoteConfigRequest = {
  account: string;
};

export type RemoteConfigList = {
  config: RemoteConfig[];
};

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

export type IsIdentifierRegisteredRequest = {
  account: string;
  identifier: string;
};

export type BooleanMessage = {
  value: boolean;
};

export type WaitForScanRequest = {
  session_id?: string;
};

export type GetGroupRevisionPagesRequest = {
  account: string;
  group_id: string;
  from_revision: number;
  include_first_revision?: boolean;
};

export type GroupHistoryPage = {
  results: GroupHistoryEntry[];
  paging_data: PagingData;
};

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

export type BanUserRequest = {
  account: string;
  group_id: string;
  users: JsonAddress[];
};

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

export type Payment = {
  receipt: string;
  note: string;
};

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

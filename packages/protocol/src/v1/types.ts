import {
  JsonSticker,
  ConfigurationMessage,
  JsonStickerPackOperationMessage,
  JsonQuotedAttachment,
} from "../v0/types";

/**
 * Wraps all incoming messages sent to the client after a v1 subscribe request is issued
 */
export type ClientMessageWrapper = {
  /**
   * the type of object to expect in the `data` field
   */
  type?: string;
  /**
   * the version of the object in the `data` field
   */
  version?: string;
  /**
   * the incoming object. The structure will vary from message to message, see `type` and `version` fields
   */
  data?: Object;
  /**
   * true if the incoming message represents an error
   */
  error?: Boolean;
  /**
   * the account this message is from
   */
  account?: string;
};

export type UntrustedIdentityError = {
  identifier?: string;
  message?: string;
  identity_key?: IdentityKey;
};

export type ProtocolInvalidKeyIdError = {
  sender?: string;
  timestamp?: number;
  message?: string;
  sender_device?: number;
  content_hint?: number;
  group_id?: string;
};

export type DuplicateMessageError = {
  timestamp?: number;
  message?: string;
};

export type NetworkError = {
  message?: string;
};

export type ProtocolInvalidMessageError = {
  sender?: string;
  timestamp?: number;
  message?: string;
  sender_device?: number;
  content_hint?: number;
  group_id?: string;
};

export type ProtocolNoSessionError = {
  sender?: string;
  timestamp?: number;
  message?: string;
  sender_device?: number;
  content_hint?: number;
  group_id?: string;
};

export type IncomingMessage = {
  account?: string;
  source?: JsonAddress;
  type?: string;
  timestamp?: number;
  source_device?: number;
  server_receiver_timestamp?: number;
  server_deliver_timestamp?: number;
  /**
   * removed from protocl
   */
  has_legacy_message?: boolean;
  has_content?: boolean;
  unidentified_sender?: boolean;
  data_message?: JsonDataMessage;
  sync_message?: JsonSyncMessage;
  call_message?: CallMessage;
  receipt_message?: ReceiptMessage;
  typing_message?: TypingMessage;
  story_message?: StoryMessage;
  server_guid?: string;
  decryption_error_message?: DecryptionErrorMessage;
};

/**
 * prior attempt to indicate signald connectivity state. WebSocketConnectionState messages will be delivered at the  same time as well as in other parts of the websocket lifecycle.
 */
export type ListenerState = {
  connected?: boolean;
};

/**
 * indicates when the websocket connection state to the signal server has changed
 */
export type WebSocketConnectionState = {
  /**
   * One of: DISCONNECTED, CONNECTING, CONNECTED, RECONNECTING, DISCONNECTING, AUTHENTICATION_FAILED, FAILED
   */
  state?: string;
  /**
   * One of: UNIDENTIFIED, IDENTIFIED
   */
  socket?: string;
};

/**
 * Broadcast to subscribed clients when there is a state change from the storage service
 */
export type StorageChange = {
  /**
   * Seems to behave like the group version numbers and increments every time the state changes
   */
  version?: number;
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
  /**
   * Optionally set to a sub-set of group members. Ignored if recipientGroupId isn't specified
   */
  members?: JsonAddress[];
  /**
   * set to true when replying to a story
   */
  is_for_story?: boolean;
};

export type SendResponse = {
  results?: JsonSendMessageResult[];
  timestamp?: number;
};

export type NoSuchAccountError = {
  account?: string;
  message?: string;
};

export type ServerNotFoundError = {
  uuid?: string;
  message?: string;
};

export type InvalidProxyError = {
  message?: string;
};

export type NoSendPermissionError = {
  message?: string;
};

export type InvalidAttachmentError = {
  filename?: string;
  message?: string;
};

/**
 * an internal error in signald has occurred. typically these are things that "should never happen" such as issues saving to the local disk, but it is also the default error type and may catch some things that should have their own error type. If you find tht your code is depending on the exception list for any particular behavior, please file an issue so we can pull those errors out to a separate error type: https://gitlab.com/signald/signald/-/issues/new
 */
export type InternalError = {
  exceptions?: string[];
  message?: string;
};

export type InvalidRequestError = {
  message?: string;
};

export type UnknownGroupError = {
  message?: string;
};

export type RateLimitError = {
  message?: string;
};

export type InvalidRecipientError = {
  message?: string;
};

export type AttachmentTooLargeError = {
  filename?: string;
  message?: string;
};

/**
 * Indicates the server rejected our credentials or a failed group update. Typically means the linked device was removed by the primary device, or that the account was re-registered. For group updates, this can indicate that we lack permissions.
 */
export type AuthorizationFailedError = {
  message?: string;
};

export type SQLError = {
  message?: string;
};

export type ProofRequiredError = {
  token?: string;
  /**
   * possible list values are RECAPTCHA and PUSH_CHALLENGE
   */
  options?: string[];
  message?: string;
  /**
   * value in seconds
   */
  retry_after?: number;
};

/**
 * indicates signald received an http 500 status code from the server
 */
export type SignalServerError = {
  message?: string;
};

/**
 * react to a previous message
 */
export type ReactRequest = {
  username: string;
  recipientAddress?: JsonAddress;
  recipientGroupId?: string;
  reaction: JsonReaction;
  timestamp?: number;
  /**
   * Optionally set to a sub-set of group members. Ignored if recipientGroupId isn't specified
   */
  members?: JsonAddress[];
};

export type UnregisteredUserError = {
  message?: string;
  e164_number?: string;
};

export type VersionRequest = {};

export type JsonVersionMessage = {
  name?: string;
  version?: string;
  branch?: string;
  commit?: string;
};

/**
 * Accept a v2 group invitation. Note that you must have a profile name set to join groups.
 */
export type AcceptInvitationRequest = {
  /**
   * The account to interact with
   */
  account: string;
  groupID: string;
};

/**
 * Information about a Signal group
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
  /**
   * indicates if the group is an announcements group. Only admins are allowed to send messages to announcements groups. Options are UNKNOWN, ENABLED or DISABLED
   */
  announcements?: string;
  /**
   * will be set to true for incoming messages to indicate the user has been removed from the group
   */
  removed?: boolean;
  banned_members?: BannedGroupMember[];
  /**
   * Represents a peer-to-peer group change done by a user. Will not be set if the group change signature fails verification. This is usually only set inside of incoming messages.
   */
  group_change?: GroupChange;
};

export type OwnProfileKeyDoesNotExistError = {
  message?: string;
};

/**
 * Indicates the server rejected our group update. This can be due to errors such as trying to add a user that's already in the group.
 */
export type GroupPatchNotAcceptedError = {
  message?: string;
};

/**
 * approve a request to join a group
 */
export type ApproveMembershipRequest = {
  /**
   * The account to interact with
   */
  account: string;
  groupID: string;
  /**
   * list of requesting members to approve
   */
  members: JsonAddress[];
};

export type GroupVerificationError = {
  message?: string;
};

/**
 * Query the server for the latest state of a known group. If the account is not a member of the group, an UnknownGroupError is returned.
 */
export type GetGroupRequest = {
  /**
   * The account to interact with
   */
  account: string;
  groupID: string;
  /**
   * the latest known revision, default value (-1) forces fetch from server
   */
  revision?: number;
};

export type InvalidGroupStateError = {
  message?: string;
};

/**
 * list all linked devices on a Signal account
 */
export type GetLinkedDevicesRequest = {
  /**
   * The account to interact with
   */
  account: string;
};

export type LinkedDevices = {
  devices?: DeviceInfo[];
};

/**
 * Join a group using the a signal.group URL. Note that you must have a profile name set to join groups.
 */
export type JoinGroupRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * The signal.group URL
   */
  uri: string;
};

export type JsonGroupJoinInfo = {
  groupID?: string;
  title?: string;
  description?: string;
  memberCount?: number;
  /**
   * The access level required in order to join the group from the invite link, as an AccessControl.AccessRequired enum from the upstream Signal groups.proto file. This is UNSATISFIABLE (4) when the group link is disabled; ADMINISTRATOR (3) when the group link is enabled, but an administrator must approve new members; and ANY (1) when the group link is enabled and no approval is required. See theGroupAccessControl structure and the upstream enum ordinals.
   */
  addFromInviteLink?: number;
  /**
   * The Group V2 revision. This is incremented by clients whenever they update group information, and it is often used by clients to determine if the local group state is out-of-date with the server's revision.
   */
  revision?: number;
  /**
   * Whether the account is waiting for admin approval in order to be added to the group.
   */
  pendingAdminApproval?: boolean;
};

export type InvalidInviteURIError = {
  message?: string;
};

export type GroupNotActiveError = {
  message?: string;
};

/**
 * Remove a linked device from the Signal account. Only allowed when the local device id is 1
 */
export type RemoveLinkedDeviceRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * the ID of the device to unlink
   */
  deviceId: number;
};

/**
 * modify a group. Note that only one modification action may be performed at once
 */
export type UpdateGroupRequest = {
  /**
   * The identifier of the account to interact with
   */
  account: string;
  /**
   * the ID of the group to update
   */
  groupID: string;
  title?: string;
  /**
   * A new group description. Set to empty string to remove an existing description.
   */
  description?: string;
  avatar?: string;
  /**
   * update the group timer.
   */
  updateTimer?: number;
  addMembers?: JsonAddress[];
  removeMembers?: JsonAddress[];
  updateRole?: GroupMember;
  /**
   * note that only one of the access controls may be updated per request
   */
  updateAccessControl?: GroupAccessControl;
  /**
   * regenerate the group link password, invalidating the old one
   */
  resetLink?: boolean;
  /**
   * ENABLED to only allow admins to post messages, DISABLED to allow anyone to post
   */
  announcements?: string;
};

/**
 * A generic type that is used when the group version is not known
 */
export type GroupInfo = {
  v1?: JsonGroupInfo;
  v2?: JsonGroupV2Info;
};

/**
 * returned in response to use v1 groups, which are no longer supported
 */
export type UnsupportedGroupError = {
  message?: string;
};

export type SetProfile = {
  /**
   * The phone number of the account to use
   */
  account: string;
  /**
   * Change the profile name
   */
  name?: string;
  /**
   * Path to new profile avatar file. If unset or null, unset the profile avatar
   */
  avatarFile?: string;
  /**
   * Change the 'about' profile field
   */
  about?: string;
  /**
   * Change the profile emoji
   */
  emoji?: string;
  /**
   * Change the profile payment address. Payment address must be a *base64-encoded* MobileCoin address. Note that this is not the traditional MobileCoin address encoding, which is custom. Clients are responsible for converting between MobileCoin's custom base58 on the user-facing side and base64 encoding on the signald side.
   */
  mobilecoin_address?: string;
  /**
   * configure visible badge IDs
   */
  visible_badge_ids?: string[];
};

export type InvalidBase64Error = {
  message?: string;
};

/**
 * Resolve a partial JsonAddress with only a number or UUID to one with both. Anywhere that signald accepts a JsonAddress will except a partial, this is a convenience function for client authors, mostly because signald doesn't resolve all the partials it returns.
 */
export type ResolveAddressRequest = {
  /**
   * The signal account to use
   */
  account: string;
  /**
   * The partial address, missing fields
   */
  partial: JsonAddress;
};

export type JsonAddress = {
  /**
   * An e164 phone number, starting with +. Currently the only available user-facing Signal identifier.
   */
  number?: string;
  /**
   * A UUID, the unique identifier for a particular Signal account.
   */
  uuid?: string;
  relay?: string;
};

export type MarkReadRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * The address that sent the message being marked as read
   */
  to: JsonAddress;
  /**
   * List of messages to mark as read
   */
  timestamps: number[];
  when?: number;
};

/**
 * Get all information available about a user
 */
export type GetProfileRequest = {
  /**
   * the signald account to use
   */
  account: string;
  /**
   * if true, return results from local store immediately, refreshing from server in the background if needed. if false (default), block until profile can be retrieved from server
   */
  async?: boolean;
  /**
   * the address to look up
   */
  address: JsonAddress;
};

/**
 * Information about a Signal user
 */
export type Profile = {
  /**
   * The user's name from local contact names if available, or if not in contact list their Signal profile name
   */
  name?: string;
  /**
   * path to avatar on local disk
   */
  avatar?: string;
  address?: JsonAddress;
  capabilities?: Capabilities;
  /**
   * color of the chat with this user
   */
  color?: string;
  about?: string;
  emoji?: string;
  /**
   * The user's name from local contact names
   */
  contact_name?: string;
  /**
   * The user's Signal profile name
   */
  profile_name?: string;
  inbox_position?: number;
  expiration_time?: number;
  /**
   * *base64-encoded* mobilecoin address. Note that this is not the traditional MobileCoin address encoding. Clients are responsible for converting between MobileCoin's custom base58 on the user-facing side and base64 encoding on the signald side. If unset, null or an empty string, will empty the profile payment address
   */
  mobilecoin_address?: string;
  /**
   * currently unclear how these work, as they are not available in the production Signal apps
   */
  visible_badge_ids?: string[];
};

export type ProfileUnavailableError = {
  message?: string;
};

export type ListGroupsRequest = {
  account: string;
};

export type GroupList = {
  groups?: JsonGroupV2Info[];
  /**
   * list of legacy (v1) groups, no longer supported (will always be empty)
   */
  legacyGroups?: JsonGroupInfo[];
};

export type ListContactsRequest = {
  account: string;
  /**
   * return results from local store immediately, refreshing from server afterward if needed. If false (default), block until all pending profiles have been retrieved.
   */
  async?: boolean;
};

export type ProfileList = {
  profiles?: Profile[];
};

export type CreateGroupRequest = {
  /**
   * The account to interact with
   */
  account: string;
  title: string;
  avatar?: string;
  members: JsonAddress[];
  /**
   * the message expiration timer
   */
  timer?: number;
  /**
   * The role of all members other than the group creator. Options are ADMINISTRATOR or DEFAULT (case insensitive)
   */
  member_role?: string;
};

export type NoKnownUUIDError = {
  message?: string;
};

export type LeaveGroupRequest = {
  /**
   * The account to use
   */
  account: string;
  /**
   * The group to leave
   */
  groupID: string;
};

/**
 * Generate a linking URI. Typically this is QR encoded and scanned by the primary device. Submit the returned session_id with a finish_link request.
 */
export type GenerateLinkingURIRequest = {
  /**
   * The identifier of the server to use. Leave blank for default (usually Signal production servers but configurable at build time)
   */
  server?: string;
};

export type LinkingURI = {
  uri?: string;
  session_id?: string;
};

/**
 * After a linking URI has been requested, finish_link must be called with the session_id provided with the URI. it will return information about the new account once the linking process is completed by the other device and the new account is setup. Note that the account setup process can sometimes take some time, if rapid userfeedback is required after scanning, use wait_for_scan first, then finish setup with finish_link.
 */
export type FinishLinkRequest = {
  /**
   * overwrite existing account data if the phone number conflicts. false by default
   */
  overwrite?: boolean;
  device_name?: string;
  session_id?: string;
};

/**
 * A local account in signald
 */
export type Account = {
  /**
   * The address of this account
   */
  address?: JsonAddress;
  /**
   * indicates the account has not completed registration
   */
  pending?: Boolean;
  pni?: string;
  /**
   * The Signal device ID. Official Signal mobile clients (iPhone and Android) have device ID = 1, while linked devices such as Signal Desktop or Signal iPad have higher device IDs.
   */
  device_id?: number;
  /**
   * The primary identifier on the account, included with all requests to signald for this account. Previously called 'username'
   */
  account_id?: string;
};

export type NoSuchSessionError = {
  message?: string;
};

export type UserAlreadyExistsError = {
  uuid?: string;
  message?: string;
};

export type ScanTimeoutError = {
  message?: string;
};

/**
 * Link a new device to a local Signal account
 */
export type AddLinkedDeviceRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * the sgnl://linkdevice uri provided (typically in qr code form) by the new device
   */
  uri: string;
};

/**
 * begin the account registration process by requesting a phone number verification code. when the code is received, submit it with a verify request
 */
export type RegisterRequest = {
  /**
   * the e164 phone number to register with
   */
  account: string;
  /**
   * set to true to request a voice call instead of an SMS for verification
   */
  voice?: boolean;
  /**
   * See https://signald.org/articles/captcha/
   */
  captcha?: string;
  /**
   * The identifier of the server to use. Leave blank for default (usually Signal production servers but configurable at build time)
   */
  server?: string;
};

export type CaptchaRequiredError = {
  more?: string;
  message?: string;
};

/**
 * verify an account's phone number with a code after registering, completing the account creation process
 */
export type VerifyRequest = {
  /**
   * the e164 phone number being verified
   */
  account: string;
  /**
   * the verification code, dash (-) optional
   */
  code: string;
};

export type AccountHasNoKeysError = {
  message?: string;
};

export type AccountAlreadyVerifiedError = {
  message?: string;
};

export type AccountLockedError = {
  more?: string;
  message?: string;
};

/**
 * Get information about a known keys for a particular address
 */
export type GetIdentitiesRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * address to get keys for
   */
  address: JsonAddress;
};

/**
 * a list of identity keys associated with a particular address
 */
export type IdentityKeyList = {
  address?: JsonAddress;
  identities?: IdentityKey[];
};

/**
 * Trust another user's safety number using either the QR code data or the safety number text
 */
export type TrustRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * The user to query identity keys for
   */
  address: JsonAddress;
  /**
   * required if qr_code_data is absent
   */
  safety_number?: string;
  /**
   * base64-encoded QR code data. required if safety_number is absent
   */
  qr_code_data?: string;
  /**
   * One of TRUSTED_UNVERIFIED, TRUSTED_VERIFIED or UNTRUSTED. Default is TRUSTED_VERIFIED
   */
  trust_level?: string;
};

export type FingerprintVersionMismatchError = {
  message?: string;
};

export type UnknownIdentityKeyError = {
  message?: string;
};

export type InvalidFingerprintError = {
  message?: string;
};

/**
 * delete all account data signald has on disk, and optionally delete the account from the server as well. Note that this is not "unlink" and will delete the entire account, even from a linked device.
 */
export type DeleteAccountRequest = {
  /**
   * The account to delete
   */
  account: string;
  /**
   * delete account information from the server as well (default false)
   */
  server?: boolean;
};

/**
 * send a typing started or stopped message
 */
export type TypingRequest = {
  /**
   * The account to use
   */
  account: string;
  address?: JsonAddress;
  group?: string;
  typing: boolean;
  when?: number;
};

export type InvalidGroupError = {
  message?: string;
};

/**
 * reset a session with a particular user
 */
export type ResetSessionRequest = {
  /**
   * The account to use
   */
  account: string;
  /**
   * the user to reset session with
   */
  address: JsonAddress;
  timestamp?: number;
};

/**
 * Request other devices on the account send us their group list, syncable config and contact list.
 */
export type RequestSyncRequest = {
  /**
   * request group sync (default true)
   */
  groups?: boolean;
  /**
   * request configuration sync (default true)
   */
  configuration?: boolean;
  /**
   * request contact sync (default true)
   */
  contacts?: boolean;
  /**
   * request block list sync (default true)
   */
  blocked?: boolean;
  /**
   * request storage service keys
   */
  keys?: boolean;
  /**
   * The account to use
   */
  account: string;
};

/**
 * return all local accounts
 */
export type ListAccountsRequest = {};

export type AccountList = {
  accounts?: Account[];
};

/**
 * Get information about a group from a signal.group link
 */
export type GroupLinkInfoRequest = {
  /**
   * The account to use
   */
  account: string;
  /**
   * the signald.group link
   */
  uri: string;
};

export type GroupLinkNotActiveError = {
  message?: string;
};

/**
 * update information about a local contact
 */
export type UpdateContactRequest = {
  account: string;
  address: JsonAddress;
  name?: string;
  color?: string;
  inbox_position?: number;
};

/**
 * Set the message expiration timer for a thread. Expiration must be specified in seconds, set to 0 to disable timer
 */
export type SetExpirationRequest = {
  /**
   * The account to use
   */
  account: string;
  address?: JsonAddress;
  group?: string;
  expiration: number;
};

/**
 * set this device's name. This will show up on the mobile device on the same account under settings -> linked devices
 */
export type SetDeviceNameRequest = {
  /**
   * The account to set the device name of
   */
  account: string;
  /**
   * The device name
   */
  device_name?: string;
};

/**
 * get all known identity keys
 */
export type GetAllIdentities = {
  /**
   * The account to interact with
   */
  account: string;
};

export type AllIdentityKeyList = {
  identity_keys?: IdentityKeyList[];
};

/**
 * receive incoming messages. After making a subscribe request, incoming messages will be sent to the client encoded as ClientMessageWrapper. Send an unsubscribe request or disconnect from the socket to stop receiving messages.
 */
export type SubscribeRequest = {
  /**
   * The account to subscribe to incoming message for
   */
  account: string;
};

/**
 * See subscribe for more info
 */
export type UnsubscribeRequest = {
  /**
   * The account to unsubscribe from
   */
  account: string;
};

/**
 * delete a message previously sent
 */
export type RemoteDeleteRequest = {
  /**
   * the account to use
   */
  account: string;
  /**
   * the address to send the delete message to. should match address the message to be deleted was sent to. required if group is not set.
   */
  address?: JsonAddress;
  /**
   * the group to send the delete message to. should match group the message to be deleted was sent to. required if address is not set.
   */
  group?: string;
  timestamp: number;
  /**
   * Optionally set to a sub-set of group members. Ignored if group isn't specified
   */
  members?: JsonAddress[];
};

/**
 * add a new server to connect to. Returns the new server's UUID.
 */
export type AddServerRequest = {
  server: Server;
};

export type GetServersRequest = {};

export type ServerList = {
  servers?: Server[];
};

export type RemoveServerRequest = {
  uuid?: string;
};

/**
 * send a mobilecoin payment
 */
export type SendPaymentRequest = {
  /**
   * the account to use
   */
  account: string;
  /**
   * the address to send the payment message to
   */
  address: JsonAddress;
  payment: Payment;
  when?: number;
};

/**
 * Retrieves the remote config (feature flags) from the server.
 */
export type RemoteConfigRequest = {
  /**
   * The account to use to retrieve the remote config
   */
  account: string;
};

export type RemoteConfigList = {
  config?: RemoteConfig[];
};

/**
 * deny a request to join a group
 */
export type RefuseMembershipRequest = {
  /**
   * The account to interact with
   */
  account: string;
  /**
   * list of requesting members to refuse
   */
  members: JsonAddress[];
  group_id: string;
  also_ban?: boolean;
};

export type SubmitChallengeRequest = {
  account: string;
  challenge: string;
  captcha_token?: string;
};

/**
 * Determine whether an account identifier is registered on the Signal service.
 */
export type IsIdentifierRegisteredRequest = {
  /**
   * The account to use to use
   */
  account: string;
  /**
   * The UUID of an identifier to check if it is registered on Signal. This UUID is either a Phone Number Identity (PNI) or an Account Identity (ACI).
   */
  identifier: string;
};

/**
 * A message containing a single boolean, usually as a response
 */
export type BooleanMessage = {
  value?: boolean;
};

/**
 * An optional part of the linking process. Intended to be called after displaying the QR code, will return quickly after the user scans the QR code. finish_link must be called after wait_for_scan returns a non-error
 */
export type WaitForScanRequest = {
  session_id?: string;
};

/**
 * Query the server for group revision history. The history contains information about the changes between each revision and the user that made the change.
 */
export type GetGroupRevisionPagesRequest = {
  /**
   * The account to interact with
   */
  account: string;
  group_id: string;
  /**
   * The revision to start the pages from. Note that if this is lower than the revision you joined the group, an AuthorizationFailedError is returned.
   */
  from_revision: number;
  /**
   * Whether to include the first state in the returned pages (default false)
   */
  include_first_revision?: boolean;
};

/**
 * The result of fetching a group's history along with paging data.
 */
export type GroupHistoryPage = {
  results?: GroupHistoryEntry[];
  paging_data?: PagingData;
};

/**
 * Sends a sync message to the account's devices
 */
export type SendSyncMessageRequest = {
  account: string;
  /**
   * This can be set to indicate to other devices about having viewed a view-once message.
   */
  view_once_open_message?: JsonViewOnceOpenMessage;
  /**
   * This can be set to indicate to other devices about a response to an incoming message request from an unknown user or group. Warning: Using the BLOCK and BLOCK_AND_DELETE options relies on other devices to do the blocking, and it does not make you leave the group!
   */
  message_request_response?: JsonMessageRequestResponseMessage;
};

export type JsonSendMessageResult = {
  address?: JsonAddress;
  success?: SendSuccess;
  networkFailure?: boolean;
  unregisteredFailure?: boolean;
  identityFailure?: string;
  proof_required_failure?: ProofRequiredError;
};

/**
 * Bans users from a group. This works even if the users aren't in the group. If they are currently in the group, they will also be removed.
 */
export type BanUserRequest = {
  /**
   * The account to interact with
   */
  account: string;
  group_id: string;
  /**
   * List of users to ban
   */
  users: JsonAddress[];
};

/**
 * Unbans users from a group.
 */
export type UnbanUserRequest = {
  /**
   * The account to interact with
   */
  account: string;
  group_id: string;
  /**
   * List of users to unban
   */
  users: JsonAddress[];
};

export type IdentityKey = {
  /**
   * the first time this identity key was seen
   */
  added?: number;
  safety_number?: string;
  /**
   * base64-encoded QR code data
   */
  qr_code_data?: string;
  /**
   * One of TRUSTED_UNVERIFIED, TRUSTED_VERIFIED or UNTRUSTED
   */
  trust_level?: string;
};

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
   * if the incoming message was sent to a v2 group, basic identifying information about that group will be here. If group information changes, JsonGroupV2Info.revision is incremented. If the group revision is higher than previously seen, a client can retrieve the group information by calling get_group.
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
  /**
   * details about the MobileCoin payment attached to the message, if present
   */
  payment?: Payment;
  /**
   * whether or not this message changes the expiresInSeconds value for the whole chat. Some messages (remote deletes, reactions, etc) will have expiresInSeconds=0 even though the chat has disappearing messages enabled.
   */
  is_expiration_update?: boolean;
  /**
   * the eraId string from a group call message update
   */
  group_call_update?: string;
  story_context?: StoryContext;
};

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

export type CallMessage = {
  offer_message?: OfferMessage;
  answer_message?: AnswerMessage;
  busy_message?: BusyMessage;
  hangup_message?: HangupMessage;
  ice_update_message?: IceUpdateMessage[];
  destination_device_id?: number;
  multi_ring?: boolean;
};

export type ReceiptMessage = {
  /**
   * options: UNKNOWN, DELIVERY, READ, VIEWED
   */
  type?: string;
  timestamps?: number[];
  when?: number;
};

export type TypingMessage = {
  action?: string;
  timestamp?: number;
  group_id?: string;
};

export type StoryMessage = {
  group?: JsonGroupV2Info;
  file?: JsonAttachment;
  text?: TextAttachment;
  allow_replies?: Boolean;
};

export type DecryptionErrorMessage = {
  timestamp?: number;
  device_id?: number;
  ratchet_key?: string;
};

/**
 * represents a file attached to a message. When sending, only `filename` is required.
 */
export type JsonAttachment = {
  contentType?: string;
  id?: string;
  size?: number;
  /**
   * when receiving, the path that file has been downloaded to
   */
  storedFilename?: string;
  /**
   * when sending, the path to the local file to upload
   */
  filename?: string;
  /**
   * the original name of the file
   */
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
 * A quote is a reply to a previous message. ID is the sent time of the message being replied to
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
 * metadata about one of the links in a message
 */
export type JsonPreview = {
  url?: string;
  title?: string;
  description?: string;
  date?: number;
  /**
   * an optional image file attached to the preview
   */
  attachment?: JsonAttachment;
};

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

/**
 * group access control settings. Options for each controlled action are: UNKNOWN, ANY, MEMBER, ADMINISTRATOR, UNSATISFIABLE and UNRECOGNIZED
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

export type GroupMember = {
  uuid?: string;
  /**
   * possible values are: UNKNOWN, DEFAULT, ADMINISTRATOR and UNRECOGNIZED
   */
  role?: string;
  joined_revision?: number;
};

export type BannedGroupMember = {
  uuid?: string;
  /**
   * Timestamp as milliseconds since Unix epoch of when the user was banned. This field is set by the server.
   */
  timestamp?: number;
};

/**
 * Represents a group change made by a user. This can also represent request link invites. Only the fields relevant to the group change performed will be set. Note that in signald, group changes are currently only received from incoming messages from a message subscription.
 */
export type GroupChange = {
  /**
   * The user that made the change.
   */
  editor?: JsonAddress;
  /**
   * The group revision that this change brings the group to.
   */
  revision?: number;
  /**
   * Represents users have been added to the group. This can be from group members adding users, or a users joining via a group link that required no approval.
   */
  new_members?: GroupMember[];
  /**
   * Represents users that have been removed from the group. This can be from admins removing users, or users choosing to leave the group
   */
  delete_members?: JsonAddress[];
  /**
   * Represents users with their new, modified role.
   */
  modify_member_roles?: GroupMember[];
  /**
   * Represents users that have rotated their profile key. Note that signald currently does not expose profile keys to clients. The joined revision property will always be 0 in this list.
   */
  modified_profile_keys?: GroupMember[];
  /**
   * Represents a user that has been invited to the group by another user.
   */
  new_pending_members?: GroupPendingMember[];
  delete_pending_members?: JsonAddress[];
  promote_pending_members?: GroupMember[];
  new_banned_members?: BannedGroupMember[];
  new_unbanned_members?: BannedGroupMember[];
  new_title?: string;
  /**
   * Whether this group change changed the avatar.
   */
  new_avatar?: Boolean;
  /**
   * New disappearing messages timer value.
   */
  new_timer?: number;
  /**
   * If not null, then this group change modified one of the access controls. Some of the properties in here will be null.
   */
  new_access_control?: GroupAccessControl;
  /**
   * Represents users that have requested to join the group via the group link. Note that members requesting to join might not necessarily have the list of users in the group, so they won't be able to send a peer-to-peer group update message to inform users of their request to join. Other users in the group may inform us that the revision has increased, but the members requesting access will have to be obtained from the server instead (which signald will handle). For now, a get_group request has to be made to get the users that have requested to join the group.
   */
  new_requesting_members?: GroupRequestingMember[];
  delete_requesting_members?: JsonAddress[];
  promote_requesting_members?: GroupMember[];
  /**
   * Whether this group change involved resetting the group invite link.
   */
  new_invite_link_password?: Boolean;
  new_description?: string;
  /**
   * Whether this change affected the announcement group setting. Possible values are UNKNOWN, ENABLED or DISABLED
   */
  new_is_announcement_group?: string;
};

export type DeviceInfo = {
  id?: number;
  name?: string;
  created?: number;
  lastSeen?: number;
};

/**
 * information about a legacy group
 */
export type JsonGroupInfo = {
  groupId?: string;
  members?: JsonAddress[];
  name?: string;
  type?: string;
  avatarId?: number;
};

export type Capabilities = {
  /**
   * this capability is deprecated and will always be true
   */
  gv2?: boolean;
  storage?: boolean;
  stories?: boolean;
  "gv1-migration"?: boolean;
  sender_key?: boolean;
  announcement_group?: boolean;
  change_number?: boolean;
};

/**
 * a Signal server
 */
export type Server = {
  /**
   * A unique identifier for the server, referenced when adding accounts. Must be a valid UUID. Will be generated if not specified when creating.
   */
  uuid?: string;
  proxy?: string;
  /**
   * base64 encoded trust store, password must be 'whisper'
   */
  ca?: string;
  service_url?: string;
  cdn_urls?: ServerCDN[];
  contact_discovery_url?: string;
  key_backup_url?: string;
  storage_url?: string;
  /**
   * base64 encoded ZKGROUP_SERVER_PUBLIC_PARAMS value
   */
  zk_param?: string;
  /**
   * base64 encoded
   */
  unidentified_sender_root?: string;
  key_backup_service_name?: string;
  /**
   * base64 encoded
   */
  key_backup_service_id?: string;
  key_backup_mrenclave?: string;
  cds_mrenclave?: string;
  /**
   * base64 encoded trust store, password must be 'whisper'
   */
  ias_ca?: string;
};

/**
 * details about a MobileCoin payment
 */
export type Payment = {
  /**
   * base64 encoded payment receipt data. This is a protobuf value which can be decoded as the Receipt object described in https://github.com/mobilecoinfoundation/mobilecoin/blob/master/api/proto/external.proto
   */
  receipt?: string;
  /**
   * note attached to the payment
   */
  note?: string;
};

/**
 * A remote config (feature flag) entry.
 */
export type RemoteConfig = {
  /**
   * The name of this remote config entry. These names may be prefixed with the platform type ("android.", "ios.", "desktop.", etc.) Typically, clients only handle the relevant configs for its platform, hardcoding the names it cares about handling and ignoring the rest.
   */
  name?: string;
  /**
   * The value for this remote config entry. Even though this is a string, it could be a boolean as a string, an integer/long value, a comma-delimited list, etc. Clients usually consume this by hardcoding the feature flagsit should track in the app and assuming that the server will send the type that the client expects. If an unexpected type occurs, it falls back to a default value.
   */
  value?: string;
};

export type GroupHistoryEntry = {
  group?: JsonGroupV2Info;
  change?: GroupChange;
};

export type PagingData = {
  has_more_pages?: boolean;
  next_page_revision?: number;
};

export type JsonViewOnceOpenMessage = {
  sender?: JsonAddress;
  timestamp?: number;
};

/**
 * Responses to message requests from unknown users or groups
 */
export type JsonMessageRequestResponseMessage = {
  person?: JsonAddress;
  groupId?: string;
  /**
   * One of UNKNOWN, ACCEPT, DELETE, BLOCK, BLOCK_AND_DELETE, UNBLOCK_AND_ACCEPT
   */
  type?: string;
};

export type SendSuccess = {
  unidentified?: boolean;
  needsSync?: boolean;
  duration?: number;
  devices?: number[];
};

export type SharedContact = {
  /**
   * the name of the shared contact
   */
  name?: SharedContactName;
  /**
   * the email addresses of the shared contact
   */
  email?: SharedContactEmail[];
  /**
   * the phone numbers of the shared contact
   */
  phone?: SharedContactPhone[];
  /**
   * the physical addresses of the shared contact
   */
  address?: SharedContactAddress[];
  /**
   * the profile picture/avatar of the shared contact
   */
  avatar?: SharedContactAvatar;
  /**
   * the organization (e.g. workplace) of the shared contact
   */
  organization?: string;
};

export type RemoteDelete = {
  target_sent_timestamp?: number;
};

export type StoryContext = {
  author?: string;
  sent_timestamp?: number;
};

export type JsonSentTranscriptMessage = {
  destination?: JsonAddress;
  timestamp?: number;
  expirationStartTimestamp?: number;
  message?: JsonDataMessage;
  story?: StoryMessage;
  unidentifiedStatus?: Map<any, any>;
  isRecipientUpdate?: boolean;
};

export type JsonBlockedListMessage = {
  addresses?: JsonAddress[];
  groupIds?: string[];
};

export type JsonReadMessage = {
  sender?: JsonAddress;
  timestamp?: number;
};

export type JsonVerifiedMessage = {
  destination?: JsonAddress;
  identityKey?: string;
  verified?: string;
  timestamp?: number;
};

export type OfferMessage = {
  id?: number;
  sdp?: string;
  type?: string;
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
  type?: string;
  legacy?: boolean;
  device_id?: number;
};

export type IceUpdateMessage = {
  id?: number;
  opaque?: string;
  sdp?: string;
};

export type TextAttachment = {
  text?: string;
  style?: string;
  preview?: JsonPreview;
  text_foreground_color?: string;
  text_background_color?: string;
  background_gradient?: Gradient;
  background_color?: string;
};

export type GroupPendingMember = {
  uuid?: string;
  /**
   * possible values are: UNKNOWN, DEFAULT, ADMINISTRATOR and UNRECOGNIZED
   */
  role?: string;
  timestamp?: number;
  added_by_uuid?: string;
};

export type GroupRequestingMember = {
  uuid?: string;
  timestamp?: number;
};

export type ServerCDN = {
  number?: number;
  url?: string;
};

export type SharedContactName = {
  /**
   * the full name that should be displayed
   */
  display?: string;
  /**
   * given name
   */
  given?: string;
  /**
   * middle name
   */
  middle?: string;
  /**
   * family name (surname)
   */
  family?: string;
  prefix?: string;
  suffix?: string;
};

export type SharedContactEmail = {
  /**
   * the type of email (options: HOME, WORK, MOBILE, CUSTOM)
   */
  type?: string;
  /**
   * the email address
   */
  value?: string;
  /**
   * the type label when type is CUSTOM
   */
  label?: string;
};

export type SharedContactPhone = {
  /**
   * the type of phone (options: HOME, WORK, MOBILE, CUSTOM)
   */
  type?: string;
  /**
   * the phone number
   */
  value?: string;
  /**
   * the type label when type is CUSTOM
   */
  label?: string;
};

export type SharedContactAddress = {
  /**
   * the type of address (options: HOME, WORK, CUSTOM)
   */
  type?: string;
  label?: string;
  street?: string;
  pobox?: string;
  neighborhood?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
};

export type SharedContactAvatar = {
  attachment?: JsonAttachment;
  is_profile?: boolean;
};

export type Gradient = {
  colors?: string[];
  angle?: number;
  positions?: number[];
  /**
   * removed from Signal protocol
   */
  start_color?: string;
  /**
   * removed from Signal protocol
   */
  end_color?: string;
};

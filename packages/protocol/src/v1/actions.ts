import { Client } from "../client";
import {
  SendRequest,
  SendResponse,
  ReactRequest,
  VersionRequest,
  JsonVersionMessage,
  AcceptInvitationRequest,
  JsonGroupV2Info,
  ApproveMembershipRequest,
  GetGroupRequest,
  GetLinkedDevicesRequest,
  LinkedDevices,
  JoinGroupRequest,
  JsonGroupJoinInfo,
  RemoveLinkedDeviceRequest,
  UpdateGroupRequest,
  GroupInfo,
  SetProfile,
  ResolveAddressRequest,
  JsonAddress,
  MarkReadRequest,
  GetProfileRequest,
  Profile,
  ListGroupsRequest,
  GroupList,
  ListContactsRequest,
  ProfileList,
  CreateGroupRequest,
  LeaveGroupRequest,
  GenerateLinkingURIRequest,
  LinkingURI,
  FinishLinkRequest,
  Account,
  AddLinkedDeviceRequest,
  RegisterRequest,
  VerifyRequest,
  GetIdentitiesRequest,
  IdentityKeyList,
  TrustRequest,
  DeleteAccountRequest,
  TypingRequest,
  ResetSessionRequest,
  RequestSyncRequest,
  ListAccountsRequest,
  AccountList,
  GroupLinkInfoRequest,
  UpdateContactRequest,
  SetExpirationRequest,
  SetDeviceNameRequest,
  GetAllIdentities,
  AllIdentityKeyList,
  SubscribeRequest,
  UnsubscribeRequest,
  RemoteDeleteRequest,
  AddServerRequest,
  GetServersRequest,
  ServerList,
  RemoveServerRequest,
  SendPaymentRequest,
  RemoteConfigRequest,
  RemoteConfigList,
  RefuseMembershipRequest,
  SubmitChallengeRequest,
  IsIdentifierRegisteredRequest,
  BooleanMessage,
  WaitForScanRequest,
  GetGroupRevisionPagesRequest,
  GroupHistoryPage,
  SendSyncMessageRequest,
  JsonSendMessageResult,
  BanUserRequest,
  UnbanUserRequest,
} from "./types";

export const send = async (client: Client, data: SendRequest) => {
  const request = {
    ...data,
    type: "send",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

/** react to a previous message */
export const react = async (client: Client, data: ReactRequest) => {
  const request = {
    ...data,
    type: "react",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

export const version = async (client: Client, data: VersionRequest) => {
  const request = {
    ...data,
    type: "version",
    version: "v1",
  };

  return client.submit<JsonVersionMessage>(request);
};

/** Accept a v2 group invitation. Note that you must have a profile name set to join groups. */
export const accept_invitation = async (
  client: Client,
  data: AcceptInvitationRequest
) => {
  const request = {
    ...data,
    type: "accept_invitation",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

/** approve a request to join a group */
export const approve_membership = async (
  client: Client,
  data: ApproveMembershipRequest
) => {
  const request = {
    ...data,
    type: "approve_membership",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

/** Query the server for the latest state of a known group. If the account is not a member of the group, an UnknownGroupError is returned. */
export const get_group = async (client: Client, data: GetGroupRequest) => {
  const request = {
    ...data,
    type: "get_group",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

/** list all linked devices on a Signal account */
export const get_linked_devices = async (
  client: Client,
  data: GetLinkedDevicesRequest
) => {
  const request = {
    ...data,
    type: "get_linked_devices",
    version: "v1",
  };

  return client.submit<LinkedDevices>(request);
};

/** Join a group using the a signal.group URL. Note that you must have a profile name set to join groups. */
export const join_group = async (client: Client, data: JoinGroupRequest) => {
  const request = {
    ...data,
    type: "join_group",
    version: "v1",
  };

  return client.submit<JsonGroupJoinInfo>(request);
};

/** Remove a linked device from the Signal account. Only allowed when the local device id is 1 */
export const remove_linked_device = async (
  client: Client,
  data: RemoveLinkedDeviceRequest
) => {
  const request = {
    ...data,
    type: "remove_linked_device",
    version: "v1",
  };

  return client.submit(request);
};

/** modify a group. Note that only one modification action may be performed at once */
export const update_group = async (
  client: Client,
  data: UpdateGroupRequest
) => {
  const request = {
    ...data,
    type: "update_group",
    version: "v1",
  };

  return client.submit<GroupInfo>(request);
};

export const set_profile = async (client: Client, data: SetProfile) => {
  const request = {
    ...data,
    type: "set_profile",
    version: "v1",
  };

  return client.submit(request);
};

/** Resolve a partial JsonAddress with only a number or UUID to one with both. Anywhere that signald accepts a JsonAddress will except a partial, this is a convenience function for client authors, mostly because signald doesn't resolve all the partials it returns. */
export const resolve_address = async (
  client: Client,
  data: ResolveAddressRequest
) => {
  const request = {
    ...data,
    type: "resolve_address",
    version: "v1",
  };

  return client.submit<JsonAddress>(request);
};

export const mark_read = async (client: Client, data: MarkReadRequest) => {
  const request = {
    ...data,
    type: "mark_read",
    version: "v1",
  };

  return client.submit(request);
};

/** Get all information available about a user */
export const get_profile = async (client: Client, data: GetProfileRequest) => {
  const request = {
    ...data,
    type: "get_profile",
    version: "v1",
  };

  return client.submit<Profile>(request);
};

export const list_groups = async (client: Client, data: ListGroupsRequest) => {
  const request = {
    ...data,
    type: "list_groups",
    version: "v1",
  };

  return client.submit<GroupList>(request);
};

export const list_contacts = async (
  client: Client,
  data: ListContactsRequest
) => {
  const request = {
    ...data,
    type: "list_contacts",
    version: "v1",
  };

  return client.submit<ProfileList>(request);
};

export const create_group = async (
  client: Client,
  data: CreateGroupRequest
) => {
  const request = {
    ...data,
    type: "create_group",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

export const leave_group = async (client: Client, data: LeaveGroupRequest) => {
  const request = {
    ...data,
    type: "leave_group",
    version: "v1",
  };

  return client.submit<GroupInfo>(request);
};

/** Generate a linking URI. Typically this is QR encoded and scanned by the primary device. Submit the returned session_id with a finish_link request. */
export const generate_linking_uri = async (
  client: Client,
  data: GenerateLinkingURIRequest
) => {
  const request = {
    ...data,
    type: "generate_linking_uri",
    version: "v1",
  };

  return client.submit<LinkingURI>(request);
};

/** After a linking URI has been requested, finish_link must be called with the session_id provided with the URI. it will return information about the new account once the linking process is completed by the other device and the new account is setup. Note that the account setup process can sometimes take some time, if rapid userfeedback is required after scanning, use wait_for_scan first, then finish setup with finish_link. */
export const finish_link = async (client: Client, data: FinishLinkRequest) => {
  const request = {
    ...data,
    type: "finish_link",
    version: "v1",
  };

  return client.submit<Account>(request);
};

/** Link a new device to a local Signal account */
export const add_device = async (
  client: Client,
  data: AddLinkedDeviceRequest
) => {
  const request = {
    ...data,
    type: "add_device",
    version: "v1",
  };

  return client.submit(request);
};

/** begin the account registration process by requesting a phone number verification code. when the code is received, submit it with a verify request */
export const register = async (client: Client, data: RegisterRequest) => {
  const request = {
    ...data,
    type: "register",
    version: "v1",
  };

  return client.submit<Account>(request);
};

/** verify an account's phone number with a code after registering, completing the account creation process */
export const verify = async (client: Client, data: VerifyRequest) => {
  const request = {
    ...data,
    type: "verify",
    version: "v1",
  };

  return client.submit<Account>(request);
};

/** Get information about a known keys for a particular address */
export const get_identities = async (
  client: Client,
  data: GetIdentitiesRequest
) => {
  const request = {
    ...data,
    type: "get_identities",
    version: "v1",
  };

  return client.submit<IdentityKeyList>(request);
};

/** Trust another user's safety number using either the QR code data or the safety number text */
export const trust = async (client: Client, data: TrustRequest) => {
  const request = {
    ...data,
    type: "trust",
    version: "v1",
  };

  return client.submit(request);
};

/** delete all account data signald has on disk, and optionally delete the account from the server as well. Note that this is not "unlink" and will delete the entire account, even from a linked device. */
export const delete_account = async (
  client: Client,
  data: DeleteAccountRequest
) => {
  const request = {
    ...data,
    type: "delete_account",
    version: "v1",
  };

  return client.submit(request);
};

/** send a typing started or stopped message */
export const typing = async (client: Client, data: TypingRequest) => {
  const request = {
    ...data,
    type: "typing",
    version: "v1",
  };

  return client.submit(request);
};

/** reset a session with a particular user */
export const reset_session = async (
  client: Client,
  data: ResetSessionRequest
) => {
  const request = {
    ...data,
    type: "reset_session",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

/** Request other devices on the account send us their group list, syncable config and contact list. */
export const request_sync = async (
  client: Client,
  data: RequestSyncRequest
) => {
  const request = {
    ...data,
    type: "request_sync",
    version: "v1",
  };

  return client.submit(request);
};

/** return all local accounts */
export const list_accounts = async (
  client: Client,
  data: ListAccountsRequest
) => {
  const request = {
    ...data,
    type: "list_accounts",
    version: "v1",
  };

  return client.submit<AccountList>(request);
};

/** Get information about a group from a signal.group link */
export const group_link_info = async (
  client: Client,
  data: GroupLinkInfoRequest
) => {
  const request = {
    ...data,
    type: "group_link_info",
    version: "v1",
  };

  return client.submit<JsonGroupJoinInfo>(request);
};

/** update information about a local contact */
export const update_contact = async (
  client: Client,
  data: UpdateContactRequest
) => {
  const request = {
    ...data,
    type: "update_contact",
    version: "v1",
  };

  return client.submit<Profile>(request);
};

/** Set the message expiration timer for a thread. Expiration must be specified in seconds, set to 0 to disable timer */
export const set_expiration = async (
  client: Client,
  data: SetExpirationRequest
) => {
  const request = {
    ...data,
    type: "set_expiration",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

/** set this device's name. This will show up on the mobile device on the same account under settings -> linked devices */
export const set_device_name = async (
  client: Client,
  data: SetDeviceNameRequest
) => {
  const request = {
    ...data,
    type: "set_device_name",
    version: "v1",
  };

  return client.submit(request);
};

/** get all known identity keys */
export const get_all_identities = async (
  client: Client,
  data: GetAllIdentities
) => {
  const request = {
    ...data,
    type: "get_all_identities",
    version: "v1",
  };

  return client.submit<AllIdentityKeyList>(request);
};

/** receive incoming messages. After making a subscribe request, incoming messages will be sent to the client encoded as ClientMessageWrapper. Send an unsubscribe request or disconnect from the socket to stop receiving messages. */
export const subscribe = async (client: Client, data: SubscribeRequest) => {
  const request = {
    ...data,
    type: "subscribe",
    version: "v1",
  };

  return client.submit(request);
};

/** See subscribe for more info */
export const unsubscribe = async (client: Client, data: UnsubscribeRequest) => {
  const request = {
    ...data,
    type: "unsubscribe",
    version: "v1",
  };

  return client.submit(request);
};

/** delete a message previously sent */
export const remote_delete = async (
  client: Client,
  data: RemoteDeleteRequest
) => {
  const request = {
    ...data,
    type: "remote_delete",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

/** add a new server to connect to. Returns the new server's UUID. */
export const add_server = async (client: Client, data: AddServerRequest) => {
  const request = {
    ...data,
    type: "add_server",
    version: "v1",
  };

  return client.submit<string>(request);
};

export const get_servers = async (client: Client, data: GetServersRequest) => {
  const request = {
    ...data,
    type: "get_servers",
    version: "v1",
  };

  return client.submit<ServerList>(request);
};

export const delete_server = async (
  client: Client,
  data: RemoveServerRequest
) => {
  const request = {
    ...data,
    type: "delete_server",
    version: "v1",
  };

  return client.submit(request);
};

/** send a mobilecoin payment */
export const send_payment = async (
  client: Client,
  data: SendPaymentRequest
) => {
  const request = {
    ...data,
    type: "send_payment",
    version: "v1",
  };

  return client.submit<SendResponse>(request);
};

/** Retrieves the remote config (feature flags) from the server. */
export const get_remote_config = async (
  client: Client,
  data: RemoteConfigRequest
) => {
  const request = {
    ...data,
    type: "get_remote_config",
    version: "v1",
  };

  return client.submit<RemoteConfigList>(request);
};

/** deny a request to join a group */
export const refuse_membership = async (
  client: Client,
  data: RefuseMembershipRequest
) => {
  const request = {
    ...data,
    type: "refuse_membership",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

export const submit_challenge = async (
  client: Client,
  data: SubmitChallengeRequest
) => {
  const request = {
    ...data,
    type: "submit_challenge",
    version: "v1",
  };

  return client.submit(request);
};

/** Determine whether an account identifier is registered on the Signal service. */
export const is_identifier_registered = async (
  client: Client,
  data: IsIdentifierRegisteredRequest
) => {
  const request = {
    ...data,
    type: "is_identifier_registered",
    version: "v1",
  };

  return client.submit<BooleanMessage>(request);
};

/** An optional part of the linking process. Intended to be called after displaying the QR code, will return quickly after the user scans the QR code. finish_link must be called after wait_for_scan returns a non-error */
export const wait_for_scan = async (
  client: Client,
  data: WaitForScanRequest
) => {
  const request = {
    ...data,
    type: "wait_for_scan",
    version: "v1",
  };

  return client.submit(request);
};

/** Query the server for group revision history. The history contains information about the changes between each revision and the user that made the change. */
export const get_group_revision_pages = async (
  client: Client,
  data: GetGroupRevisionPagesRequest
) => {
  const request = {
    ...data,
    type: "get_group_revision_pages",
    version: "v1",
  };

  return client.submit<GroupHistoryPage>(request);
};

/** Sends a sync message to the account's devices */
export const send_sync_message = async (
  client: Client,
  data: SendSyncMessageRequest
) => {
  const request = {
    ...data,
    type: "send_sync_message",
    version: "v1",
  };

  return client.submit<JsonSendMessageResult>(request);
};

/** Bans users from a group. This works even if the users aren't in the group. If they are currently in the group, they will also be removed. */
export const ban_user = async (client: Client, data: BanUserRequest) => {
  const request = {
    ...data,
    type: "ban_user",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

/** Unbans users from a group. */
export const unban_user = async (client: Client, data: UnbanUserRequest) => {
  const request = {
    ...data,
    type: "unban_user",
    version: "v1",
  };

  return client.submit<JsonGroupV2Info>(request);
};

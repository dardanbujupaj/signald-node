type BaseMessage = {
  id?: string;
  type: string;
};

export type Request = {
  version: string;
} & BaseMessage;

export type DataMessage<T> = {
  data: T;
} & BaseMessage;

export type ErrorMessage = {
  error_type: string;
  error: any;
} & BaseMessage;

export type Message<T = unknown> = DataMessage<T> | ErrorMessage;

export function isErrorMessage(message: Message): message is ErrorMessage {
  return (message as ErrorMessage).error_type !== undefined;
}

export function isDataMessage<T>(message: Message): message is DataMessage<T> {
  return (message as DataMessage<T>).data !== undefined;
}

export type Client = {
  submit: <TResponse = {}>(request: Request) => Promise<TResponse>;
};

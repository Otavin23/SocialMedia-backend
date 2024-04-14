class MessageContent {
  MessageSentID: string;
  UserID: string;
  type: 'send' | 'receive';
  MessageID: string;
  DateSent: string;
  DeletedStatusID: string;
}
export { MessageContent };

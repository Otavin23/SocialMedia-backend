import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
// import { MessageSend } from './messageSent';
// import { MessageReceive } from './messageReceived';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';
// import { MessageContent } from './messageContent';

@Entity('chat')
class Chat {
  @PrimaryColumn({ default: uuid4() })
  MessageId?: string;

  @ManyToOne(() => User, (user) => user.messagesChat, { cascade: true })
  FromId: User;

  @Column({ type: 'jsonb', default: {} })
  chatOnlyUser: {
    id: string;
    name: string;
    avatar: string;
  };

  @Column({ type: 'jsonb', default: [] })
  content: any[];

  @Column({ nullable: true })
  DateRead: boolean;

  constructor() {
    if (!this.MessageId) {
      this.MessageId = uuid4();
    }
  }
}

export { Chat };

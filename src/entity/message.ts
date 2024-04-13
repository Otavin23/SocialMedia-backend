import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
// import { MessageSend } from './messageSent';
// import { MessageReceive } from './messageReceived';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';

@Entity('chat')
export class Chat {
  @PrimaryColumn({ default: uuid4() })
  MessageId?: string;

  @ManyToOne(() => User, (user) => user.chat)
  FromId: User;

  @Column({ type: 'jsonb', default: [] })
  DataReceived: any[];

  @Column({ type: 'jsonb', default: [] })
  DataSend: any[];

  @Column({ nullable: true })
  DateRead: boolean;

  constructor() {
    if (!this.MessageId) {
      this.MessageId = uuid4();
    }
  }
}

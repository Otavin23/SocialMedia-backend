import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';

@Entity('notification')
class NotificationEntity {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column({ nullable: true })
  publication: string;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  read?: boolean;

  @Column({ nullable: true })
  imagePublication: string;

  @Column({ type: 'jsonb', default: [] })
  users: {
    id: string;
    avatar: string;
    name: string;
  };

  @Column({ nullable: true })
  enumType: number;

  @ManyToOne(() => User, (user) => user.notification, { cascade: true })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id && !this.read) {
      this.id = uuid4();
      this.read = false;
    }
  }
}
export { NotificationEntity };

import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';

@Entity('notification')
class NotificationEntity {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  read?: boolean;

  @ManyToOne(() => User, (user) => user.notification, { cascade: true })
  user: User;

  constructor() {
    if (!this.id && !this.read) {
      this.id = uuid4();
      this.read = false;
    }
  }
}
export { NotificationEntity };

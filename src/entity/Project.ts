import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { User } from './User';

@Entity('projects')
class Projects {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  comments?: Comment[];

  @Column({ nullable: true })
  like?: string;

  @Column({ nullable: true })
  heart?: string;

  @Column({ nullable: true })
  media?: string;

  @ManyToOne(() => User, (user) => user.projects, { cascade: true })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id && !this.like && this.heart && this.media) {
      this.id = uuid4();
      this.like = '0';
      this.heart = '0';
      this.media = 'hello';
    }
  }
}

export { Projects };

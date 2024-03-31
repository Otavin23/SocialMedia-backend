import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid4 } from 'uuid';
import { User } from './User';

@Entity('projects')
class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  comments?: any[];

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
    if (this.like && this.heart && this.media) {
      this.like = '0';
      this.heart = '0';
      this.media = 'hello';
    }
  }
}

export { Projects };

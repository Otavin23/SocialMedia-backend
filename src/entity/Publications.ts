import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';
import { Comments } from './Comments';

@Entity('publication')
class Publications {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column()
  description: string;

  @ManyToMany(() => Comments)
  @JoinTable()
  comments?: Comments[];

  @Column()
  like: number;

  @Column()
  heart: number;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.publication, { cascade: true })
  user: User;

  @CreateDateColumn()
  craeted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}

export { Publications };

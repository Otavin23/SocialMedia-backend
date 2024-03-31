import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { v4 as uuid4 } from 'uuid';

@Entity('publication')
class Publications {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb', default: [] })
  comments: any[];

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

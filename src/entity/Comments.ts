import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity('comments')
class Comments {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  user: {
    avatar: string;
    name: string;
    id: string;
  };

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}

export { Comments };

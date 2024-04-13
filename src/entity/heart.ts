import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity('Hearts')
class IHeart {
  @PrimaryColumn({ default: uuid4() })
  id?: string;

  @Column({ type: 'jsonb', default: [] })
  user: {
    id: string;
    avatar: string;
    name: string;
    description: string;
  };

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}

export { IHeart };

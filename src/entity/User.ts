import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity('user')
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  avatar?: string;

  @Column()
  description?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'jsonb', default: [] })
  followers: [];

  @Column({ type: 'jsonb', default: [] })
  following: [];

  constructor() {
    if (!this.id && !this.avatar && !this.description) {
      this.id = uuid4();
      this.description = 'Descricao padrao';
      this.avatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHx93tNlXiGe201XM6AdAuQxZLiTMoVLSND48Q6_g2jDGRm1mc-F9h_-s_ug-dmt39bhY&usqp=CAU';
    }
  }
}

export { User };

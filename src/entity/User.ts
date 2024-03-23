import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { IProjects } from './@types/projects';
import { IPublication } from './@types/publication';
import { IExperience } from './@types/experience';
// import { IInvitations } from './@types/invitations';

@Entity('user')
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  avatar?: string;

  @Column()
  background?: string;

  @Column()
  description?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  country?: string;

  @Column()
  subTitle?: string;

  @Column()
  city?: string;

  @Column()
  password: string;

  @Column({ type: 'jsonb', default: [] })
  projects: IProjects[];

  @Column({ type: 'jsonb', default: [] })
  followers: any[];

  @Column({ type: 'jsonb', default: [] })
  invitations: any[];

  @Column({ type: 'jsonb', default: [] })
  publication: IPublication[];

  @Column({ type: 'jsonb', default: [] })
  experiences: IExperience[];

  @Column({ type: 'jsonb', default: [] })
  following: [];

  craeted_at: Date;

  constructor() {
    if (!this.id && !this.avatar && !this.description) {
      this.id = uuid4();
      this.description =
        'Olá! Bem-vindo(a) ao meu perfil. Aqui você encontrará informações sobre mim e minhas interesses. Sinta-se à vontade para explorar e conhecer um pouco mais sobre quem eu sou e o que me motiva. Se tiver alguma dúvida ou quiser iniciar uma conversa, não hesite em me contatar. Estou sempre aberto(a) a novas conexões e experiências. Obrigado(a) por visitar meu perfil!';
      this.avatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHx93tNlXiGe201XM6AdAuQxZLiTMoVLSND48Q6_g2jDGRm1mc-F9h_-s_ug-dmt39bhY&usqp=CAU';
      this.background =
        'https://img.freepik.com/fotos-premium/uma-garota-japonesa-do-ensino-medio-primavera-alegre-perfil-seu-perfil-virado-de-lado_921410-20474.jpg';
      this.city = '';
      this.country = '';
      this.subTitle = '';
    }
  }
}

export { User };

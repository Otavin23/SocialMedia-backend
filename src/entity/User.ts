import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { IExperience } from './@types/experience';
import { Projects } from './Project';
import { Publications } from './Publications';
import { NotificationEntity } from './notification';

@Entity('user')
class User {
  @PrimaryColumn({ default: '' })
  id?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  background?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  subTitle?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notification: NotificationEntity[];

  @OneToMany(() => Projects, (project) => project.user)
  projects: Projects[];

  @Column({ type: 'jsonb', default: [] })
  followers: any[];

  @Column({ type: 'jsonb', default: [] })
  invitations: any[];

  @OneToMany(() => Publications, (publication) => publication.user)
  publication: Publications[];

  @Column({ type: 'jsonb', default: [] })
  experiences: IExperience[];

  @Column({ type: 'jsonb', default: [] })
  following: [];

  craeted_at: Date;

  userFind: Projects;

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

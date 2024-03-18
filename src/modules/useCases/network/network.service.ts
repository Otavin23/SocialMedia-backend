import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/User';
import { AppDataSource } from 'src/database/data-source';

@Injectable()
class NetworkService {
  private bd_user = AppDataSource.getRepository(User);

  async networkInvite(user__id: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    const secondaryUser = await this.bd_user.findOneBy({ id: user__id });

    secondaryUser.invitations.push(user);

    await this.bd_user.save(secondaryUser);

    return secondaryUser.invitations;
  }

  async NetworkListInvites(id: string) {
    const user = await this.bd_user.findOneBy({ id });

    return user.invitations;
  }

  async inviteAccept(user__id: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });
    const secondaryUser = await this.bd_user.findOneBy({ id: user__id });

    user.followers.push(secondaryUser);
    user.invitations.splice(user.invitations.indexOf(secondaryUser), 1);

    await this.bd_user.save(user);

    return user;
  }

  async declineAccept(user__id: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    const inviteRemove = user.invitations.find(
      (invitation) => invitation.id === user__id,
    );

    user.invitations.splice(user.invitations.indexOf(inviteRemove), 1);

    await this.bd_user.save(user);

    return user;
  }
}

export { NetworkService };

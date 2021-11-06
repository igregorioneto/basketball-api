import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamInput } from './dto/team.input';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findAllTeams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async findTeamMatch(ids: string[]): Promise<Team[]> {
    return await this.teamRepository.findByIds(ids);
  }

  async findTeam(id: string): Promise<Team> {
    return await this.teamRepository.findOne({ where: { teamId: id } });
  }

  async createTeam(data: TeamInput): Promise<Team> {
    const team = await this.teamRepository.create(data);
    const teamSave = await this.teamRepository.save(team);

    if (!teamSave) {
      throw new InternalServerErrorException('Problem creating a team');
    }

    return teamSave;
  }

  async updateTeam(data: Team): Promise<Team> {
    return await this.teamRepository.save(data);
  }

  async deleteTeam(id: string): Promise<boolean> {
    const team = await this.teamRepository.delete({ teamId: id });
    if (!team) {
      return false;
    }

    return true;
  }
}

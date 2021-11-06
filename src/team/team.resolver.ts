import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { TeamInput } from './dto/team.input';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Resolver('Team')
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @Query(() => Team)
  async findTeam(@Args('id') id: string): Promise<Team> {
    return await this.teamService.findTeam(id);
  }

  @Query(() => [Team])
  async findAllTeams(): Promise<Team[]> {
    return await this.teamService.findAllTeams();
  }

  @Mutation(() => Team)
  async createTeam(@Args('data') data: TeamInput): Promise<Team> {
    return await this.teamService.createTeam(data);
  }

  @Mutation(() => Team)
  async updateTeam(
    @Args('id') id: string,
    @Args('data') data: TeamInput,
  ): Promise<Team> {
    const team = await this.teamService.findTeam(id);
    team.name = data.name;

    return await this.teamService.updateTeam(team);
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Args('id') id: string): Promise<boolean> {
    return await this.teamService.deleteTeam(id);
  }
}

import { TeamService } from './../team/team.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MatchInput } from './dto/match.input';
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { SelectQueryBuilder } from 'typeorm';

@Resolver()
export class MatchResolver {
  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
  ) {}

  @Query(() => Match)
  async findMatch(@Args('matchId') matchId: string): Promise<Match> {
    return await this.matchService.findMatchById(matchId);
  }

  @Query(() => [Match])
  async findAllMatchs(): Promise<Match[]> {
    return await this.matchService.findAllMatchs();
  }

  @Query(() => [Match])
  async averagePointsLastMatchesTeam(): Promise<Match[]> {
    const result = await this.matchService.findAllMatchsParam();
    console.log(result);
    return result;
  }

  @Mutation(() => Match)
  async createMatch(
    @Args('homeId') homeId: string,
    @Args('visitorId') visitorId: string,
    @Args('data') data: MatchInput,
  ): Promise<Match> {
    if (homeId !== visitorId) {
      const match = new Match();
      match.matchPoints = data.matchPoints;
      match.dateMatch = data.dateMatch;
      match.teamsConnection = Promise.resolve(
        await this.teamService.findTeamMatch([homeId, visitorId]),
      );
      return await this.matchService.createMatch(match);
    } else {
      throw new Error('The ids cannot be the same!');
    }
  }

  @Mutation(() => Match)
  async updateMatch(
    @Args('matchId') matchId: string,
    @Args('data') data: MatchInput,
  ): Promise<Match> {
    const match = await this.matchService.findMatchById(matchId);
    match.matchPoints = data.matchPoints;
    match.dateMatch = data.dateMatch;
    return await this.matchService.updateMatch(match);
  }

  @Mutation(() => Boolean)
  async deleteMatch(@Args('matchId') matchId: string): Promise<boolean> {
    return await this.matchService.deleteMatch(matchId);
  }
}

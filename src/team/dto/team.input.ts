import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TeamInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @Field()
  name: string;
}

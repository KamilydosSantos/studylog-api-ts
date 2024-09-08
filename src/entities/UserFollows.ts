import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity('user-follows')
export class UserFollows {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User)
  @JoinColumn({name: 'followerId'})
  follower!: User;

  @ManyToOne(type => User)
  @JoinColumn({name: 'followingId'})
  following!: User;
}
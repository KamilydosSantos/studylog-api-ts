import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { UserFollows } from "./UserFollows";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  coverPicture?: string;

  @OneToMany(() => UserFollows, (userFollows) => userFollows.follower)
  @JoinColumn({ name: "id", referencedColumnName: "followerId" })
  follower?: UserFollows[];

  @OneToMany(() => UserFollows, (userFollows) => userFollows.following)
  @JoinColumn({ name: "id", referencedColumnName: "followingId" })
  following?: UserFollows[];
}
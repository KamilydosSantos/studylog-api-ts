import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
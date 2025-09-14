import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsString, MinLength } from "class-validator";
import { Expense } from "src/expense/expense.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @OneToMany(() => Expense, (expense) => expense.user)
  //   expenses: Expense[];
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

// Response DTO
export class ResponseUserDto {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class UpdateUserDto {
  @IsEmail()
  email?: string;
  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}

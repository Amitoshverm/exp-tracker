import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsString, MinLength } from "class-validator";

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

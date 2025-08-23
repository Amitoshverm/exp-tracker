import { Module } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";
import { Expense } from "./expense.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
  exports: [ExpenseService],
})
export class ExpenseModule {}

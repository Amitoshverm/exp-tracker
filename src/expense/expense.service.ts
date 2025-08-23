import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateExpenseDto, Expense, UpdateExpenseDto } from "./expense.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepo.create(createExpenseDto);
    return this.expenseRepo.save(expense);
  }
  async findAllExpenses() {
    return this.expenseRepo.find();
  }

  async findExpenseById(id: number) {
    return this.expenseRepo.findOne({ where: { id: id } });
  }

  async updateExpense(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = this.expenseRepo.findOne({ where: { id: id } });
    if (!expense) {
      throw new NotFoundException("Expense not found");
    }
    const updatedExpense = { ...updateExpenseDto, updatedAt: new Date() };
    await this.expenseRepo.update(id, updatedExpense);
    return this.expenseRepo.findOne({ where: { id: id } });
  }

  async deleteExpense(id: number) {
    const expense = this.expenseRepo.findOne({ where: { id: id } });
    if (!expense) {
      throw new NotFoundException("Expense not found");
    }
    await this.expenseRepo.delete(id);
    return {
      message: "Expense deleted successfully",
    };
  }
}

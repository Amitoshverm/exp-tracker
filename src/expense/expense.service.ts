import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateExpenseDto, Expense, UpdateExpenseDto } from "./expense.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>
  ) {}

  // create expense
  async createExpense(createExpenseDto: CreateExpenseDto, userId: number) {
    const expenseData = { ...createExpenseDto, userId };
    const expense = this.expenseRepo.create(expenseData);
    return this.expenseRepo.save(expense);
  }
  // delete expense
  async deleteExpense(id: number, userId: number) {
    const expense = await this.expenseRepo.findOne({ where: { id, userId } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    this.expenseRepo.delete(id);
    return { message: `Expense with ID ${id} deleted successfully` };
  }
  // update expense
  async updateExpense(
    userId: number,
    id: number,
    updateExpenseDto: UpdateExpenseDto
  ) {
    const expense = await this.expenseRepo.findOne({ where: { id, userId } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    await this.expenseRepo.update(id, updateExpenseDto);
    return this.expenseRepo.findOne({ where: { id, userId } });
  }
  // get all expenses
  async findAllExpenses(userId: number) {
    return this.expenseRepo.find({ where: { userId } });
  }
  // get by id
  async findExpenseById(id: number, userId: number) {
    const expense = await this.expenseRepo.findOne({ where: { id, userId } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }
}

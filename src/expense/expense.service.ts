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
  async createExpense(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepo.create(createExpenseDto);
    return this.expenseRepo.save(expense);
  }
  // delete expense
  async deleteExpense(id: number) {
    const expense = await this.expenseRepo.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    this.expenseRepo.delete(id);
    return { message: `Expense with ID ${id} deleted successfully` };
  }
  // update expense
  async updateExpense(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepo.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    await this.expenseRepo.update(id, updateExpenseDto);
    return this.expenseRepo.findOne({ where: { id } });
  }
  // get all expenses
  async findAllExpenses() {
    return this.expenseRepo.find();
  }
  // get by id
  async findExpenseById(id: number) {
    const expense = await this.expenseRepo.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }
}

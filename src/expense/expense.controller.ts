import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto, UpdateExpenseDto } from "./expense.entity";

@Controller("expense")
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllExpenses() {
    return this.expenseService.findAllExpenses();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getExpenseById(@Param("id") id: number) {
    return this.expenseService.findExpenseById(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async updateExpense(
    @Param("id") id: number,
    @Body() updateExpenseDto: UpdateExpenseDto
  ) {
    return this.expenseService.updateExpense(id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deleteExpense(@Param("id") id: number) {
    return this.expenseService.deleteExpense(id);
  }
}

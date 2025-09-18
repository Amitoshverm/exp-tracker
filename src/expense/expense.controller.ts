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
  Request,
  UseGuards,
} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto, UpdateExpenseDto } from "./expense.entity";
import { JwtAuthGuard } from "src/auth/jwt-guard.gurad";

@Controller("expense")
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createExpense(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    return this.expenseService.createExpense(createExpenseDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllExpenses(@Request() req: any) {
    const userId = req.user.userId;
    return this.expenseService.findAllExpenses(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getExpenseById(@Param("id") id: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.expenseService.findExpenseById(id, userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async updateExpense(
    @Param("id") id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    return this.expenseService.updateExpense(userId, id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deleteExpense(@Param("id") id: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.expenseService.deleteExpense(id, userId);
  }
}

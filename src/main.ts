import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import * as nodeCrypto from "crypto";

// (global as any).crypto = nodeCrypto;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

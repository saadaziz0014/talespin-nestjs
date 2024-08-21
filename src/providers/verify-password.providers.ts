import { Connection } from "mongoose";
import { verifyPasswordSchema } from "src/schemas/verify-password.schema";

export const verifyPasswordProviders = [
    {
        provide: "VERIFY_PASSWORD_MODEL",
        useFactory: (connection: Connection) => connection.model("VerifyPassword", verifyPasswordSchema),
        inject: ["DATABASE_CONNECTION"]
    }
]
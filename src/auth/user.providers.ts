import { userSchema } from "src/schemas/user.schema";
import { Connection } from "mongoose";

export const userProviders = [
    {
        provide: "USER_MODEL",
        useFactory: (connection: Connection) => connection.model("User", userSchema),
        inject: ["DATABASE_CONNECTION"]
    }
]
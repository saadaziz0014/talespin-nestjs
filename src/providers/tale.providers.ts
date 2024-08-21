import { Connection } from "mongoose";
import { taleSchema } from "src/schemas/tale.schema";

export const taleProviders = [
    {
        provide: "TALE_MODEL",
        useFactory: (connection: Connection) => connection.model("Tale", taleSchema),
        inject: ["DATABASE_CONNECTION"]
    }
]
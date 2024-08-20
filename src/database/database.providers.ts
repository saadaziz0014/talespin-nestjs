import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: (): Promise<typeof mongoose> => {
            return mongoose.connect("mongodb://localhost:27017/talespin-nest");
        }
    }
]
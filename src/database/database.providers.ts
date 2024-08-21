import * as mongoose from 'mongoose';
import { constants } from 'src/constants';

export const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: (): Promise<typeof mongoose> => {
            return mongoose.connect(constants.mongo_uri);
        }
    }
]
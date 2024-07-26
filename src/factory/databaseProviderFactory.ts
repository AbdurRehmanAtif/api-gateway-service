import MongoDBProvider from "../Providers/MongoDBProvider";

// Define an enum for database types
enum DatabaseType {
    MongoDB = 'mongoes',
    SQL = 'sql'
}
class DatabaseProviderFactory {

    createDatabaseProviders(databaseTypes: DatabaseType[]) {

        for (const databaseType of databaseTypes) {
            switch (databaseType) {
                case DatabaseType.MongoDB:
                    // Create MongoDB database provider instance
                    new MongoDBProvider()
                    break;
                case DatabaseType.SQL:
                    // Create SQL database provider instance
                    
                    break;
                default:
                    throw new Error(`Unsupported database type: ${databaseType}`);
            }
        }
    }
}

export { DatabaseType, DatabaseProviderFactory }
``

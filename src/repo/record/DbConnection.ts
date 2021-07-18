import { Connection, createConnection } from "mongoose";

export class DbConnection implements IDbConnection<Connection> {
    connect(connectionString: string): Connection {
        return createConnection(connectionString);
    }

    end(cnn: Connection) {
        cnn.close();
    }
}

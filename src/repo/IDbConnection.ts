interface IDbConnection<T> {
    connect(connectionString: string): T;
    end(cnn: T): void;
}

import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ng"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: host,
            database: defaultOptions.database,
        })
    );
};

import { PoolClient } from 'pg';
declare class Database {
    private pool;
    private client;
    constructor();
    private connection;
    get clientInstance(): PoolClient | undefined;
}
export declare const database: Database;
export {};
//# sourceMappingURL=db.d.ts.map
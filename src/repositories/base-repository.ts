import database from './database';
import RepositoryInterface from '../interfaces/repository';

class BaseRepository<T extends Record<string, any>> implements RepositoryInterface<T> { //porque fazer isso?
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    create(item: T, callback: (id?: number) => void): void {
        const keys = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        const params = Object.values(item);
        database.run(sql, params, function(_err) {
            callback(this?.lastID);
        });
    }

    readAll(callback: (items: T[]) => void): void {
        const sql = `SELECT * FROM ${this.tableName}`;
        const params: any[] = [];
        database.all(sql, params, (_err, rows) => {
            const items = rows as T[];
            callback(items);
        });
    }

    read(id: number, callback: (item?: T) => void): void {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const params = [id];
        database.get(sql, params, (_err, row) => {
            const item = row as T | undefined;
            callback(item);
        });
    }

    update(id: number, item: T, callback: (notFound: boolean) => void): void {
        const keys = Object.keys(item).map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${keys} WHERE id = ?`;
        const params = [...Object.values(item), id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        });
    }


    delete(id: number, callback: (notFound: boolean) => void): void {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const params = [id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        });
    }
}

export default BaseRepository;

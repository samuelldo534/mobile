<<<<<<< Updated upstream
import { SQLiteDatabase } from "expo-sqlite";

export async function initDb(database : SQLiteDatabase){
        await database.execAsync(`
            
            CREATE TABLE IF NOT EXISTS tama(
            
            nome TEXT,
            imagem TEXT,
            fome INTEGER,
            sono INTEGER,
            status TEXT,
            diversao INTEGER
            
            );
            
            
            
            `)
=======
export async function initDb(database: any){
    await database.execAsync(`
        
        CREATE TABLE IF NOT EXISTS tama(
        nome TEXT NOT NULL ,
        fome INTEGER,
        sono INTEGER,
        diversao INTEGER,
        status TEXT NOT NULL
        imagem BLOB
        
        )
        
        
        `)
>>>>>>> Stashed changes
}
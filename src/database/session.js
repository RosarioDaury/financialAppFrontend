import * as SqLite from 'expo-sqlite';
import JWT from 'expo-jwt';
import {SECRET_KEY} from '@env';

export default class SessionsDB {
    constructor() {
        this.connection = SqLite.openDatabase('easyWallet.db');
        this.createTable();
    }

    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS SESSIONS(
                id INTEGER PRIMARY KEY,
                token TEXT NOT NULL
            );`;
    
            await this.connection.transaction((tx) => {
                tx.executeSql(query);
            })
        } catch(error) {
            console.log('[ERROR]', error);
            throw Error('[ERROR] SETTING DATA BASE');
        }
    }


    async saveSession({id, token}) {

        try{
            const insertQuery =
            `INSERT INTO SESSIONS (id, token) values (${id}, "${token}")`
            
            return this.connection.transaction(tx => {
                tx.executeSql(insertQuery);
            })
        } catch(error) {
            console.log('[ERROR]', error);
            throw Error('[ERROR] SAVING SESSION DATA BASE');
        }
    }

    async getSession({setUser, setIsAuth}) {
        try {
            this.connection.transaction(tx =>{
                tx.executeSql(`SELECT * FROM SESSIONS`, [], (transaction, resultSet) => {
                    if(resultSet.rows._array.length > 0){
                        const user = JWT.decode(resultSet.rows._array[0].token, SECRET_KEY);
                        setUser({...user, token: resultSet.rows._array[0].token});
                        setIsAuth(true);
                    } else {
                        setUser({});
                        setIsAuth(false);
                    }
                });
            })

        } catch(error) {
            console.log('[ERROR]', error);
            throw Error('[ERROR] GET SESSION DATA BASE');
        }
    }

    async updateSession() {

    }


    async deleteSession() {

    }
}


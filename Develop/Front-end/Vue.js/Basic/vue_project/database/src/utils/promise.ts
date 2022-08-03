import {DB} from './type';

export const runPromise = (db:DB, query:string) => new Promise((resolve:(arg0: DB)=>void, reject) => {
    db.run(query, (err:Error) => {
        if(!err) resolve(db);
        else reject(err);
    })
});

export const getPromise = (db:DB, query:string) => new Promise<{db:DB, data:any}>(
    (resolve, reject) => {
        db.get(query, (err:Error, row:any) => {
            if(!err) resolve({db:db, data:row});
            else reject(err);
        });
    }
);

export const allPromise = (db:DB, query:string) => new Promise<{db:DB, data:any[]}>(
    (resolve, reject) => {
        db.all(query, (err:Error, row:any) => {
            if(!err) resolve({db:db, data:row});
            else reject(err);
        });
    }
);
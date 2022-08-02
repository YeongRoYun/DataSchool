import {DB, RSP_RESULT} from './type';


const getPromise = (db:DB, query:string) => new Promise<{db:DB, data:any}>(
    (resolve, reject) => {
        db.get(query, (err:Error, row:any) => {
            if(!err) resolve({db:db, data:row});
            else reject(err);
        });
    }
);

const allPromise = (db:DB, query:string) => new Promise<{db:DB, data:any[]}>(
    (resolve, reject) => {
        db.all(query, (err:Error, row:any) => {
            if(!err) resolve({db:db, data:row});
            else reject(err);
        });
    }
);

export default function setup(app:any, db:DB) {
    const result:RSP_RESULT = {rsp: "fail"};

    app.get('/', (req:any, res:any, next:any) => {
        result.rsp = "ok";
        res.json(result);
    });

    app.get('/db/about-me', (req:any, res:any, next:any) => {
        const rsp: RSP_RESULT = {rsp:"fail"};
        let query = 'SELECT * FROM tbl_about_myself';
        getPromise(db, query)
            .then(({db, data}) => {
                rsp.data = data;
                query = 'SELECT * FROM tbl_my_resume';
                return allPromise(db, query);
            })
            .then(({db, data}) => {
                rsp.rsp = 'ok';
                rsp.data.resume = data;
                res.json(rsp);
            })
            .catch(err => {
                console.log(err);
                res.error = err.message;
                res.json(rsp);
            })
    });

    app.get('/db/applications', (req:any, res:any, next:any) => {
        let result:RSP_RESULT = {rsp:"fail"};
        let query = 'SELECT * FROM tbl_applications ORDER BY date desc';
        allPromise(db, query)
            .then(({db, data}) => {
                result.rsp = "ok";
                result.data = data;
                res.json(result);
            })
            .catch((err:Error) => {
                console.log(err);
                result.error = err.message;
                res.json(result);
            });
    });
    app.get('/db/notification/:id', (req:any, res:any, next:any) => {
        let result:RSP_RESULT = { rsp: "fail"};
        let query = `SELECT * FROM tbl_notification WHERE expiration > date('now') AND id > ${req.params.id} ORDER BY id desc`;
        getPromise(db, query)
            .then(({db, data}) => {
                result.rsp = data? "ok" : "fail";
                result.data = data;
                res.json(result);
            })
            .catch((err:Error) => {
                console.log(err);
                result.error = err.message;
                res.json(result);
            });
    });
};
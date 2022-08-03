import {DB, RSP_RESULT} from './type';
import { getPromise, allPromise } from './promise';

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
    app.get('/db/blog', (req:any, res:any, next:any) => {
        let result:RSP_RESULT = {rsp: "fail"};
        let query = `SELECT * FROM tbl_blog order by id desc`;
        allPromise(db, query)
            .then(({db, data}) => {
                result.rsp = "ok";
                result.data = data;
            })
            .catch((err:Error) => {
                console.log(err);
                result.error = err.message;
            })
            .finally(() => res.json(result));
    });
};
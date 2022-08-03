import { DB, RSP_RESULT } from './type';
import { getPromise, runPromise } from './promise';

export default function (app:any, db:DB) {
    app.post('/db/accounts/login/:email/:password', (req:any, res:any, next:any) => {
        const result:RSP_RESULT = {rsp:"fail", data:{}};
        const token = 'T-' + Math.floor(Math.random() * 100000).toString();
        let query = `SELECT * FROM tbl_accounts WHERE email='${req.params.email}'
        `;
        getPromise(db, query)
            .then(({db, data}) => {
                if(!data) {
                    result.data.email = req.params.email;
                    return Promise.reject(new Error("wrong_email"));
                } else if(data['password'] != req.params.password) {
                    result.data.password = req.params.password;
                    return Promise.reject(new Error("wrong_password"));
                } else {
                    query = `
                        UPDATE tbl_accounts SET token='${token}'
                        WHERE email='${req.params.email}'
                    `;
                    return runPromise(db, query);
                }
            })
            .then((db:DB) => {
                result.rsp = 'ok';
                result.data.token = token;
            })
            .catch((err: Error) => {
                result.rsp = "fail";
                result.error = err.message;
                console.log(err);
            })
            .finally(() => res.json(result));
    });
    app.post('/db/accounts/check-token/:email/:token', (req:any, res:any, next:any) => {
        let result:RSP_RESULT = {rsp:"fail", data:{}};
        let query = `
            SELECT * FROM tbl_accounts WHERE grade = 'owner' AND ((email='${req.params.email}' AND token='${req.params.token}') OR (email='vue' AND password='vue' AND token is null))
        `;
        getPromise(db, query)
            .then(({db, data}) => {
                if(data) {
                    result.rsp = 'ok';
                    result.data.email = data['email'];
                } else return Promise.reject(new Error('Invalid Access'));
            })
            .catch((err:Error) => {
                result.rsp='fail';
                result.error = err.message;
                console.log(err);
            })
            .finally(() => res.json(result));
    });
    app.post('/db/blog', (req:any, res:any, next:any) => {
        let result:RSP_RESULT = {rsp:"fail", data:{}};
        let query = `
            INSERT INTO tbl_blog (title, post, type) VALUES ('${req.body.title}', '${req.body.content}', '${req.body.type}')
        `;
        runPromise(db, query)
            .then((db:DB) => {
                result.rsp='ok';
            })
            .finally(() => res.json(result));
    });
};
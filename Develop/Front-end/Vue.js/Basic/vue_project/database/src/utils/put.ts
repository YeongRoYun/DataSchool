import {DB, RSP_RESULT} from './type';
import { runPromise, getPromise } from './promise';

export default function (app:any, db:DB) {
    app.put('/db/accounts/:email/:oldpassword/:password', (req:any, res:any, next:any) => {
        const result:RSP_RESULT = {rsp:"fail", data:{}};
        let query = `
            SELECT * FROM tbl_accounts WHERE (email='${req.params.email}' OR email='vue') AND grade='owner'
        `;
        getPromise(db, query)
            .then(({db, data}) => {
                if(data['password'] != req.params.oldpassword) {
                    result.data.temp = data;
                    return Promise.reject(new Error("wrong_password"));
                } else {
                    query = `
                        UPDATE tbl_accounts 
                        SET email='${req.params.email}', password='${req.params.password}' 
                        WHERE (email='${req.params.email}' OR email='vue') AND (grade='owner' AND password='${req.params.oldpassword}')
                    `;
                    return runPromise(db, query);
                }
            })
            .then((db:DB) => {
                result.rsp = 'ok';
                result.data.temp = `Prv: [${req.params.email}, ${req.params.oldpassword}], Cur: [${req.params.email}, ${req.params.password}]`;
            })
            .catch((err:Error) => {
                console.log(err);
                result.rsp = "fail";
                result.error = err.message;
            })
            .finally(() => res.json(result));
    });
};
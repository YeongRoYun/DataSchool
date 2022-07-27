export default function setup(app:any, db:any) {
    app.get('/', (req:any, res:any, next:any) => {
        res.json({rsp:'ok'});
    });
    app.get('/db/about-me', (req:any, res:any, next:any) => {
        const result:{rsp:"ok"|"fail", data:{resume:[]}} = {
            rsp: 'fail',
            data: {resume:[]}
        };
        db.get('SELECT * FROM tbl_about_myself', (err:Error, row:any) => {
            if(!err) {
                result.data = row;
                db.all('SELECT * FROM tbl_my_resume ORDER BY date desc', (err2:Error, rows:any) => {
                    if(!err2) {
                        result.rsp = 'ok';
                        result.data.resume = rows;
                        res.json(result);
                    } else {
                        res.json(result);
                    }
                })
            } else {
                console.log(err);
                res.json(result);
            }
        });
    });
    app.get('/db/applications', (req:any, res:any, next:any) => {
        let result:{rsp: string, data: []} = {
            rsp: "fail",
            data: [],
        };
        db.all('SELECT * FROM tbl_applications ORDER BY date desc', (err:Error, rows:[]) => {
            if(!err) {
                result.rsp = 'ok';
                result.data = rows;
                res.json(result);
            } else {
                res.json(result);
            }
        });
    });
};
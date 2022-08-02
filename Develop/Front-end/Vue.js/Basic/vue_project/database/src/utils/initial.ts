import TYPE from './type';
import { DB, Application } from './type'

const runPromise = (db:DB, query:string) => new Promise((resolve:(arg0: DB)=>void, reject) => {
    db.run(query, (err:Error) => {
        if(!err) resolve(db);
        else reject(err);
    })
});

function fn_about_me(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_about_myself (name TEXT, email TEXT, UNIQUE(name, email))
    `;
    runPromise(db, query)
        .then((db:DB) => {
            query = `
            INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('DOPT', 'armigar@naver.com')
            `;
            return runPromise(db, query);
        })
        .catch((err:Error) => console.log(err));
};

function fn_resume(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, url TEXT ,UNIQUE(date, title))
    `;
    runPromise(db, query)
        .then((db:DB) => {
            const resume:{date:string, title:string, content:string, URL:string}[] = [
                {
                    date: '1980-11-27',
                    title: '탄생',
                    content: '와우',
                    URL: "",
                },
                {
                    date: '2003-01-01',
                    title: 'Play Ground Gaming Inc.',
                    content: 'Game!',
                    URL: "",
                },
            ];
            const command_list:Promise<DB>[] = []
            for(const {date, title, content, URL} of resume){
                query = `INSERT OR IGNORE INTO tbl_my_resume (date, title, content, URL) VALUES ("${date}", "${title}", "${content}", "${URL}")`;
                command_list.push(runPromise(db, query));
            }
            return Promise.all(command_list);
        })
        .catch((err:Error) => console.log(err));
};

function fn_applications(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_applications (id INT, name TEXT, content TEXT, date DATE, platform TEXT, url TEXT, image TEXT, UNIQUE(name, date))
    `;
    runPromise(db, query)
        .then((db:DB) => {
            const applications:Application[] = [
                {
                    id: 1,
                    name: '힘을 찾아런',
                    content: '재밌당',
                    date: '2017-07-01',
                    platform: 'Android',
                    url: "",
                    image: ""
                },
                {
                    id: 2,
                    name: '자동클릭',
                    content: '와우우웅ㅇ',
                    date: '2017-12-13',
                    platform: 'Windows',
                    url: "",
                    image: ""
                },
            ];
            const command_list:Promise<DB>[] = applications.map(({id, name, content, date, platform, url, image}:Application) => {
                query = `
                INSERT OR IGNORE INTO tbl_applications (id, name, content, date, platform, url, image) VALUES ("${id}", "${name}", "${content}", "${date}", "${platform}", "${url}", "${image}")
                `;
                return runPromise(db, query);
            });
            return Promise.all(command_list);
        })
        .catch((err:Error) => console.log(err));
};

function fn_notification(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_notification (id INTEGER PRIMARY KEY 
        AUTOINCREMENT, content TEXT, expiration DATE, type TEXT)`;
    runPromise(db, query)
        .then((db:DB) => {
            query = 'DELETE from tbl_notification';
            return runPromise(db, query);
        })
        .then((db:DB) => {
            query = `INSERT INTO tbl_notification (content, expiration, type) VALUES ('사이트 공사중입니다', '2099-12-31', 'warning')`;
            return runPromise(db, query);
        })
        .catch((err:Error) => console.log(err));
}

export default function run(db:DB, type:number) {
    if(type == TYPE.about_me) {
        fn_about_me(db);
    } else if(type == TYPE.resume) {
        fn_resume(db);
    } else if(type == TYPE.applications) {
        fn_applications(db);
    } else if(type == TYPE.notification) {
        fn_notification(db);
    }
};
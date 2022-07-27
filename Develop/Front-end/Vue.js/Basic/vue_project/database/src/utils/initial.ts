import TYPE from './type';
type DB = {run: any};
type Application = {id: number, name: string, content: string, date: string, platform: string, url: string, image: string};

function fn_about_me(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_about_myself (name TEXT, email TEXT, UNIQUE(name, email))
    `;
    db.run(query, (err:Error) => {
        if(!err) {
            query = `
            INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('DOPT', 'armigar@naver.com')
            `;
            db.run(query);
        } else {
            console.log(err);
        }
    })
};

function fn_resume(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, url TEXT ,UNIQUE(date, title))
    `;
    db.run(query, (err:Error) => {
        if(!err) {
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
            resume.forEach(({date, title, content, URL}) => {
                const query = `INSERT OR IGNORE INTO tbl_my_resume (date, title, content, URL) VALUES ("${date}", "${title}", "${content}", "${URL}")`;
                db.run(query);
            });
        } else {
            console.log(err);
        }
    });
};

function fn_applications(db:DB) {
    let query = `
    CREATE TABLE IF NOT EXISTS tbl_applications (id INT, name TEXT, content TEXT, date DATE, platform TEXT, url TEXT, image TEXT, UNIQUE(name, date))
    `;
    db.run(query, (err:Error) => {
        if(!err) {
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
            applications.forEach((item: Application) => {
                const query = `
                INSERT OR IGNORE INTO tbl_applications (id, name, content, date, platform, url, image) VALUES ("${item.id}", "${item.name}", "${item.content}", "${item.date}", "${item.platform}", "${item.url}", "${item.image}")
                `;
                db.run(query)
            });
        }
    });
};

export default function run(db:DB, type:number) {
    if(type == TYPE.about_me) {
        fn_about_me(db);
    } else if(type == TYPE.resume) {
        fn_resume(db);
    } else if(type == TYPE.applications) {
        fn_applications(db);
    }
};
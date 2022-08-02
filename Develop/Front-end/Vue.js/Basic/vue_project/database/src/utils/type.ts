export default {
    about_me: 1,
    resume: 2,
    applications: 3,
    notification: 4,
};
export type DB = {run: any, all: any, get: any};
export type Application = {id: number, name: string, content: string, date: string, platform: string, url: string, image: string};
export type RSP_RESULT = {rsp: "ok"|"fail", data?:any, error?:string};
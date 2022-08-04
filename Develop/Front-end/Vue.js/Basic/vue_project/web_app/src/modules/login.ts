import { REJECT_TYPE, RESOLVE_TYPE, RSP_RESULT } from './axios';
import useAxios from '/@app_modules/axios';

import md5 from 'js-md5';

const {axiosPut, axiosPost, RSP_RESULT} = useAxios();

export default function () {
    const checkToken = (email:string, token:string) => 
        new Promise((resolve, reject) => {
            const enc_email = email=='vue' ? email : md5(email);
            axiosPost(
                `/db/accounts/check-token/${enc_email}/${md5(token)}`,
                {},
                (data:RSP_RESULT) => {resolve(data)},
                (err:Error) => {reject(err)}
            )
        });
    const updatePassword = (email:string, password:string, oldpassword:string) => 
        new Promise((resolve, reject) => {
            // initial password `vue` isn't encrypted
            const enc_pw = oldpassword == 'vue' ? oldpassword : md5(oldpassword);
            axiosPut(
                `/db/accounts/${md5(email)}/${enc_pw}/${md5(password)}`,
                {},
                (data:RSP_RESULT) => {resolve(data)},
                (err:Error) => {reject(err)},
            );
        });
    
    const login = (email:string, password:string) => 
        new Promise((resolve, reject) => {
            axiosPost(
                `/db/accounts/login/${md5(email)}/${md5(password)}`,
                {},
                (data:RSP_RESULT) => {resolve(data)},
                (err:Error) => {reject(err)},
            );
        });
    return {
        checkToken,
        updatePassword,
        login,
    };
}
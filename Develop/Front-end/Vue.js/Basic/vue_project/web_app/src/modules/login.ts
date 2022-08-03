import { REJECT_TYPE, RESOLVE_TYPE, RSP_RESULT } from './axios';
import useAxios from '/@app_modules/axios';
const {axiosPut, axiosPost, RSP_RESULT} = useAxios();

export default function () {
    const checkToken = (email:string, token:string) => 
        new Promise((resolve, reject) => {
            axiosPost(
                `/db/accounts/check-token/${email}/${token}`,
                {},
                (data:RSP_RESULT) => {resolve(data)},
                (err:Error) => {reject(err)}
            )
        });
    const updatePassword = (email:string, password:string, oldpassword:string) => 
        new Promise((resolve, reject) => {
            axiosPut(
                `/db/accounts/${email}/${oldpassword}/${password}`,
                {},
                (data:RSP_RESULT) => {resolve(data)},
                (err:Error) => {reject(err)},
            );
        });
    
    const login = (email:string, password:string) => 
        new Promise((resolve, reject) => {
            axiosPost(
                `/db/accounts/login/${email}/${password}`,
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
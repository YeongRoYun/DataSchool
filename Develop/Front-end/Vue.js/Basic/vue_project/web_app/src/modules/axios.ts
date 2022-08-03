/// <reference path="../../node_modules/@types/index.d.ts" />
import { axios } from '@bundled-es-modules/axios';
import { ref } from 'vue';

export type RSP_RESULT = {rsp: "ok"|"fail", data?:any, error?:string};
export type RESOLVE_TYPE = (data:RSP_RESULT) => void;
export type REJECT_TYPE = (err:Error) => void;

export default function () {
    const communicating = ref(false);
    const BASE_URL:string = 'http://localhost:8000';
    const createURL = (URL:string) => URL.startsWith('http') ? URL : BASE_URL + URL;
    const checkResult = (result:{status:number, data:RSP_RESULT}, onSuccess?:RESOLVE_TYPE, onFailed?:REJECT_TYPE) => {
        communicating.value = false;
        if(result.status == 200 && result.data.rsp == 'ok') {
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onFailed) onFailed(new Error(result.data.error));
        }
    };
    const axiosGet = async (url:string, onSuccess?:RESOLVE_TYPE, onFailed?:REJECT_TYPE) => {
        communicating.value = true;
        axios.get(createURL(url))
            .then((resp:any) => checkResult(resp, onSuccess, onFailed))
            .catch((err:Error) => console.log(err));
    };
    const axiosPost = async (url:string, data?: any, onSuccess?:RESOLVE_TYPE, onFailed?:REJECT_TYPE) => {
        communicating.value = true;
        axios.post(createURL(url), data)
            .then((resp:any) => checkResult(resp, onSuccess, onFailed))
            .catch((err:Error) => console.log(err));
    };
    const axiosPut = async (url:string, data?:any, onSuccess?:RESOLVE_TYPE, onFailed?:REJECT_TYPE) => {
        communicating.value = true;
        axios.put(createURL(url), data)
            .then((resp:any) => checkResult(resp, onSuccess, onFailed))
            .catch((err:Error) => console.log(err));
    };
    return {
        communicating,
        axiosGet,
        axiosPost,
        axiosPut,
    };
};
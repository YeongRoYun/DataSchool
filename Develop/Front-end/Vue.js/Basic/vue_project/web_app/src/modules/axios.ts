import { axios } from '@bundled-es-modules/axios';

export type RSP_RESULT = {rsp: "ok"|"fail", data?:any, error?:string};

export default function () {
    const BASE_URL:string = 'http://localhost:8000';
    const axiosGet = (URL: string, onSuccess: (arg0: RSP_RESULT)=>void, onFailed?: (arg0: RSP_RESULT)=>void) => {
        const final_URL:string = URL.startsWith('http') ? URL : BASE_URL + URL;
        axios.get(final_URL).then((resp: any) => {
            if (onSuccess) {
                onSuccess(resp.data);
            } else {
                if (onFailed) {
                    onFailed(resp.data);
                }
            }
        });
    }
    return {
        axiosGet,
    }
};
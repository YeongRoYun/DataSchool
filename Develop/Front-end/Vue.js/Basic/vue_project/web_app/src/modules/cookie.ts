const setCookie = (key:string, value:string, days:number) => {
    const date = new Date();
    date.setHours(24 * days - date.getTimezoneOffset() / 60, 0, 0, 0);
    const expires = date.toUTCString();
    document.cookie = `${key}=${value};expires=${expires};path=/`;
};

const getCookie = (key: string) => {
    const value:string | undefined = document.cookie.split(';').find(i=>i.trim().startsWith(key+'='))
    return value ? value.trim().substring(key.length + 1) : undefined;
};

export { setCookie, getCookie};
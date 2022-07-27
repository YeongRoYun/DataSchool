type T = {[key:string]: string, key:"email"|"name", value:string};

const x:T = {key:"name", value:"hello"};
console.log(x.key);
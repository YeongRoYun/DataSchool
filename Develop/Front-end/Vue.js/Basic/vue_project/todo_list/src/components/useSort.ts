import {ToDo} from './storage';

//sort(compare) : >0 : head, <=0 : tail
export default (a:ToDo, b:ToDo) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);

    if(a_date > b_date) return 1;
    else if(a_date < b_date) return 0;
    else return a.id - b.id;
};
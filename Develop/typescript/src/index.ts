const pipe = <T,R>(...functions:Function[]):Function =>
    (x:T): (T) => R => {
        return functions.reduce((value, func) => func(value), x);
    }

const map = f => a => a.map(f);
const square = value => value * value;
const squareMap = map(square); //Pointless function

const fourSquare = pipe(
    squareMap,
    squareMap,
);
console.log(fourSquare([3,4]));


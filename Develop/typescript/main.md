# Typescript
## import/export
https://ko.javascript.info/import-export
```
export function [as name]...
export class [as name]...
export {obj1[ as name][, ...]}
export default obj;
```
- ```export``` is used to export objects from module
- The type of export is **named export** or **default export**
- When ```import```, **named export** MUST be imported with same name
- ```export default obj``` is same as ```export {obj as default}```

```
import {named_export[ as name], ...} to 'module'
import default_export from 'module'
import * [as name] from 'module'
import {default [as name], named_export[ as name], ...} from 'module'
```
- ```import``` is used to import objects from module
- Named_exports are wrapped by unnamed object. So, **destructuring** is possible
- To import both default and named, use ```default``` keyword at **destructuring**

```
export * [as name] from 'module'
export {named_export[ as name][, ...]} from 'module'
export {default [as name]} from 'module'
```
- When summarize modules, ```export ... from ...``` statement is used
- To export ```default```, use ```{default} from 'module'```
- ```export * from 'module'``` export all exports except ```default```

## Project setting
- ```npm i typescript ts-node typescript @types/node```
- ```typescript``` is the transpiler from ```typescript``` to ```javascript```
- ```tsc``` is the keyword for transpiling codes
- ```ts-node``` is the ts-version ```node```
- ```tsc --init``` : Make transpiler configure file. ```tsconfig.json```
-   ```/src``` and ```/src/utils``` structure is used

### tsconfig.json
- tsc Syntax : ```tsc [options] [files]```
- ```CompilerOptions```
  - Default options
  - ```"module" : "commonjs" | "amd"```
    - https://d2.naver.com/helloworld/12864
  - ```"moduleResolution" : "node" | "classic"```
    - ```commonjs``` ~ ```node``` / ```amd``` ~ ```classic```
  - ```target```
    - translated JS version like ```es5``` or ```es6```
  - ```baseUrl```
    - Set baseUrl like ```.```
  - ```outDir```
    - Set the directory to store translated files
  - ```paths```
    - Module paths like ```{"*" : ["node_modules/*"]}```
  - ```esModuleInterop```
    - Set true for interpolating ```commonjs/AMD``` and ```ESM``` modules
  - ```sourceMap```
    - Make ```.js.map``` that maps js code with ts code
  - ```downlevelIteration```
    - To use generator, MUST set ```true```
  - ```noImplicitAny```
    - Don't treat ```f(a, b)``` as ```f(a:any, b:any)``` implicitly
- ```include```
  - Default files
  - ```src/**/*``` means all files in src and src/some/..

## Types
| Type | JS type | TS type |
| - | - | - |
| Numeric | Number | number |
| Boolean | Boolean | boolean |
| String | String | string |
| Object | Object | object |

### type annotation
```let/const identifier: type [ = initial_val] ```

### type inference
```let/const identifier = intial_val```
- Must set initial value

### any
- All values can be matched

### undefined
- Only matched ```undefied``` value

```
            any
             |
 ------------ ------------
 |                        |
 v                        v
 number/boolean/string    object
 |                           |
 |                          interface, class, etc
 |                           |
 |                           |
  ---------------------------
             |
             v
          undefied
```

### template string
- **\`${identifier}\`**

## Object & Interface
- To force object's format, use **interface**
```
interface interface_name {
    attribute_name[?]: type[,...]
}
```
- optional property : ```attribute_name?: type``` cannot exist
- annonymous interface : Just use interface without declare it
  ```
  function f(x:{name:string, age:number, etc?:string})
  ```

## Class
```
class class_name {
    [private | protected | public] attr[?]: type[...]
}
```
- Default access modifier is ```public```
- Create instance : ```const i = new class_name(params)```

- ```constructor([access_modifier] attr[?]: type[...], ...)```
- Implement interface
```
class class_name implements interface_name {
    //attrs defined by interface MUST be included
}
```
- Interface doesn't create attrs

- Abstract Class
```
abstract class class_name {
    abstract attr_name: type
    abstract method() {}
};
```
- Extend abstract
```
class Derived extends Base {}
```
- To access base constructor, use ```super(args)```

| interface | abstract class |
| - | - |
| Not translated to JS |  Translated to JS |
| Not exist at runtime | Exist at runtime, so ```instanceof``` possible |
| Can implement multiple interfaces | Extend only one abstract class |

- ```static```
```
class class_name {
    static attr_name:type
}
```

## Destructuring
- Structuring
  - Like interface, class or object
- Destructuring
  - Destruct object like ```let {name, age} = jack```
  - Attr's names MUST be same
- Rest Operator
  - Store rest attrs in object
```
let addr: any = {
    contry: 'Korea',
    city: 'Seoul',
    address1: 'Gangnam-gu',
    address2: 'Sinsa-dong 123-456',
    address3: '789 street, 2 Floor ABC building',
};
const {country, city, ...detail} = address;
```
```detail``` stores ```address1,2,3```

- Spread Operator
  - Spread attrs in object
```
let part1 = {name: 'jane'}, part2 = {age: 22}, part3 = {city: 'Seoul', country: 'Kr'};
let merged = {...part1, ...part2, ...part3};
```
- ```merged``` stores ```{name, age, city, country}```

## Type conversion
| | |
| - | - |
| Type conversion | Include both ```type casting``` and ```type coerction``` |
| Type casting | Explicit type conversion |
| Type coercion | Implicit type conversion |

- Type assertion
  - Typescript's type casting
  - ```(<type>obj)``` or ```(obj as type)```
```
interface INameable {
    name: string,
    age: number,
};
let obj: object = {name: 'Jack'};
let name1 = (<INameable> obj).name;
let name2 = (obj as INameable).name;
```

## Function Declaration
```
function function_name(arg:type[, ...]): return_type {}
```
- ```void``` type
  - Only return_type
  - If function return nothing, denote ```void``` return type
- Function signiture
```(param1_type[, ...]) => return_type```
  - Use like ```let printMe:(string, number) => void = function (name: string, age: number): void {}```

## Type alias
```type alias = type_name```
```
type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function(a: string, b: number): void {}
```

## undefined
- ```undefined``` type derives all types. So, 
```
interface INameable {
    name: string,
    age?: number,
};
function getName(o:INameable):string {
    return o.name;
}
getName(undefined);
```
doesn't raise ```compile-error```, but ```runtime-error```

- To consider ```undefined```
```
function getName(o:INameable): string {
    return o != undefined ? o.name : 'unknown name';
}
```
- If interface has optional attrs,
```
interface INameable {
    name: string,
    age?: number,
};
function getNumber(o:INameable):number {
    return o != undefined && o.age ? o.age : 0;
}
```
- In **ESNext** and **Typescript**, ```undefined``` is exactly same as ```undefined```

## Optional parameter
```function fn(arg1: string, arg?: number): void {}```
Can be called like
```
fn('hello', 1);
fn('hello');
```
- Signiture : ```(string, number?) => void```

## Function Expression
- Except function_name, necessary components construct ```function expression```
```
let f = function(a: number, b: number): number {return a + b;};
```

## Lazy vs Eager Evaluation
- When compiler translates ```expression```, it produces ```value```
- Function is ```lazy evaluation``` since parameters aren't known

## Function Call Operator
```(params)```
- Evaluate function expression at earger mode

## Anonymous Function
- Doesn't save ```function expression``` in variable
```let val = (function(a, b) {return a+b;})(1, 2);```

## Statement vs Expression
### Statement
- To know result, **Must** return it
```
let x;
x = 1; //Statement
```
### Expression
- The result is known **without** return it
```
if(x > 0) { // x > 0 is Expression
    //something
}
```
### Compound Statement
- Wrap statements in body
```
if(condition) {
    //Statements
}
```
- Compiler recognizes the compound statements as a Single statement
- The scope is limited in body

### Function body and Compound Statements
- with ```function``` keyword, body MUST ```Compound Statements```. So, wrapped by ```{}```
- To return val, use ```return``` keyword

## Arrow function
### Statement version
```(args) => {//statements}```
- Compiler recognizes body like ```compound statement```
### Expression version
```(args) => Expression```
- Compilre recognizes body like ```Expression```

### Expression vs Expression Statement
- Expression is a part of statement
- Expression Statement is itself statement
```
let a = 1, b = 0;
if (a > b); // a>b is a expression
const isGreater = (a,b) => a > b; //a>b is a expression statement
```

## Callback-Function
- The function is passed by ```parameter```
- Callback is useful with ```Framework```

## Object shorthand
- If attr's name is same as stored variable's name, can be shorten
```
const makePerson = (name : string, age: number) => ({name: name, age: age});
//OR => ({name, age});
```
- With ```arrow-function```, ```{}``` is interpreted as compound statement. To interpret it as object, wrap it as ```()```
- ```(name, age) => ({name, age})```

## Destructuring with arguments
```
type Person = {name: string, age: number};
function printPerson({name, age}: Person): void {}
```

## Indexable type
```{[key] : value}```
- Make ```key``` is an attr
```
type KeyValueType = {
    [key: string]: string
};
const makeObject = (key:string, val: string): KeyValueType => ({[key]: val});
console.log(makeObject('name', 'Jack'));
console.log(makeObject('firstName', 'Jane'));
```

## Function & this keyword
- Functions constructed by ```function``` keyword are instances of ```Function``` class
- So, ```this``` keyword can be used to denote itself
- Arrow-Functions are just expression. So, they can't use ```this``` keyword

## Method
- If function is declared in ```class```, ```this``` indecates ```class instance```
- Arrow-function can use ```this``` keyword

### Method-shorthand
```
class A{
    method:()=>void = function() => {}
}
```
Equal to
```
class A{
    method():void {}
}
```

### Static method
```static method()```

### Method Chain
- To implement method-chain, methods always return ```this```

## Triple-Slash Directives
- Single-line comments containing ```a single XML tag```
- The contents of the comment are used as compiler directives
- **ONLY** valid at the top of their containing file
- Mutiple directives are also permitted  
```/// <reference path ="..."/>```
- The most common of this group
- It servers as a declaration of dependency between files
- **Triple-slash references** instruct the compiler to include additional files in the compilation process
- 


## Module
- In typescript, just as in ECMAScript 2015, any file containing a tip-level ```import``` or ```export``` is considered a module
- Conversely, a file without any top-level ```import``` or ```export``` declarations is treated as a script whose contents are available in the global scope
- **Modules** are executed within their own scope, not in the global scope.

## Non-Modules
- The JS specification declares that any JS files without an ```export``` or top-level ```await``` should be considered a script and not a module
- Their variables and types are declared to be in the shared global scope,
  - Join ```outFile``` compiler option to join multiple input filesm or Use multiple ```<script>``` tags in HTML to load these files
- The loaded order is important
- If a file doesn't currently have any ```import```s or ```export```s, but you want to be treated as a module, add ```export {};```
  - Change the file to be a module exporting nothing

## Modules in Typescript
- **CONSIDER**
  - ```Syntax``` : What syntax do I want to use to ```import``` and ```export``` things?
  - ```Module Resolution``` : What is the relationship between module names(or paths) and files on disk?
  - ```Module Output Target``` : What should my emitted JS module look like?

### ES Module Syntax
- Define main export
```
// @filename: hello.ts
export default function helloWorld() { console.log("Hello, world!")};
```
- This is then imported via
```
import helloWorld from './hello'
helloWorld();
```
- Export more than one by omitting ```default```
```
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
```
- These can be used in another file via the ```import``` syntax
```
import { pi, phi, absolute } from './maths';
```
- Mix and match the above syntax into a single ```import```
```
//@filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {};

//@filename: app.ts
import RandomNumberGenerator, { pi } from './maths';
```
- Take all of the exported objects an put them into a ```single namespace```
```
import * as math from './maths';
```
- Can import a file and ```not include any variables``` into the current module
```
import './maths';
console.log("3.14");
```
- In this case, the ```import``` does nothing. However, all of the code in ```maths.ts``` was evalutaed, which could trigger **side-effects**

### Typescript Specific ES Module Syntax
- Types can be exported and imported using the same syntax as JS values
```
@filename: animal.ts
export type Cat = {breed: string; yearOfBirth: number};
export interface Dog { breeds: string[]; yearOfBirth: number};

@filename: app.ts
import { Cat, Dog } from './animal'
```
- Typescript has the ```extended import``` syntax with two concepts for declaring an import of a ```type```
  - ```import type```
    - Only import types
```
//@filename : animal.ts
export const createCatName = () => "fluffy";
//@filename : app.ts
import type { createCatName } from './animal'; // <-- Error!
```
  - ```inline type imports```
    - Typescript 4.5 alsow allows for individual imports to be prefixed with ```type```
```
import { createCatName, type Cat, type Dog, } from './animal';
```

### ES Module Syntax with CommonJS Behavior
- Typescript has ES Module syntax which directly correlates to a CommonJS and AMD ```require```
```
import fs = require('fs'); // CommonJS or AMD
import fs from 'fs'; // ESM
```

### CommonJS Syntax
- ```Exporting```
  - Identifieres are exported via setting the ```exports``` property on a global called ```module```
```
@filename: maths.ts
function absolute(num: number) { return abs(num);};
module.exports = {
  pi: 3.14,
  absolute,
}
```
- ```Importing```
  - These files can be imported via a ```require``` statement
  - Destructuring is also possible
```
@filename: app.ts
const maths = require('maths');
const { pi } = require('maths');
```

### CommonJS and ES Module interop
- with ```esModuleInterop``` in ```CompilerOptions```, Typescript reduces the friction between the two different sets of constraints

## TypeScript's Module Resolution Options
- Module resolution is the process of taking a string from the ```import``` or ```require``` statement, and determining what file that string refers to.
- Typescript includes two resolution strategies
  - ```Classic```
    - The default when the compiler option ```module``` is not ```commonjs```
  - ```Node```
    - Replicate how Node.js works in CommonJS mode, with additional checks for ```.ts``` and ```.d.ts```
  - ```moduleResolution```, ```baseUrl```, ```paths```, ```rootDirs``` are also influenced

## Typescript's Module Output Options
- ```target```
  - Determine which JS features are downleveled(converted to run in older JS runtimes) and which are left intact
- ```module```
  - Determine what code is used for modules to interact with each other

## TypeScript namespaces
- Typescript has tis own module format called ```namespace``` which pre-dates the ES Modules standard

## ```export =``` and ```import = require()```
- Both CommonJS and AMD generally have the concept of an ```exports``` object which contains all exports from a module
- Typescript supports ```export = ``` to model the traditional CommonJS and AMD workflow
  - ```export = ``` specifies a single object that is exported from the module
  - To import it, Typescript-specific ```import module = require("module")``` MUST be used

## Working with Other JS Libraries
- To describe the shape of libraries not written in TypeScript, we need to ```declare the API``` that the library exposes
- ```Ambient``` : Declaration not to define an implementation
  - Typically, these are defined in ```.d.ts```
  - Similar to ```.h```

### Ambient Modules
- We could define each module in its own ```.d.ts``` file with top-level export declarations
- But, it's more convenient to write them as one larger ```.d.ts``` file
- To do so, we use a construct similar to ambient namespaces, but we use the ```module``` keyword and quoted name of the module which will be available to a later import


## Array
```net Array(len)```
- [] shorthand is available like ```let numbers = [1,2,3]```
- ```Array.isArray(obj)``` is same as ```obj instanceof Array```
- Type := ```item_type[]```
```
let numArr: number[] = [1,2,];
let strArr: string[] = ["a", "b"];
```
## Interchange between string and array
- Typescript doesn't have ```character```, only have ```string```
- ```string``` cannot be mutated
- **STRING -> ARRAY** : ```String().split(sep: string): string[]```
- **ARRAY -> STRING** : ```Array().join(sep: string): string```

## Index Operator
- To make indexible like Array, ```type = {[key:some_type]: string}[]```
```
type customArray = {[key:string]:string};
const arr:customArray = {"a": '1', "b": '2'};
console.log(arr.a);
console.log(arr['a']);
```

## Destructure an array
- Use the ```[]``` symbol
```
let arr: number[] = [1,2,3];
let [f,s,t] = arr;
```

## for var in object
- Iterate ```property```. In array, ```index``` is the property
- Type of var is ```string```
```
let numbers = [1,2,3];
for(let x in numbers) {
  const name = numbers[x];
}
let jack = {name: 'Jack', age:22};
for(let property in jack) {
  const value = jack[property];
}
```

## for val of object
- Iterate ```value```
- Array-like object can be used, implementing ```iterator```

## Generic type function
- To declare a function, ```function name<Generic_Type>(args)``` or ```<Generic_Type>(args)```
- To call a function, ```function_name<Generic_Type>(params)```
```
//Declare
function f<T>(x:T[]):number {
    return x.length;
}
const g = <T>(x:T[]):number => x.length;
//Call
f<number>([1,2,3,4,5]);
f([1,2,3,4,5]); //inference
```

## Generic function's signiture
- Typescript raley requires the var_name of signiture's args
```
const error = (cb:(number , number?) => number): void => {};
const fixed = (cb:(a:number , number?) => number): void => {};
```

## Implement range
```
const range = (from:number, to:number):number[] => 
    from < to ? [from, ...range(from + 1, to)] : [];

console.log(range(0, 11));
```

## Functional
- Functional paradiam splits the making and using data
- Reuse general functions
- ```fold```
  - Fold items in array
```
const fold = <T>(arr:T[], cb:(ret:T, val:T)=>T, initVal: T):T => {
  let result:T = initVal;
  for(const item of arr) {
      result = cb(result, item);
  }
  return result;
};
console.log(fold([1,2,3,4,5], (ret:number, val:number) => ret + val, 0));
```
- ```filter```
  - Filter items in array
```
const filter = <T>(arr:T[], cb:(val:T,index?: number)=>boolean): T[] => {
    let result: T[] = [];
    let val:T;
    for(const idx in arr) {
        val = arr[idx];
        if(cb(val, Number(idx))) {
            result = [...result, val];
        }
    }
    return result;
}
console.log(filter([1,2,3,4,5], (val:number)=>val % 2 == 1));
```
- ```map```
  - Map items in array to other domain
  - ```x:T ~ y:Q```
```
const map = <T,Q>(arr:T[], cb:(val:T, index?:number)=>Q):Q[] => {
    let result: Q[] = [];
    let val:T;
    for(const idx in arr) {
        val = arr[idx];
        result = [...result, cb(val, Number(idx))];
    }
    return result;
}
console.log(map([1,2,3,4,5], (val:number)=>val+10));
```

## Array's map, reduce, and filter methods
```
filter(cb:(val:T, index?:number):boolean): T[];
map(cb:(val:T, index?:number):boolean): Q[];
reduce(cb:(ret:T, val:T)=>T, init:T):T;
```

## Pure function
- No I/O code in body
- Don't change params(```const``` or ```readonly```)
- Immidiately return the result
- Don't use static or global variables
- Don't raise any exceptions
- Don't use callbacks
- Don't use asyncronized code like ```Promise```

### readonly type-modifier
- Don't change params/properties like ```const``` variables
```
function forcePure(arr: readonly number[]) {}
```

## Shallow vs Deep copy
- The spread operator acts like ```deep-copy```
```
const origin = [1,2,3];
const shallow = origin;
const deep = [...origin];
```

## Implement pure sort method
```
const pureSort = <T>(arr:readonly T[]): T[] => {
    const deep:T[] = [...arr];
    return deep.sort();
};
const x:number[] = [5,4,3,2,1];
console.log(pureSort(x));
console.log(x);
```

## Implement pure deletion
- To delete specific items in a array, use ```splice``` method
- To make pure, use ```filter``` instead
```
const pureDelete = <T>(arr:readonly T[], cb:(val:T, index?: number) => boolean):T[] => arr.filter((val, idx) => cb(val, idx) == false);
console.log(pureDelete([1,2,3], (val:number)=> val == 2));
```

## Variadic args
- Use ```...args```
- The type of ```...args``` is ```args[]```
```
const mergeArray = <T>(...arrs:readonly T[][]): T[] => {
    let result:T[] = [];
    for(const arr of arrs) {
        result = [...result, ...arr];
    }
    return result;
};
console.log(mergeArray([1,2], [3,4]));
```

## Tuple
- Javascript treats ```Tuple``` same as ```Array```
  - Doesn't have ```Tuple```
- Typescript can declare ```Tuple``` like ```[number, boolean]```

## Generator & Iterator
- Set ```downlevelIteration = true```
- ```for ... of``` statement is used for ```iterator```

### Iterator
- Has ```next``` method
- ```next``` return ```(value, done)```
- ```Iterator``` is created by ```Iterable```

```
const createRangeIterable = (from: number, to: number) => {
    let cur = from;
    return {
        next() {
            const val = cur < to ? cur++ : undefined;
            const done = val == undefined;
            return { val, done };
        },
    };
};
const iterator = createRangeIterable(0, 10);
while(true) {
    const { val, done } = iterator.next();
    if(done) break;
    console.log(val);
}
```

### for ... of and [Symbol.iterator] method
- To make JS's ```Iterable```, make ```Class``` with ```[Symbol.iterator]``` method
```
class CreateRangeIterable {
    constructor(public from: number, public to: number) {}
    [Symbol.iterator]() {
        const that = this;
        let cur = that.from;
        return {
            next() {
                const value = cur < that.to ? cur++ : undefined;
                const done = value == undefined;
                return { value, done };
            },
        };
    }
}
const iterator = new CreateRangeIterable(0, 10);
for(const val of iterator) {
    console.log(val)
}
```
- ```next``` MUST return ```{value, done}```

### that = this technique
- Methods are also functions created by ```function``` keyword
- Functions created by ```function``` have their own ```this``` keyword
- ```Top-level scope``` in method treats ```this``` as ```class instance```, but others treat ```this``` as ```function```
- ```that = this``` is a trick for indecating ```instance``` in ```method```

### Iterable<T> and Iterator<T> interface
- ```Iterable<T>``` is impelmented by ```Iterable```
  - ```class Iterable implements Iterable<type> {}```
- ```Iterator<T>``` indecates the type created by ```iterator```
  - ```[Symbol.iterator](): Iterator<type>```

```
class StringIterable implements Iterable<string> {
    constructor(private strings: string[], private currentIndex: number = 0) {}
    [Symbol.iterator](): Iterator<string> {
        const that = this;
        let currentIndex = that.currentIndex;
        let length = that.strings.length;

        const iterator: Iterator<string> = {
            next(): { value: string, done: boolean} {
                const value = currentIndex < length ? that.strings[currentIndex++] : undefined;
                const done = value == undefined;
                return { value, done };
            },
        };
        return iterator;
    }
}
```

### Generator
- ESNext and Typescript provide ```yield``` keyword
- Functions created by ```function*``` can use ```yield```
```
function* generator() {
    console.log('Generator started...');
    let val = 1;
    while(val < 4)
        yield val++;
    console.log('Generator finished...');
}
for(const val of generator()) {
    console.log(val);
}
```

### Semi-coroutine
- Single-thread PLs like typescript act like Multi-threads
- ```setInterval```
  - Call ```cb``` periodically
  - ```const intervalID = setInterval(cb, period)```
  - Can stop by ```clearInterval(intervalID)```
```
const period = 1000; // mile-second
let count = 0;
console.log('program started...');
const id = setInterval(() => {
    if(count >= 3) {
        clearInterval(id);
        console.log('Program finished...');
    }
    else console.log(++count);
}, period);
```
- Like ```thread```, cb seems like allocated to ```worker```

### The difference between Semi-Coroutine and Coroutine
- **COROUTINE**
  - Application-level threads
  - Automatically and periodically executed 
- **SEMI-COROUTINE**
  - Periodically, but Not Automatically executed
  - ```generator``` is an example of this

### function* keyword
- Generator is only created by ```function*```
- Arrow-functions cannot become generator

### yield keyword
- Act like operator
  - Create iterator automatically
  - Serve iterable
```
class IterableUsingGenerator<T> implements Iterable<T> {
    constructor(private values: T[], private currentIndex: number = 0) {}
    [Symbol.iterator] = function* () {
        while(this.currentIndex < this.values.length)
            yield this.values[this.currentIndex++];
    }
}
for(const item of new IterableUsingGenerator([1,2,3])) {
    console.log(item);
}
```

### yield* keyword
- ```yield``` serves simple value, ```yield*``` serves other generators or arrays
```
function* gen12() {
    yield 1;
    yield 2;
}
function* gen12345() {
    yield* gen12();
    yield* [3,4];
    yield 5;
}
```

### yield return value
- The return value of ```yield``` is the value passed ```next(param)```
```
function* gen() {
    let count = 5;
    let select = 0;
    while(count--) {
        select = yield `you select ${select}`;
    }
}
const iter = gen();
for(const val of [5,4,3,2,1]) {
    const {value, done} = iter.next(val);
    console.log(value);
}
```
- First ```select``` is default value, ```select = 0```

## Promise and async/await
- To use asyncronized API, set ```downlevelIteration=true```
- ```Asynchronous callback function```
  - Used to receive the result of API

### Example
- Sync
```
import {readFileSync} from 'fs';
const buffer: Buffer = readFileSync('./package.json');
const content:string = buffer.toString();
console.log(content);
```
- Async
```
import {readFile} from 'fs';
readFile('./package.json', (err:Error, data:Buffer) => {
    if(err) throw err;
    else {
        const content:string = data.toString();
        console.log(content);
    }
});
//Continue progress
for(const val of [1,2,3,4]) {
    console.log(val);
}
```

### JS use single-thread
- Browser or Node themselves are executed at multi-thread, but JS code only executed a single thread

### Promise
- ```Promise<T>((resolve, reject)=>void)```
- Used to make ```Asynchronous object```
- cb has two args, ```resolve, reject```
```
import {readFile} from 'fs';

const readFilePromise = (filename: string): Promise<string> => {
    return new Promise<string>(
        (resolve: (value: string)=> void,
         reject: (error:Error)=>void) => {
            readFile(filename, (err:Error, buffer:Buffer) => {
                if(err) reject(err);
                else resolve(buffer.toString());
            })
         });
};

readFilePromise('./package.json')
    .then((content:string) => {
        console.log(content);
        return readFilePromise('./tsconfig.json');
    })
    .then((content:string) => {
        console.log(content);
        return readFilePromise('.');
    })
    .catch((err:Error) => console.log(err))
    .finally(() => console.log('프로그램 종료'));
```
- ```resolve``` matches ```then```
- ```reject``` matches ```catch```
- ```finally``` is executed **finally**
- ```then```, ```catch``` or ```finally``` wait the execution above 

### Promise.resolve class method
- Always matches ```then```
```
Promise.resolve(1)
  .then(value => console.log(value)) // 1
```

### Promise.reject class method
- Always matches ```catch```
- Receive ```Error-type object```
```
Promise.reject(new Error('Error raise'))
  .catch((err:Error) => console.log('error:', err.message));
```

### then-chain
- The callback at ```then``` can return a value
- The value can be received by another ```then``` or ```catch```
  - Even if ```throw error```, it is received by ```then```
- If the value is ```Promise```, return ```resolved``` or ```rejected``` value
  - ```then``` or ```catch``` are received

```
Promise.resolve(1)
    .then((val: number) => {
        console.log(val);
        return new Error("hello");
    })
    .then((err:Error) => {
        console.log(err);
        return Promise.reject(new Error("error!!"));
    })
    .catch((err:Error) => console.log(err));
```

### Promise.all class method
- Like ```Array().every(condition)```
  - ```all(promise_arr:Promise[]): Promise<resolved_type[] or any>```
- if all is resolved, return ```Promise.resolve```
- if one of elements is rejected, immidiately return ```Promise.reject```
```
const getAllResolvedResult= <T>(promises: Promise<T>[]) => Promise.all(promises);

getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])
    .then(result => console.log(result));
getAllResolvedResult<any>([Promise.reject(new Error("error!!")), Promise.resolve('hello')])
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

### Promise.race class method
- Like ```Array().some(condition)```
  - ```race(promise_arr:Promise[]): Promise<first_resolved_type or Error> ```
- Return the first resolved ```Promise.resolve```
- If ```reject``` is first, return ```Promise.reject```
```
Promise.race([Promise.resolve(true), Promise.reject(new Error("error!!"))])
    .then(value => console.log(value));

Promise.race([Promise.reject(new Error("error!!")), Promise.resolve(true)])
    .catch(err => console.log(err));    
```

### async/await
- Make Promise more readable
```
const test = async () => {
    const value = await Promise.resolve(1);
    console.log(value);
}
test();
```

### await
```let val = await Promise | value```
- Return the value of operand
- if ```operand``` is ```Promise```, return ```.then```

#### async function modifier
- ```await``` can be used in ```async``` function body
```
const test1 = async() => await Promise | value;
async function test2() { await Promise | value; }
```
### Async function
- Used like general functions
- Used like ```Promise``` object
```
async function test1() {
    let val: any = await 1;
    console.log(val);
    val = await Promise.resolve(1);
    console.log(val);
}

async function test2() {
    let val: any = await 'hello';
    console.log(val);
    val = await Promise.resolve('hello');
    console.log(val);
}

//Run asyncronously
test1();
test2();

//Run syncronously
test1()
    .then(() => test2());
```

### The mean that the value returned by async function
- Return ```Promise``` containing ```values``` or ```Error```
- To access, use ```.then```, ```.catch```, or ```.finally```

## Functional Programming
- The paradigm that designs and implements code with ```function composition``` and ```monadic composition``` based on ```pure function``` and ```declarative programming```
- Mathematical Basis
  - Ramda Calculus : The basis of combinatory and category
  - Combinatory Logic : The basis of function composition
  - Category Theory : The basis of monadic composition and high order type
- Programmable Basis
  - Static type
  - Automatic memory management
  - Evaluation
  - Type inference
  - First-class function
- Features
  - Algebraic Data Type
  - Pattern Matching
  - Monad
  - High order type
  - Function composition
  - ETC...
- **Typescript simplifies the FP by removing pattern matching and high order type**

## Generic Type
- Function, Interface, Class, and Type alias can be ```generic```
```
function g1<T,Q>(a:T, b:Q):Q{}
const g2 = <T>(a:T):void => {}

type Type1Func<T> = (T) => void;
type Type2Func<T, Q, R> = (T, Q) => R;
```

### Map function
- ```x ~> f ~ y``` == ```(x:T) ~ f -> (y:R)```
- ```type MapFunc<T, R> = (T) => R```

### Identity Function
- ```type IdentityFunc<T> = MapFunc<T, T>```

## High-order function and Curry
- **Arity** := the number of params
  - ```f()```'s arity = 0
  - ```f(x,y)```'s arity = 2
- If ```f, g, h```'s arrities are all 1, ```x ~> f ~> g ~> h ~> y``` is possible
  - ```y = h(g(f(x)))```
  - To compose functions, ```arity=1``` is recommanded

### High-order function
- The function that returns another function
  - Generic type only denote both ```input``` and ```output```
- ```1st order function``` := return value
  - ```type FirstOrderFunc<T,R> = (T) => R```
- ```2nd order function``` := return 1st order function
  - ```type SecondRoderFunc<T,R> = (T) => FirstOrderFunc<T, R>```
- ```3nd order function``` := return 2nd order function
  - ```type ThirdOrderFunc<T,R> = (T) => SecondRoderFunc<T, R>```

```
const inc: FirstOrderFunc<number, number> = (x:number):number => x + 1;
const add2: SecondRoderFunc<number, number> = (x: number): FirstOrderFunc<number, number> => (y:number): number => x + y;
const add3: ThirdOrderFunc<number, number> = (x: number): SecondRoderFunc<number, number> => (y: number): FirstOrderFunc<number, number> => (z:number) => x + y + z;
```

### Curry
- Use function-call operators consecutively at ```high-order function```
  - ```add3(1)(2)(3)```
- ```High-order function``` uses call-operator same as the degree

### Partially applied function(Partial function)
- Use call-operator less than the degree
- ```add3(1)(2)``` same as ```First-Order-Function```

### Closure
- The partial function has ```persistence scope```
- The bound variables aren't free until the deleting partial function
```
function add(x: number): (number) => number { // Outer scope begin
  return function(y: number): number {        // Inner scope begin
    return x + y; // Closure
  }                                           // Inner scope end
}                                             // Outer scope end
```

## Function composition
- Make a complex function by ```piping``` or ```composing``` simple functions

### compose
- Input : **arrity=1** functions
- Output : First-Order function
```
const f = <T>(x:T):string => `f{${x}}`;
const g = <T>(x:T):string => `g(${x})`;
const h = <T>(x:T):string => `h(${x})`;

const compose = <T, R>(...functions: Function[]): Function =>
    (x: T): (T) => R => {
        const deepCopiedFunctions = [...functions];
        return deepCopiedFunctions.reverse().reduce((val, func) => func(val), x);
    };

const composedFGH = compose(h, g, f);
console.log(composedFGH('x')); // h(g(f(x)))
```

### pipe
- Same as ```compose``` except the interpretation order
```
const f = <T>(x:T):string => `f{${x}}`;
const g = <T>(x:T):string => `g(${x})`;
const h = <T>(x:T):string => `h(${x})`;

const pipe = <T,R>(...functions:Function[]):Function =>
    (x:T): (T) => R => {
        return functions.reduce((value, func) => func(value), x);
    }

const composedFGH = pipe(f, g, h);
console.log(composedFGH('x'));
```

### Pointless function
- The function constructed by considering ```function-composition```
- ```arrity=1```
- Do not need ```Call operator``` when composiing them
```
const map = f => a => a.map(f);
const square = value => value * value;
const squareMap = map(square); //Pointless function

const fourSquare = pipe(
    squareMap,
    squareMap,
);
console.log(fourSquare([3,4]));
```
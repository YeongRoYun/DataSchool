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
- ```npm i typescript ts-node```
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
    - Set true for interpolating ```commonjs``` and ```amd``` modules
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
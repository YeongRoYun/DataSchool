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
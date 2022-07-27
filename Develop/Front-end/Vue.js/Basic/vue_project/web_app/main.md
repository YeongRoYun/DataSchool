# Web application
```
                          ------ App ------
                         |   ---NavBar---  |
                         |  |            | |
                         |   ------------  |
                         |   ------------  |
     --------------------|--|router-view | |----------
    |           |        |   ------------  |          |
    |           |        |        |        |          | 
    |           |         -----------------           |
    |           |                 |                   |
    |           |                 |                   |
    v           v                 v                   v
 ----------   -----------     -----------         ----------------   
|   home   | |application|   |  profile  |       |       Admin    |
|----------   -----------     -----------         ----------------
| -------  | | --------- |   | --------- |       | ------  ------ |
||  Blog | | || AppCard ||   ||   Card  ||       ||Login ||Editor||
| -------  | | --------- |   | --------- |       | ------  ------ |
 ----------   -----------     -----------         ----------------
                            
```

## Responsive Web Application
- Render proper UI depending on the size of window
- ```bootstrap``` is a frontend framework for **responsive web**
  - ```bootstrap-v5``` doesn't use jQuery anymore

## Bootstrap
- ```class="ms/me-auto"``` : Adjust tags with same margin
```
<span>왼쪽 정렬</span><span class="ms-auto">오른쪽 정렬</span> //margin-start
<span class="me-auto">왼쪽 정렬</span><span>오른쪽 정렬</span> // margin-end
```
- General attrs like ```data-target``` or ```data-toggle``` are changed like ```data-bs-target```(bs := bootstrap)

## CommonJS vs AMD vs ES module
```Javascript module parser```
### CommonJS
- For using ```JS``` at server-side or desktop apps as well as browser 
- ```Common``` means that js can become a general Programming Language
- ```require()``` and ```module.exports```

### AMD
- Divided at ```CommonJS``` for browser-specific
- Specialize Asyncronous Module Definition, downloading modules for browser

| | |
| - | - |
| CommonJS | If modules are in local, commonJS is prefered |
| AMD | if modules are in server, AMD is prefered |

## EcmaScript modules(ESM)
https://ui.toast.com/weekly-pick/ko_20180402
- used after ES6
- ```import``` ```export```
- ```use strict``` and ```type=module``` is required

| CJS | ESM |
| - | - | 
| Load modules at File System | Parse an entry file and check dependencies. Repeat it until there're no more dependencies |
| Block main-thread loading modules |  | Don't block main-thread loading modules |
| Don't divide the flow from loading a module to evaluating it | Instanciation is followed by above |
|  Module specifier can be variable | Module specifier cannot be variable except ```dynamic import``` |
| Copy value to ```exports``` object | ```export``` defines the function to return ```references``` |
| | Dynamic import is treated as a different entry file. So, draw another graph |


## Webpack and Dynamic import
https://webpack.js.org/   
```For optimization```
- Used to minify code
- ```import(module-specifier)``` returns ```Promise```

## Vite
- Use ```ESM``` environments
- ```bootstrap.esm.min.js``` is a compiled bundle to support ESM
- ```bootstrap.esm.min.css``` is a style-sheet to support ESM
- Necessary Files
  - ```main.js``` : Manage the highest dependencies and define the highest component
  - ```index.html``` : the highest DOM
  - ```App.vue``` : the highest component
  - ```style.css``` : the global style-sheet

## The lifecycles
| Optional API | Composition API |
| - | - |
| beforeCreate | setup itself |
| created | setup itself |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked |
| renderTriggered | onRenderTriggered |
- ```setup``` can access ```props```, ```non-props```, and ```emits```

## Component name
- Cammel Style and Cabab style is compotible
- ```NavBarName``` can be used like ```NavBarName``` or ```nav-bar-name```

## Computed
- Transform data when they are needed
```
const index = ref(0);
const num = computed({get: () => index.value, set: v=> {index.value=v + 1}});
```
- Can set ```getter``` and ```setter```
- ```computed(function)``` set ```getter```
- Return ```computed ref```

## Axios
- HTTP client based on ```Promise```
- Operate browser and node

### Install
- ```Webpack``` env : ```npm install axios```
- ```Vite``` env : ```npm i @bundled-es-modules/axios```

```import { axios } from module_specifier```

## Vuex
- The lifecycle of component's data is same as the component
- Caching data, use ```localStorage```, ```indexedDB``` or memory-based storages like ```Vuex```
- Composition API can replace Vuex 100%
- Vuex's Goodness
  - Provide state management pattern
  - Provide the central storage to all components
- ```npm install vuex```
- Manage stores in ```src/store``` 
- Structure
```
{
  namespaced: boolean // Object has own namespace same as var_name
  state: ()=>object // Return storable data
  getters: {
    properties: (state) => property //Return pre-processed property, like computed
  },
  mutations: {
    mutate_functions // Permit the data is changed
  }
  actions: {
    APIs //Called by outer-components
  }
}
```
- To make store, 
```
import { createStore } from 'vuex';
import { modules } from './modules/..';
export const store = createStore({
  modules: {
    module_name: module,
  }
});
```
- Register plug-in
```
import { stroe } from ...
app.use(store);
```
- ```store.dispatch(action_path, data)``` run actions
- ```store.getters[data_path]``` get data

## Vue.js Global API
### createApp
- Create an application instance
- Don't share the states in each other
- Thus, Vue2's global apis are replaced to ```application apis```

| Vue2 Global API | Vue3 App API |
| - | - |
| Vue.config | app.config |
| Vue.config.productionTip | Deleted |
| Vue.config.ignoredElements | app.config.isCustomElement |
| Vue.component | app.component |
| Vue.directive | app.directive |
| Vue.mixin | app.mixin |
| Vue.use | app.use |

- If you want to share same configs with instances, create ```Factory```
```
import { createApp } from 'vue';
import Foo from 'Foo.vue';
import Bar from 'Bar.vue';

const createMyApp = options => {
  const app = createApp(options);
  app.directive('focus', ...);
  return app;
};
createMyApp(Foo).mount('#foo');
createMyApp(Bar).mount('#bar');
```

### defineComponent
- Return the component passed by a param
- Create a component using ```setup```, pass a function having same name with stored_var.  
```const A = defineComponent(function A() {...}```
  - ```A``` becomes the name

### defineAsyncComponent
- Create a component passed by a factory function created by ```Promise```
- Asyncronous component MUST be returned by ```resolve```
```const A = defineAsyncComponent(() => import ('/@components/A.vue'));```
- Typically, use to make raely used component a independent chunk

### resolveComponent
- Call a component by ```Component name```

### resolveDynamicComponent
- Call a component like dynamic components
- Only used in ```render``` or ```setup```

### resolveDirective
- Call directive by ```Directive name```
- Only used in ```render``` or ```setup```

### withDirectives
- Relect directive to a VNode, return the VNode
```
import { withDirectives, resolveDirective } from 'vue';
const foo = resolveDirective('foo');
const bar = resolveDirective('bar');

return withDirectives(h('div'), [
  [foo, this.x], [bar, this.y],
]);
```


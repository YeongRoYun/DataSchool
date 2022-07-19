# Vue.js
## Intro

### Design Pattern(UI/UX)
**MVC**
- Model + View + Controller
``` 
                          n
                 --------->  View
              1 |              ^
Action --> Controller          |
                |              |
                 --------->  Model
```
- How?
  - User's actions come in a controller
  - The controller checks actions and updates models
  - The controller select views representing models
  - The views draw scenes by using models
- When do views update?
  - Views directly update themselve by using Models
  - Models notify Views
  - Views poll the changes of models regularly
- Features
  - Controller : Views/Models = 1 : n
  - Controller just selects views, not update them
- Good
  - Simple
- Bad
  - There is high dependence between Views and Models

**MVP**
- Model + View + Presenter
```
            1     
     -------- View   <-- Action
    |            ^
    |            |
   1|
    v            |
Presenter --------
    |   ^
    |   |        
    |   ----------          
    |             |
     -------- > Model
```
- How?
  - User's actions come in views
  - A view requests data to a presenter
  - A presenter requests data to a model
  - A model replies data to a presenter
  - A presenter replies data to a view
  - A view draws scenes by using data
- Features
  - A presenter has both view and model instances
  - Prenter : View = 1 : 1
- Good
  - There is no dependency between view and model
- Bad
  - Ther is high dependency between view and presenter

**MVVM**
- Model + View + View Model
```
                 n
   --------------- View <-- Action
   |
  1|
   v
View Model <----
    |          |
    |          |
     ------->  Model
```
- How?
  - User's actions come in views
  - When a view receives actions, it sends action to a View Model by COMMAND Pattern
  - A view model request data to a model
  - A model replies data to a view model
  - A view model refines and saves replied data
  - A view draws scenes by Data Binding with a View Model
- Features
  - Command & Data Binding Patterns
  - View Model : View = 1 : n
- Good
  - There is no dependency between View and Model, and between View and View Model by Patterns
- Bad
  - To design a View Model is difficult
- Additional
  - Command Pattern
    - The requests are capsulized in objects
    - Components
      - Command : Has receiver objects and call their methods
      - Receiver : Executed by Command object
      - Invoker : Has command objects and call commands
      - Client : Has an invoker object and command objects. To execute commands, Client passes commands to invoker
    - Good
      - Since interfaces are defined, each component can be modulized
  
  - Data Binding Pattern
    - Data binding is a general technique that binds data sources from the provider and consumer together and synchronizes them
    - Components
      - Observer : Has both data and user objects and fetchs users if data are changed
      - Data : Data object
      - User : Change by data
    - Good
      - Each data change is reflected automatically by the elements that are bound to the data


### Vue.js applications
- Good choice
  - Single Page Application(SPA)
  - Code reusages and Speed for updating DOM
-  Bad choice
   -  Search Engine Optimization(SEO)

### Performance
**Virtual Node**
- Vue creates VNode and renders DOM in it and finally notifies DOM to browser
- Directives := Special symbols used in HTML for changing DOM's elements

## Basic
### How to include Vue.js in project
**CDN**
- Contents Delivery Network
- Directly include vue.js in script
- Test/Study

**NPM**
- Controll dependencies
- Dev/Deployment
- ```npm install vue@next``` if project is compiled by Webpack or Rollup, etc
- ```npm init @vite [project_name]``` if project is compiled by VITE

### App.vue
```
<template>
//HTML DOM structure
</template>
<style>
//CSS style
</style>
<script [setup]>
//JS script
</script>
```
- Single-File-Components(SFC) has .vue extender
  - Components are defined in SFC files
- ```<script setup>``` changes ```<template>``` by render() internally
  - Doesn't need to expose variables or components
- ```<style scoped>``` applies style only in SFC
- Vite Alias
  - At ```vite.config.js```,
  ```
  defineConfig {
    resolve: {
        alias: {
            '/@': path.resolve(__dirname, './src'),
            '/@components': path.resolve(__dirname, './src/components'),
        }
    }
  }
  ```
- After aliasing paths, path can be aliased when invoken

### Syntax
**Single File Component**
- SFC defines single component

| template | script | style |
| - | - | - |
| rendered HTML code | js/ts code | CSS code |

- Composition function **setup**
  - Return **object** containing variables used in template
  ```
  setup() {
    const data = 1;
    return { data };
  }
  ```

**Component Lifecycle**
- Create component
- Mount component at DOM node tree
- Remove unnecessary elements
- **hooking** by defining hook functions

**Hook functions & lifecycle**
- ```setup```
  - beforeCreate : Called before creating a compoment. Can't access data
  - created : Called after creating a compomnent. Can access data
- ```beforeMount```
  - onBeforeMount: Called before called by VNode.
- ```mounted```
  - onMounted : Called after mounting a component at VNode's DOM. Can access real elements in DOM
- ```beforeUpdate```
  - onBeforeUpdated : Called before applying changed data at VNode's DOM to real DOM
- ```updated```
  - onUpdated : Called after applying changed data to real DOM. To gurantee all children are updated,
```
updated() {
    this.$nextTick(function() {
        //all children are updated
    })
}
```
- ```beforeUnmount```
- onBeforeUnmount : Called before unmounting a component
- ```unmounted```
- onUnmounted : Called after unmounting a component
- ```activated```
- onActivated : Called when the status of components are preserved by ```keep-alive```
```
<keep-alive>
    <component v-is="currentComponent" />
</keep-alive>
```
- ```deactivated```
- onDeactivated : Called when the ```keep-alive``` loses the status, such as re-render preserved component
- ```renderTracked```
- onRenderTracked : Called when VNode DOM is changed
```
renderTracked(e:DebuggerEvent) {
    console.log(e.target) //target attr for tracking V-DOM
}
```
- ```renderTriggered```
- onRenderTriggered : Called before real DOM is changed
- ```errorCaptured```
- onErrorCaptured : Called when Descendant components raise errors

**Declaritive Rendering**
- DOM is updated automatically when data is changed
- To use data in template, use Mustache syntax, ```{{data}}```
```
<template>
    <div id="date">
        {{date}}
    </div>
    <div id="date2">
        {{date2}}
    </div>
</template>

<script>
export default {
    //Composition API, Vue3.x
    setup() {
        const date = Date().toString()
        return {
            date,
        }
    }
    //Options API, Vue2.x
    data() {
        return {
            date2 : Date().toString()
        }
    }
}
</script>
```

**Derective**
- ```v-text``` : ```<p v-text="msg"></p>``` is same as ```<p>{{msg}}</p>```
- ```v-html``` : Insert html-markup-code, not TEXT. ```<div v-html="<i>HTML TEXT</i></div>"```, **DON'T USE**
- ```v-pre``` : Same as ```<pre>``` tag and apply all descendants
- ```v-bind/v-model``` : bind tag attrs and data
  - ```v-bind``` can be wroten shorter ```v-bind:title="var"``` equal to ```:title="var"```
  - ```v-bind``` just binds data to template
  - ```v-model``` binds bidirection of data and template
  ```
    <template>
    <p>줄임말과 원래말을 입력하세요.</p>
    <input type="text" v-bind:value="abbr" /> <!--Or :value="abbr"-->
    <input type="text" v-model="normal" />
    <hr />
    <abbr v-bind:title="normal"> {{abbr}}</abbr>
    </template>

    <script>
    import { ref } from 'vue'

    export default {
    setup() {
        const abbr = ref('DOPT');
        const normal = ref('Dong Project Team');
        return {
        abbr,
        normal,
        }
    },
    }
    </script>
  ```
  - To declare interative variables, wrap it as ```ref```
    - Variables wrapped by **ref** are transformed as ```proxy object```
- ```v-model```'s decorators
  | | |
  | - | - |
  | .lazy | v-model vars synchronizes with input event. With .lazy, synchronizes with changed event |
  | .number | automatically type-cast to number |
  | .trim | automatically trim |

**event listener**
- ```v-on``` directive to capture event generated by html tags or user's components
```
<template>
  <div>
    <p>Counter1 : {{counter1}}</p>
    <p>Counter2 : {{counter2}}</p>
    <button @click="++counter1">Counter1</button>
    <button v-on:click="onClick">Counter2</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const counter1 = ref(0);
      const counter2 = ref(0);
      const onClick = (evt) => {
        if(evt) {
          evt.preventDefault(); //Don't call default user-agent event listener
          ++counter2.value;
        }
      };
      return {
        counter1,
        counter2,
        onClick,
      }
    }
  }
</script>
```
| Decorator | Desc |
| - | - |
| .stop | ```evt.stopPropagation()```  |
| .prevent | ```evt.preventDefault()``` |
| .capture | Activate capture option |
| .self | Call handler when only it's event is detected |
| .once | Allow atmost one click |
| .passive | Activate passive option |
| .exact | Call handler when exactly click target key. ```@click.ctrl.exact``` |
| .left | Call hander when left-button of mouse is clicked |
| .right | Call handler when right-button of mouse is clicked |
| .middle | Call handler when middle-button of mouse is clicked |

- key decorator
  - Edit keyboard inputs like ```<input @keyup.enter.prevent />```
  - For better UX, key event can be modified

**condition/loop statements**
- ```v-if=cond / v-else-if=cond / v-else``` : re-render elements
- ```v-show=cond``` : render all possible elements and hide them by condition
```
v-for="val / (val, idx) in arr"
v-for="val / (val, key) / (val, key, idx) in object"
```
- To make interactive objects or arraies, wrap them by ```reactive```
```
<template>
  <p> {{counter}}</p>
  <p v-if="counter < 5">5보다 작습니다</p>
  <p v-else-if="counter < 10">10보다 작습니다</p>
  <p v-else>10과 같거나 큽니다</p>
  <p v-show="counter > 20">20보다 큽니다</p>
  <button @click.prevent="++counter">클릭하면 숫자가 올라갑니다</button>

  <div style="width: 200px">
    <ol>
      <li v-for="item in items">{{item}}</li>
    </ol>
  </div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const counter = ref(0);
      const items = reactive(['1번 아이템', '2번 아이템', '3번 아이템']);
      return {
        counter, items,
      }
    }
  }
</script>
```
- If rendered elements are same type, **should** denote ```key-attribute```
  - V-DOM reuses them if they aren't distinct

**Computed**
- Change data more flexible
- Wrap functions

| Computed | Function |
| - | - |
| Flexible data manipulation | Flexible data manipulation |
| If the interactive aren't changed, don't update DOM | Re-calculate data and Re-render DOM |

```
<template>
  <h2>Small Items</h2>
  <p v-for="item in small_items_c" :key="item.id">{{item.text}}</p>

  <h2>Big Items</h2>
  <p v-for="item in big_items_c" :key="item.id">{{item.text}}</p>
</template>

<script>
import {reactive, computed} from 'vue'

export default {
  setup() {
    const arr = reactive([
      {id: 1, text: '1번 아이템'},
      {id: 2, text: '2번 아이템'},
      {id: 3, text: '3번 아이템'},
      {id: 4, text: '4번 아이템'},
      {id: 5, text: '5번 아이템'},
    ]);
    const small_items_c = computed(() => {
      return arr.filter((i) => i.id < 3);
    });
    const big_items_c = computed(() => {
      return arr.filter((i) => i.id >= 3);
    });
    return {small_items_c, big_items_c};
  },
}
</script>
```

**Watch & WatchEffect**
- Call callback by detecting the change of data
- ```watch```
  - Can refer previous value, ```callback = (cur, prv) => {}```
  - To detect first load, use ```immediate=true``` option
  - To detect multiple data, pass ```list```
  - If watched data is list or object, ```deep=true``` option
- ```WatchEffect```
  - Can't refer previous value
  - Defaultly ```immediate=true```
  - Return ```stop``` watchEffect function
  - ```flush=pre/post``` : call callback before/after updating DOM

```
<template>
  <div>
    <p>{{count1}}</p>
    <button @click="++count1">Count1 증가</button>
    <p>{{count2}}</p>
    <button @click="++count2">Count2 증가</button>
    <p>{{state}}</p>
    <button @click="onStop()">watchEffect 중지</button>
  </div>
</template>

<script>
  import {ref, watch, watchEffect} from 'vue'

  export default {
    setup() {
      const count1 = ref(0);
      const count2 = ref(0);
      const state = ref('실행 중')

      watch(
        count1,
        (cur, prv) => {
          console.log('Composition API Watch: ' + prv + ' ==> ' + cur)
        }, {
          immediate: true,
        }
      );

      watch([count1, count2], (cur, prv) => {
        console.log('Composition API Multiple Watch: ', + prv[0] + ','  + prv[1] + ' ==> ' + cur), {
          deep: true,
          immediate: true,
        }
      });

      const stop = watchEffect(
        () => {
          console.log('Composition API watchEffect Called ' + count2.value)
        }, {
          flush: 'post',
        }
      );
      const onStop = () => {
        state.value = '중지';
        stop();
      };

      return {
        count1, count2, state, onStop,
      }
    }
  }
</script>
```

**Create Component**

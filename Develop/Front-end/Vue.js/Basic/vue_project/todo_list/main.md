# Todo List
## Architecture
```
---------------App-------------------------------
|                                                |
|                                                |
|   ----------TodoList Container------------     |
|  |                                        |    |
|  |   -----------TodoListNew------------   |    |
|  |  |                                  |  |    |
|  |   ----------------------------------   |    |
|  |                                        |    |
|  |                                        |    |                                    -------------------------
|  |   -----------TodoListMain-----------   |    |                                   |        Composition      | 
|  |  |                                  |  |    |    < ========================= >   -------------------------
|  |  |  ---------TodoListMenu---------  |  |    |                                   |   Storage               |
|  |  | |                              | |  |    |                                   |   Filter                |
|  |  |  ------------------------------  |  |    |                                    -------------------------
|  |  |                                  |  |    |
|  |  |  ---------TodoList------------   |  |    |
|  |  | |                             |  |  |    |
|  |  |  -----------------------------   |  |    |
|  |   ----------------------------------   |    |
|  |                                        |    |
|   -----------------------------------------    |
|                                                |
 ------------------------------------------------   

```

## Sharing data
**Props/Emits**
- Powerful
- Data are sahred step by step

**config.globalProperties**
- Useful to set const data

**Vuex**
- The global stateful store


**Provide**
- Vue 3.x, If parents provide data, descendants can inject data
- To provide the properties of object, use **getter**
```
provide :{my_property: object.property};
probide() { return {
    my_property: object.property;
}}
```

## Datum Structure
| key | desc |
| - | - |
| id | For unique arr index |
| job | todo-text |
| date | D-day |
| completed | Note whether job is completed or not |

## Reactive API
```
Reactive <------------->  Non-Reactive
       Proxy          Raw   
      
```
**reactive**
- Make all properties in object reactive

**readonly**
- Convert object to readonly **proxy** object
- All properties are also converted to **readonly**

**isProxy**
- True if proxy object

**isReactive**
- True if proxy object is created by **reactive**
- True when **readonly(reactive(object))**

**isReadonly**
- True if readonly proxy

**toRaw**
- Restore proxy created by reactive or readonly to raw

**markRaw**
- If object is created by **markRaw**, it isn't converted to proxy

**swallowReactive**
- Make shallow properties in object reactive
```
shallowReactive({
    foo: 1, // reactive
    nested: {bar :2}. //not reactive 
})
```

**shallowReadonly**
- Make shallow properties in object readonly

**ref**
- Make primitive object(```number, string, boolean```) to reactive

**unref**
- Restore ref to raw

**toRef**
- Create object's property to ref
```
toRef(object, 'property')
```

**toRefs**
- Apply ```toRef``` to all properties

**isRef**
- True if ref

**customRef**
- Create user-defined ref
```
customRef(track, trigger) => get, set;
get(...) {
    //something
    track(...);
}
set(...) {
    //something
    trigger(...);
}
```

**shallowRef**
- Object only react when ```value``` is changed **ALL**

**triggerRef**
- Force to update ```shallowRef```

## localStorage
- Read or Write data from browser as **readonly**
- Data are saved as ```UTF-16 DOMString```
- Data aren't removed until explicitly deletion
- ```setItem(key:string, value: string) => void```
- ```getItem(key:string) => string | null```
- Use ```JSON.parse(string)``` or ```JSON.stringify(object)```
- To delete, ```localStorage.clear()``` for all key-value pairs and ```localStorage.removeItem(key:string)```

## use prefix
- ```use-``` is the convention for module name maid by ```composition API```

## main.js
- All modules imported in ```main.js```, can be used in all components

## Share data at same layer
```
-------TodoListMain--------------
|                                |
|  ------TodoListMenu---------   |
| |                           |  |
|  ---------------------------   |
|                                |
|  -----TodoList--------------   |
| |                           |  |
|  ---------------------------   |
|                                |
---------------------------------
```
- ```TodoListMenu``` filters data
- ```TodoList``` displays data
- To share data, ```TodoListMain``` provides data and ```TodoListMenu``` just give user's choice

## watch vs computed
- ```watch(()=>[watched_val, ...], (old, new) => something...)```
  - Use for running cb when values are changed
  - ```imperative```
- A watch source can only be a getter/effect function, a ```ref```, a ```reactive``` object, or an ```array of these types```.
- ```computed(some_method)```
  - Just use ```() => ref.value```
  - Use for running method when dependent values are changed
  - ```declarative```
- **Computed is recommended**
- ```computed``` can't watch first render, but watch can do with ```immediate:true```
- If variable is wrapped, ```computed``` just check wrapper is changed or not, regardless wrapped data
- 

## Component Name
- If name sets UpperCammelStyle, ```upper-camel-style``` is real component name
- Component name follows ```cabab-style```

## ```<script setup>```
- Vue3 RFC 40
- All defined variables can be used in template
- Internally, the code written in ```<script setup>``` is compiled as ```setup``` function

```
<script setup>
import Foo from './Foo.vue';
import {ref} from 'vue';

const count = ref(0);
const inc = () => count.value++;
</script>

<template>
    <Foo :count="count" @click="inc" />
</template>
```
Compiled to
```
import Foo from './Foo.vue';
import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);
        const inc = () => count.value++;
        return h(Foo, { count, onClick: inc, })
    }
}
```
- Vue compiler compiles ```<template>``` as ```render()```
- ```render``` function is implemented in ```setup```, all first-bindings in ```setup``` are exposed to ```<template>```
- ```name```, ```inheritAttrs```, ```plugin```, ```user-defined-options``` cannot set in ```<script setup>```
- To access properties in object, use ```unstructuring```
- To use ```emit```, use ```defineEmits``` function
```
const emit = defineEmits(['change-filter']);
emit('change-filter', filter);
```
- To use ```props```, use ```defineProps``` function
```
const props = defineProps({
    data: {
        type: Array,
        default: [],
    },
})
```
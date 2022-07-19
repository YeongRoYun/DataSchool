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
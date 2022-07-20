<template>
<label>Name: </label>
<input type="text" v-model="result.name" placeholder="name" /><br />
<label>Age: </label>
<input type="number" v-model="result.age" placeholer="age" /><br />
<label>Gender: </label>
<label>male</label>
<input type="radio" name="gender" v-model="result.gender" value="male" />
<label>female</label>
<input type="radio" name="gender" v-model="result.gender" value="female" />
<br />
<label>Hobby: </label>
<span v-for="hobby in hobby_options" :key="hobby">
  <label>{{hobby}}</label>
  <input type="checkbox" v-model="result.hobby" :value="hobby" />
</span><br />

<label>PW: </label>
<input type="password" v-model="result.password" /><br />
<label>Country: </label>
<select v-model="result.country">
  <option v-for="country in country_options" :key="country">
    {{ country }}
  </option>
</select> <br />
<label>Date: </label>
<input type="date" v-model="result.date" /><br />
<label>Time: </label>
<input type="time" v-model="result.time" /><br />
<label>Color: </label>
<input type="color" v-model="result.color" /><br />
<label>Range: </label>
<input type="range" v-model="result.range" /><br />
<div>
  <h3>Result</h3>
  <hr />
  {{result}}
</div>
</template>

<script>
  import { reactive } from "vue";

  export default {
    setup() {
      const name = '';
      const age = 0;
      const gender = 'male';
      const hobby = ['Sport'];
      const password = '';
      const country = 'Korea';
      const date = "1999-03-08";
      const time = "00:00";
      const color = "#000000";
      const range = "30";
      const country_options = ['Korea', 'USA', 'UK'];
      const hobby_options = ['Sport', 'Drawing', 'Music', 'Coding'];

      const result = reactive({
        name,
        age,
        gender,
        hobby,
        password,
        country,
        date,
        time,
        color,
        range,
      })
      return {
        result,
        country_options,
        hobby_options,
      };
    },
  }
</script>
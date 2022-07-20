<template>
  <CustomButton sm>My Button</CustomButton>
  <CustomButton>My Button</CustomButton>
  <CustomButton lg background-white>My Button</CustomButton>
  <CustomButton sm pill text-red background-black>My Button</CustomButton>
  <CustomButton md pill text-green background-pink>My Button</CustomButton>
  <CustomButton lg pill @click.prevent="onClick">My Button</CustomButton>
  <CustomButton lg pill type="switch" active="active">SWITCH</CustomButton>
</template>

<script>
import CustomButton from './components/CustomButton.vue'

export default {
  setup() {
    const onClick = (evt) => {alert('Clicked');}
    return { onClick };
  },
}
</script>
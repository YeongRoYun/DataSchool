<template>
<CustomTable :header="header" :rows="rows"></CustomTable>
</template>

<script>
export default {
  setup() {
    const header = ['Title1', 'Title2'];
    const rows = [
      [{data: '1-1'}, {data: '1-2'}],
      [{data: '2-1', colspan: 2}],
      [{data: '3-1', rowspan: 3}, {data: '3-2'}],
      [{data: '4-2'}],
      [{data: '5-2'}],
    ];
    return {header, rows};
  }
}
</script>
<template>
  <div>
    <Drawer :closable="false" width="90%" placement="left" v-model="value"> </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
  created() {
    this.$root.modalList = this;
  },
  destroyed() {
    delete this.$root.modalList;
  },
};
</script>

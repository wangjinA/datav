<template>
  <div class="moduleTitle" :style="styles">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "ModuleTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    type: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    styles() {
      let styles = [
        {
          minWidth: "250px",
          height: "43px",
          backgroundPosition: `left bottom`,
          backgroundImage: `url(${require("./images/bg1.png")})`,
          backgroundSize: `100% auto`,
        },
      ];
      let currentStyle = styles[this.type] || {};
      return {
        ...currentStyle,
      };
    },
  },
  created() {
    console.log(this);
  },
};
</script>

<style lang="less" scoped>
.moduleTitle {
  min-width: 150px;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  color: #9cf5ff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

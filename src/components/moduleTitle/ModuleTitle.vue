<template>
  <div class="moduleTitle" :class="`moduleTitle-${type}`" :style="styles">
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
        {
          minWidth: "250px",
          height: "43px",
          backgroundPosition: `left bottom`,
          backgroundImage:
            "linear-gradient(90deg, rgba(87, 202, 250, 0.46) 0%, rgba(2, 9, 20, 0.351) 52%)",
        },
      ];
      let currentStyle = styles[this.type] || {};
      return {
        ...currentStyle,
      };
    },
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
  padding-left: 0;
  transition: 0.2s;
  &-1 {
    padding-left: 15px;
    @keyframes bw100 {
      0% {
        right: 100%;
      }
      100% {
        right: 0;
      }
    }
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, rgba(87, 202, 250, 0.99483543) 0%, rgba(2, 9, 20, 0) 100%);
      animation: bw100 0.5s forwards 0.3s;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 10px solid #00b7ee;
      border-right: 10px solid transparent;
    }
  }
}
</style>

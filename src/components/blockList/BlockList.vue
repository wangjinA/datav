<template>
  <div class="blockList" :style="styles">
    <div v-for="(item, index) in list" :key="index">
      <label>{{ item.name }}</label>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockList",
  props: {
    list: {
      name: "列表",
      setupCodeType: "json",
      type: Array,
      default: () => [
        {
          name: "人口流入",
          value: 200,
        },
        {
          name: "人口流出",
          value: 200,
        },
        {
          name: "人口总数",
          value: 200,
        },
      ],
    },
    gap: {
      name: "间距",
      setupInputType: "number",
      type: [Number, String],
      default: 5,
    },
  },
  computed: {
    styles() {
      return {
        gap: this.gap + "px",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.blockList {
  display: grid;
  grid-template-columns: repeat(auto-fit, 105px);
  & > div {
    width: 105px;
    height: 100px;
    background-size: 100% 100%;
    background-image: url("./images/bg.png");
    color: #ffffff;
    text-align: center;
    padding-top: 20px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    & > label {
      font-size: 20px;
      font-weight: 400;
    }
    & > span {
      font-size: 30px;
      font-weight: 400;
      color: rgba(33, 223, 255, 1);
      font-family: LESLIE Regular, LESLIE Regular-Regular;
    }
  }
}
</style>

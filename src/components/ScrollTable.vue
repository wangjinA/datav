<!--
 * @Author: 汪锦
 * @Date: 2020-03-16 15:20:13
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-13 15:30:30
 * @Description: 滚动表格
 -->
<template>
  <div class="scrollTable" @mouseenter="hoverStop && Stop()" @mouseleave="hoverStop && Up()">
    <!-- 标题 -->
    <div
      class="scrollTable-title"
      v-if="showHeader"
      :style="{ height: headerLineHeight + company, fontSize: titleFontSize + company }"
    >
      <div class="title-item item-index" :style="padding3" v-if="showIndex">序号</div>
      <div
        class="title-item"
        v-for="item in columns"
        :key="item.title"
        :style="`flex: 0 0 ${item.width + company}; ${padding3}`"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- 内容 -->
    <div
      ref="scrollTableList"
      class="scrollTable-list yjcg-content-scrollbar"
      :class="{ overflowAuto: isOverflow }"
      :style="`height: ${lineHeight * showLength + spacing * (showLength - 1)}${company}`"
    >
      <div
        ref="scrollTableListBox"
        class="scrollTable-list-box"
        :style="
          animate &&
            `transition: .5s; transform:translate(0, ${-lineHeight * trunCount -
              spacing * trunCount}${company})`
        "
      >
        <div
          class="scrollTable-list-box-item"
          @click="$emit('select-item', item)"
          :style="{
            backgroundColor:
              columns.length > 1 || showIndex
                ? item.backgroundColor || 'rgba(28, 52, 79, 0.7)'
                : '',
            height: lineHeight + company,
            marginBottom: spacing + company,
            fontSize: listFontSize + company,
          }"
          v-for="item in list"
          :key="item.diyKey"
          :class="{ even: item.index % 2 != 1 }"
        >
          <div class="list-item item-index" v-if="showIndex" :style="padding3">
            {{ item.index }}
          </div>
          <div
            class="list-item"
            v-for="col in columns"
            :key="col.key"
            :style="`flex: 0 0 ${col.width + company}; ${padding3}`"
          >
            <div class="text-overflow" v-if="col.key">{{ item[col.key] }}</div>
            <slot :name="col.slot" v-if="col.slot" :item="item"></slot>
          </div>
        </div>
      </div>
      <div
        v-if="list.length == 0"
        class="scrollTable-list-box-item scrollNotData"
        :style="{ height: lineHeight + company }"
      >
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScrollTable",
  props: {
    // 表头数组 [{name: 表头名字, key: '表体属性名', slot: '插槽名称', title: '是否显示表体', width: '宽度'}]
    columns: {
      name: "配置",
      setupCodeType: "json",
      type: Array,
      default: () => [
        {
          title: "",
          slot: "list",
        },
      ],
    },
    // 表体数组
    data: {
      name: "数据列表",
      setupCodeType: "json",
      type: Array,
      default: () => [],
    },
    // 表体数组
    hoverStop: {
      name: "鼠标移入停止",
      setupType: "switch",
      type: Boolean,
      default: true,
    },
    // 单位，默认rem
    company: {
      type: String,
      default: "px",
    },
    // 是否显示index
    showIndex: {
      name: "序号",
      setupType: "switch",
      type: Boolean,
      default: false,
    },
    // 是否显示头部
    showHeader: {
      name: "头部显示",
      setupType: "switch",
      type: Boolean,
      default: true,
    },
    // 表头行高
    headerLineHeight: {
      name: "表头行高",
      setupInputType: "number",
      type: Number,
      default: 40,
    },
    // 表体行高
    lineHeight: {
      name: "表体行高",
      type: Number,
      default: 45,
    },
    // 时长
    duration: {
      name: "滚动间隔ms",
      setupInputType: "number",
      type: Number,
      default: 2000,
      min: 800,
    },
    // 每次滚动行数
    trunCount: {
      name: "滚动行数",
      setupInputType: "number",
      type: Number,
      default: 1,
    },
    showLength: {
      name: "显示行数",
      setupInputType: "number",
      type: Number,
      default: 4,
    },
    spacing: {
      name: "间距",
      setupInputType: "number",
      type: Number,
      default: 0.08,
    },
    titleFontSize: {
      name: "标题字体大小",
      setupInputType: "number",
      type: Number,
      default: 18,
    },
    listFontSize: {
      name: "列表字体大小",
      setupInputType: "number",
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      isOverflow: false,
      list: [],
      isOpenScroll: false,
      animate: false,
    };
  },
  watch: {
    data: {
      handler(val) {
        this.list = [
          ...val.map((item, index) => ({
            ...item,
            index: index + 1,
            diyKey: this.getRandomCount(),
          })),
        ];
        this.setOpenScroll();
      },
      deep: true,
      immediate: true,
    },
    isOpenScroll(val) {
      val ? this.Up() : this.clear();
    },

    trunCount: {
      handler: "ScrollUp",
    },
    spacing: {
      handler: "ScrollUp",
    },
    showLength: {
      handler: "ScrollUp",
    },
    duration: {
      handler: "ScrollUp",
    },
    lineHeight: {
      handler: "ScrollUp",
    },
  },
  methods: {
    setOpenScroll() {
      // 判断 内容 > 容器，则开启滚动
      this.$nextTick(() => {
        this.isOpenScroll =
          this.$refs.scrollTableListBox.offsetHeight > this.$refs.scrollTableList.offsetHeight;
      });
    },
    fontSize(num) {
      return num * 100;
    },
    getRandomCount(n = 18) {
      let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let res = "";
      for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    },
    ScrollUp() {
      if (this.list.length != 0) {
        this.clear();
        this.intNum = setInterval(() => {
          this.animate = true; // 向上滚动的时候需要添加css3过渡动画
          this.timeOutNum = setTimeout(() => {
            this.list.push(
              ...this.list.splice(0, this.trunCount).map((item) => ({
                ...item,
                diyKey: this.getRandomCount(),
              }))
            );
            this.animate = false;
          }, 500);
        }, this.duration);
      }
    },
    //鼠标移上去停止
    Stop() {
      if (!this.isOpenScroll) return;
      this.isOverflow = true;
      this.clear();
    },
    Up() {
      if (!this.isOpenScroll) return;
      this.isOverflow = false;
      this.ScrollUp();
    },
    clear() {
      clearInterval(this.intNum);
      clearTimeout(this.timeOutNum);
    },
    onVisibilityChange() {
      if (!document[this.hiddenProperty]) {
        console.log(this);
        console.log("页面激活");
        this.Up();
      } else {
        console.log("页面非激活");
        this.Stop();
        this.clear();
      }
    },
  },
  computed: {
    padding3() {
      if (this.columns.length > 1 || this.showIndex) {
        return "padding: 0 3%;";
      }
      return "";
    },
  },
  destroyed() {
    this.clear();
    document.removeEventListener(this.visibilityChangeEvent, this.onVisibilityChange);
  },
  created() {
    this.hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
        ? "webkitHidden"
        : "mozHidden" in document
        ? "mozHidden"
        : null;
    this.visibilityChangeEvent = this.hiddenProperty.replace(/hidden/i, "visibilitychange");
    document.addEventListener(this.visibilityChangeEvent, this.onVisibilityChange);
  },
};
</script>
<style lang="less" scoped>
.item-index {
  flex: none;
  max-width: 2.5em;
  box-sizing: content-box;
}
.scrollTable {
  color: #fff;
  width: 100%;
  &-title {
    // background-color: rgba(47, 116, 136, 0.5);
    // background:rgba(255,255,255,.24);
    background-color: #556c85;
    width: 100%;
    display: flex;
    align-items: center;
    font-family: "Microsoft YaHei Bold";
    // font-weight: 700;
    position: relative;
    .title-item {
      flex: 1;
      // &:nth-child(3) {
      //   flex: none;
      //   width: 0.8px;
      //   padding: 0;
      // }
    }
  }
  &-list {
    // margin-top: 0.14rem;
    overflow: hidden;
    position: relative;
    &-box {
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: rgba(112, 251, 253, 0.1);
        // background-color: #203D5E;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        .list-item {
          overflow: hidden;
          flex: 1;
          .scrollTable-tooltip {
            // .text-overflow1(1)
          }
          &.item-index {
            font-family: "DIN-Bold";
          }
          /deep/ i {
            font-family: "DIN-Medium";
            font-style: normal;
          }
        }
        // &.even {
        //   background: linear-gradient(
        //     0deg,
        //     rgba(66, 157, 187, 0.42620798319327735) 0%,
        //     rgba(66, 157, 187, 1) 100%
        //   );
        // }
      }
    }
    &::-webkit-scrollbar {
      /* Y滚动条宽度 */
      width: 0px;
      height: 0px;
    }
  }
  .overflowAuto {
    overflow: hidden auto !important;
  }
  // .anim {
  //   transition: all 0.5s;
  //   margin-top: -0.225px; //高度等于行高
  // }
}
</style>

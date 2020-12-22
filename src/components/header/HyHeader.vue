<template>
  <div class="st-header" :class="{ flexCenter: showGuang }" :style="{ ...styles, color }">
    <div class="st-header-menu" v-if="type == 0">
      <img src="./images/menu-icon.png" />
      <ul class="st-header-menuList">
        <li v-for="(item, index) in navList" :key="index" @click="navHandler(item)">
          <!-- :class="$route.path == item.path && 'active'" -->
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="st-header-title" :style="styles.titleStyle">
      {{ title }}
    </div>
    <transition appear name="showScale">
      <ul class="st-header-nav" v-if="type == 2">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="$route.path == item.path && 'active'"
          @click="navHandler(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
    <transition appear name="showScale">
      <div class="current-date" v-if="type == 2">{{ currentDate }}</div>
    </transition>
    <img class="guang" v-if="showGuang" src="./images/guang.png" />
  </div>
</template>

<script>
import { getDateTimeFormat } from "@/lib/utils";
export default {
  name: "HyHeader",
  props: {
    color: {
      type: String,
      default: "#fff",
    },
    title: {
      type: String,
      default: "汕头市应急管理综合应用平台",
    },
    type: {
      type: [Number, String],
      default: 0,
      setupType: "select",
      data: [
        {
          name: "默认",
          value: 0,
        },
        {
          name: "风格2",
          value: 1,
        },
        {
          name: "风格3",
          value: 2,
        },
      ],
    },
  },
  data() {
    return {
      navList: [
        // {
        //   name: '汛旱风概览',
        //   path: '/'
        // },
        {
          name: "汛旱风监测",
          path: "/windWatch",
        },
        {
          name: "信息管理",
          path: "/infoManage",
        },
        // {
        //   name: '统一门户',
        //   path: '/portal'
        // }
      ],
      currentDate: "",
    };
  },
  computed: {
    styles() {
      let styles = [
        {
          backgroundImage: `url(${require("./images/header.png")})`,
          "--height": "77px",
          titleStyle: {
            paddingTop: "7px",
          },
        },
        {
          backgroundImage: `url(${require("./images/header-1.png")})`,
          "--height": "97px",
          titleStyle: {
            paddingTop: "10px",
          },
        },
        {
          backgroundImage: `url(${require("./images/header-2.png")})`,
          "--height": "77px",
          titleStyle: {
            paddingTop: "10px",
            fontSize: "34px",
          },
        },
      ];
      return styles[this.type];
    },
    showGuang() {
      return [0, 1].some((type) => this.type == type);
    },
  },
  methods: {
    navHandler(item) {
      this.$router.push(item.path);
    },
    setCurrentDate() {
      this.currentDate = getDateTimeFormat(Date.now(), "yyyy.MM.dd hh:mm:ss");
    },
  },
  created() {
    this.timer = setInterval(() => {
      this.setCurrentDate();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
// 背景图设置
.bg-style(@url) {
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(@url);
}
// hover效果
.hover {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.st-header {
  height: var(--height);
  padding: 0 30px;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  transition: 0.2s;
  display: flex;
  position: relative;
  &.flexCenter {
    justify-content: center;
  }
  &-menuList {
    .bg-style("./images/menu-bg.png");
    width: 137px;
    position: absolute;
    left: 0;
    top: 40px;
    font-size: 18px;
    padding: 6px 8px;
    display: none;
    > li {
      height: 40px;
      line-height: 40px;
      padding: 0 7px;
      &:hover,
      &.active {
        cursor: pointer;
        color: #8bedff;
      }
      & + li {
        border-top: 1px solid rgba(139, 238, 255, 0.5);
      }
    }
  }

  &-nav {
    height: 63px;
    font-size: 22px;
    margin-left: 150px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > li {
      margin: 0 25px;
      padding: 5px 0;
      border-bottom: 2px solid transparent;
      color: rgba(255, 255, 255, 0.6);
      &:hover,
      &.active {
        cursor: pointer;
        color: #fff;

        border-color: #8ae9ee;
      }
    }
  }
  &-menu {
    position: absolute;
    left: 15px;
    top: 30px;
    padding: 10px;
    padding-right: 30px;
    &:hover {
      @keyframes showMenu {
        0% {
          transform: scaleY(0);
          opacity: 0.3;
        }
        100% {
          transform: scaleY(100%);
          opacity: 1;
        }
      }
      .st-header-menuList {
        transform-origin: top;
        display: block;
        animation: showMenu 0.3s;
      }
    }
    > img {
      cursor: pointer;
    }
  }
  &-title {
    font-size: 38px;
    font-family: "ShiShangZhongHeiJianTi";
    display: flex;
    justify-content: center;
    position: relative;
    transition: 0.2s;
    .hover();
  }
  & > img.guang {
    position: absolute;
    bottom: -93%;
    user-select: none;
    pointer-events: none;
  }

  .current-date {
    flex-shrink: 0;
    font-size: 22px;
    color: rgba(138, 234, 238, 1);
    height: var(--header-height-min);
    line-height: var(--header-height-min);
    margin-left: auto;
    margin-right: 32px;
    letter-spacing: 3px;
    height: 63px;
    line-height: 63px;
    user-select: none;
    font-family: "DIN-Regular";
  }
}
</style>

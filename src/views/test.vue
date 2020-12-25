<template>
  <div id="test" v-draggable>
    <div style="position: relation;z-index:1;">
      <Loading />
      <img width="200" src="@/assets/lizi.png" />
      <div>测试柜</div>
      <small>
        测试柜
        <small>测试柜</small>
      </small>
      <Line-module></Line-module>
      <transition name="test" appear>
        <ModuleTitle :key="k" title="模块标题文案"></ModuleTitle>
      </transition>
    </div>
    <button v-for="i in 3" :key="i" v-debounce="debounceClick">防抖</button>
    <div style="width: 500px;">
      <CodeEditor />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";
import ModuleTitle from "@/components/moduleTitle";
import CodeEditor from "@/layout/setup/CodeEditor";
const draggable = {
  inserted: function(el) {
    el.style.cursor = "move";
    el.onmousedown = function(e) {
      let disx = e.pageX - el.offsetLeft;
      let disy = e.pageY - el.offsetTop;
      document.onmousemove = function(e) {
        let x = e.pageX - disx;
        let y = e.pageY - disy;
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width);
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height);
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }

        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};
export default {
  components: {
    Loading,
    LineModule,
    ModuleTitle,
    CodeEditor,
  },
  data() {
    return {
      k: 1,
      code: "",
      list: [
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
    };
  },
  methods: {
    debounceClick() {
      console.log("只触发一次");
    },

    jjlayer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // 原先代码
      }, 1000);
    },
  },
  directives: {
    draggable,
    debounce: {
      inserted(el, binding) {
        let timer;
        el.addEventListener("click", () => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            binding.value();
          }, 1000);
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
#test {
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.test-leave-to,
.test-enter {
  transform: scale(0);
}
.test-leave,
.test-enter-to {
  transform: scale(1);
}
.test-leave-active,
.test-enter-active {
  transition: 0.3s;
}
.test-move {
  position: absolute;
}
</style>

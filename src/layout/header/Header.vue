<template>
  <header>
    <nav>
      <div
        v-for="item in navList"
        :key="item.name"
        :class="{ active: $store.state.currentTitleName === item.name }"
        @click="$store.commit('setCurrentTitleName', item.name)"
      >
        {{ item.name }}
      </div>
    </nav>
    <ul class="login-box">
      <li class="admin-link" @click="$router.push('/admin')">后台管理</li>
      <li class="user-name">
        <Icon type="md-person" />
        <span>欢迎您, {{ $store.state.login.userInfo.username }}</span>
      </li>
      <li class="login-out" @click="loginOut">退出登录</li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "DHeader",
  components: {},
  data() {
    return {
      navList: [
        {
          name: "数据大屏",
        },
        {
          name: "背景管理",
        },
      ],
    };
  },
  methods: {
    loginOut() {
      this.$store.dispatch("login/loginOut");
    },
  },
};
</script>

<style lang="less" scoped>
.project-name {
  width: 150px;
}
header {
  --height: 55px;
  height: var(--height);
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: #fff;
  background: var(--background);
  transition: all linear 0.3s;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  > nav {
    display: flex;
    padding-left: 200px;
    > div {
      width: 85px;
      height: var(--height);
      line-height: var(--height);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: 0.2s;
      color: #bfbfbf;
      &::after {
        content: "";
        width: 0%;
        height: 3px;
        background-color: var(--primary-color);
        position: absolute;
        bottom: 0;
        opacity: 0.2;
        border-radius: 10px;
        transition: 0.2s;
      }
      &.active,
      &:hover {
        background: var(--background-hover);
        color: #fff;
        cursor: pointer;
        &::after {
          border-radius: 0;
          opacity: 1;
          width: 100%;
        }
      }
    }
  }
  > .login-box {
    display: flex;
    margin-left: auto;
    margin-right: 20px;
    .admin-link {
      &:hover {
        color: var(--info-color);
        cursor: pointer;
      }
    }
    > li {
      margin-right: 20px;
      cursor: pointer;
    }
    .user-name {
      color: var(--info-color);
    }
    .login-out {
      &:hover {
        color: var(--warning-color);
      }
    }
  }
}
</style>

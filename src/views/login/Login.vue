<!--
 * @Author: 汪锦
 * @Date: 2021-01-11 10:42:07
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-12 15:29:38
 * @Description: 登录页
-->

<template>
  <div class="login-page">
    <!-- 头部 -->
    <section class="header-com">
      <div class="header-icon">DATAV</div>
      <div class="header-text">数据可视化</div>
    </section>
    <section class="login-contain">
      <div class="login-form">
        <div class="login-tips">datav</div>
        <Form ref="userInfo" :model="userInfo" :rules="ruleUserInfo">
          <FormItem v-for="(item, index) in formData" :key="index" :prop="item.prop">
            <Input
              :type="item.type"
              :prefix="item.icon"
              :placeholder="item.name"
              v-model="userInfo[item.value]"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('userInfo')">登录</Button>
          </FormItem>
        </Form>
      </div>
      <!-- 底部两个角 -->
      <div class="login-footer"></div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "loginPage",
  data() {
    return {
      img: require("./images/login2.png"),
      userInfo: {
        username: "", //用户名
        password: "", //密码
      },
      ruleUserInfo: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      }, //表单校验规则
      formData: [
        {
          type: "text",
          name: "用户名",
          value: "username", //v-model的值
          prop: "username", //表单校验的字段
          icon: "md-person", //字符图像
        },
        {
          type: "password",
          name: "密码",
          value: "password",
          prop: "password",
          icon: "ios-lock ",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("login", ["setUserInfo"]),

    /**表单验证 */
    handleSubmit(refName) {
      console.log("登录", this.userInfo);
      this.$refs[refName].validate((val) => {
        if (val) {
          console.log(val);
          this.$post("/api/login", this.userInfo, true).then((res) => {
            const { token, userInfo } = res.data;
            window.sessionStorage.setItem("token", token);
            this.$router.push("/workspace");
            this.setUserInfo(userInfo);
            window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-com {
  display: flex;
  padding: 32px;
  align-items: center;
  .header-icon {
    font-size: 32px;
    border-right: 0.01rem solid;
    padding-right: 19px;
  }
  .header-text {
    font-size: 24px;
    padding-left: 25px;
    letter-spacing: 1.5px;
  }
}
.fonrget-container {
  display: flex;
  align-items: center;
}
//修改iview的默认样式
/deep/ .login-form .ivu-input {
  background-color: #fff0;
  border: 0.03rem solid #24d6de47;
  color: #ffffffbf;
  height: 2.3rem;
  &:focus {
    box-shadow: none;
    border: 0.03rem solid #24d6dea6;
  }
}
/deep/ .login-form .ivu-btn-primary {
  color: #fff;
  border-color: #00affc;
  width: 100%;
  height: 35px;
  margin-top: 35px;
  background: linear-gradient(to bottom, #00affcf0, #00affc4d);
}

.login-page {
  color: #fff;
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("./images/login2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  .login-contain {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 368px;
    height: 336px;
    border: 1px solid #28acea4a;
    background: linear-gradient(-45deg, rgb(20 24 75), #0d317c42);
    left: 0;
    top: 0;
    &::after {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 28px;
      height: 28px;
      content: "";
      background: url("./images/leftTop.png");
      background-size: 100% 100%;
    }
    &::before {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 28px;
      height: 28px;
      content: "";
      background: url("./images/leftTop.png");
      background-size: cover;
      transform: rotateY(180deg);
    }
  }
  .login-form {
    margin: 0 auto;
    text-align: center;
    padding: 0 40px;
  }
  .login-tips {
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    text-align: center;
    margin: 1.3rem;
  }
}
// 底部登录
.login-footer {
  width: 100%;
  height: 30px;
  background: transparent;
  position: absolute;
  bottom: -1.5px;
  &::after {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 28px;
    height: 28px;
    content: "";
    background: url("./images/leftTop.png");
    background-size: 100% 100%;
    transform: rotateX(180deg);
  }
  &::before {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 28px;
    height: 28px;
    content: "";
    background: url("./images/leftTop.png");
    background-size: cover;
    transform: rotateY(180deg) rotateX(180deg);
  }
}
</style>

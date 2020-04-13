<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- <div id="upload"> -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            type="text"
            id="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            type="text"
            id="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="3"
            maxlength="20"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'regist'"
        >
          <label for="passwords">重复密码</label>
          <el-input
            type="text"
            id="passwords"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col> -->

        <!-- <el-col :span="8">
              <el-button
                type="success"
                class="block"
                :disabled="codeButtonStatus.status"
                @click="getSms"
                >{{ codeButtonStatus.txt }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item> -->

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import sha1 from "js-sha1";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { Register } from "../../api/login.js";
import {
  stripscript,
  validateEmail
  // validatePass,
  // validateCodes
} from "../../utils/validate.js";

export default {
  name: "login",

  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    //这里面放data数据、生命周期、自定义的数据

    //验证邮箱
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      // console.log(stripscript(value));
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      }
      //  else if (validatePass(value)) {
      //   callback(
      //     new Error("请输入至少6位包含1个大写字母，1个小写字母和1个数字!")
      //   );
      // }
      else {
        callback();
        loginButtonStatus.value = false;
      }
    };

    //验证再次输入密码
    let validatePasswords = (rule, value, callback) => {
      //用V-SHOW需要判断是登录还是注册，如果是login则直接通过 用if则不需要
      if (model.value === "login") {
        callback();
      }
      // console.log(stripscript(value));
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不相同！"));
      } else {
        callback();
      }
    };
    //验证验证码
    // let checkCode = (rule, value, callback) => {
    //   // console.log("1" + value);
    //   ruleForm.code = stripscript(value);
    //   value = ruleForm.code;
    //   console.log(value);
    //   if (value === "") {
    //     return callback(new Error("验证码不能为空"));
    //   } else if (validateCodes(value)) {
    //     return callback(new Error("验证码格式不正确"));
    //   } else {
    //     callback();
    //   }
    // };

    /**
     *声明数据
     */

    //reactive 放置  类 对象型数据
    const menuTab = reactive([
      { txt: "登录", current: false, type: "login" },
      { txt: "注册", current: false, type: "regist" }
    ]);
    // console.log(menuTab);

    const codeButtonStatus = reactive({
      status: false,
      txt: "获取验证码"
    });

    //模块值 ref放置  基础  数据类型
    const model = ref("login");

    //登录按钮禁用状态
    const loginButtonStatus = ref(true);

    //验证码按钮状态
    // const codeButtonStatus = ref(false);

    //倒计时
    const timer = ref(null);

    // console.log(model.value);
    //表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }]
      // code: [{ validator: checkCode, trigger: "blur" }]
    });

    /**
     *声明函数
     */

    const toggleMenu = item => {
      // console.log(item.type);
      menuTab.forEach(element => {
        element.current = false;
      });
      item.current = true;
      model.value = item.type;

      //重置表单
      context.refs.ruleForm.resetFields();
      clearCountDown();
    };

    //倒计时
    const countDown = number => {
      //判断是否存在定时器，有则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        number--;
        // console.log(number);
        if (number === 0) {
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.txt = "再次获取";
        } else {
          codeButtonStatus.txt = "倒计时" + number + "秒";
        }
      }, 1000);
    };

    //清空倒计时
    const clearCountDown = () => {
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
      clearInterval(timer.value);
    };

    //获取验证码
    // const getSms = () => {
    //   //请求接口之前要判断邮箱是否为空 格式是否正确
    //   if (ruleForm.username == "") {
    //     context.root.$message({
    //       showClose: true,
    //       message: "邮箱不能为空！！！",
    //       type: "error"
    //     });
    //     return false;
    //   }

    //   if (validateEmail(ruleForm.username)) {
    //     context.root.$message({
    //       showClose: true,
    //       message: "邮箱格式有误！！！",
    //       type: "error"
    //     });
    //     return false;
    //   }

    //   // codeButtonStatus.value = true;
    //   codeButtonStatus.status = true;
    //   codeButtonStatus.txt = "发送中";

    //   let requestdata = {
    //     username: ruleForm.username,
    //     module: model.value
    //   };
    //   //调用定时器 倒计时
    //   setTimeout(() => {
    //     //请求接口 获取验证码;
    //     GetSms(requestdata)
    //       .then(response => {
    //         let data = response.data;

    //         console.log(data);

    //         context.root.$message({
    //           showClose: true,
    //           message: data.message,
    //           type: "success"
    //         });
    //         //d登录注册按钮状态改变
    //         loginButtonStatus.value = false;
    //         //调用定时器，倒计时
    //         countDown(60);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }, 3000);
    // };

    //登录
    const login = () => {
      let requsetdata = {
        username: ruleForm.username,
        // password: sha1(ruleForm.password)
        password: ruleForm.password
        // code: ruleForm.code
      };
      context.root.$store
        .dispatch("app/login", requsetdata)
        .then(response => {
          let data = response.data;

          context.root.$message({
            showClose: true,
            message: data.msg,
            type: "success"
          });
          console.log(11111111111111111111111111111111111111111111111111);
          //成功后返回登录页面
          // toggleMenu(menuTab[0]);
          // clearCountDown();
          //页面跳转
          context.root.$router.push({
            // name: "console"
            path: "/console/index"
          });
          console.log("response:" + response);
        })
        .catch(error => {
          console.log("error:" + error);
        });
    };
    //注册接口
    const register = () => {
      let requsetdata = {
        username: ruleForm.username,
        // password: sha1(ruleForm.password),
        password: ruleForm.password

        // code: ruleForm.code,
        // module: "register"
      };
      //注册接口
      Register(requsetdata)
        .then(response => {
          let data = response.data;
          context.root.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });
          //成功后返回登录页面
          toggleMenu(menuTab[0]);
          clearCountDown();
          console.log("response:" + response);
        })
        .catch(error => {
          console.log("error:" + error);
        });
    };

    //提交登录或注册
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        console.log(ruleForm.code);
        if (valid) {
          if (model.value === "login") {
            login();
          } else {
            register();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**
     *生命周期
     */

    //挂载完成后
    onMounted(() => {});

    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMenu,
      countDown,
      clearCountDown,
      // getSms,
      login,
      register,
      submitForm
    };
  }
};
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
#login {
  height: 100%;
  // background-color: rgb(224, 4, 4);
}

.login-wrap {
  width: 370px;
  // margin: auto;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  padding: 10px 35px 25px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background-color: white;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: black;
    border-radius: 2px;
    cursor: pointer;
  }
}

.current {
  background-color: rgba($color: #000000, $alpha: 0.1);
}

.el-form {
  margin: auto;
  // width: 20%;
}

.login-form {
  label {
    display: block;
    font-size: 14px;
    color: black;
  }
}
.item-form {
  margin-bottom: 20px;
}
.block {
  display: block;
  width: 100%;
}
</style>

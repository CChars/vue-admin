<template>
  <div id="login">
    <div id="login-wrap">
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
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'regist'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>

            <el-col :span="8">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="block"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateCodes
} from "@/utils/validate.js";

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
      } else if (validatePass(value)) {
        callback(
          new Error("请输入至少6位包含1个大写字母，1个小写字母和1个数字!")
        );
      } else {
        callback();
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
    let checkCode = (rule, value, callback) => {
      // console.log("1" + value);
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      // console.log(value);
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateCodes(value)) {
        return callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };

    /**
     *声明数据
     */

    //reactive 放置  类 对象型数据
    const menuTab = reactive([
      { txt: "登录", current: false, type: "login" },
      { txt: "注册", current: false, type: "regist" }
    ]);
    console.log(menuTab);

    //模块值 ref放置  基础  数据类型
    const model = ref("login");
    console.log(model.value);
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
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
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
    };

    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
      ruleForm,
      rules,
      toggleMenu,
      submitForm
    };
  }
};
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: burlywood;
}

.login-wrap {
  width: 50%;
  margin: auto;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
}

.current {
  background-color: rgba($color: #000000, $alpha: 0.1);
}

.el-form {
  margin: auto;
  width: 20%;
}

.login-form {
  label {
    display: block;
    font-size: 14px;
    color: white;
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

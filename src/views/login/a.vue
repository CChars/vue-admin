<template>
  <div id="login">
    <div id="login-wrap">
      <!-- <div id="upload"> -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
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
import { axios } from "axios";

export default {
  name: "login",

  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    const submitForm = formName => {
      // alert("hhhh");
      axios
        .get("/user?ID=12345")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return {
      submitForm
    };
  }
};
</script>

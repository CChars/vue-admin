<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size: 18px;" class="el-icon-printer">打印申请</span>
      <el-button style="float: right; padding: 3px 0" type="text"
        >操作按钮</el-button
      >
    </div>

    <div class="text item">
      <el-row :gutter="20">
        <el-col
          :span="4"
          v-for="(apply, index) in applies.apply"
          :key="apply.printAuthorizationId"
          class="apply"
        >
          <el-card :body-style="{ padding: '5px' }" shadow="hover">
            <div style="padding: 14px;">
              <div class="apply-height">
                <span class="el-icon-notebook-1">项目名称：</span>

                <span class="color" v-if="apply.project">{{
                  apply.project.projectName
                }}</span>
              </div>

              <div class="apply-height">
                <span class="el-icon-user">申请人：</span>

                <span class="color" v-if="apply.singleUser">{{
                  apply.singleUser.account
                }}</span>
              </div>

              <div class="bottom clearfix, apply-height">
                <el-switch
                  v-model="values.value[index]"
                  active-text="同意申请"
                  inactive-text="拒绝申请"
                  active-value="1"
                  inactive-value="0"
                  @change="
                    getPower(
                      apply.printAuthorizationId,
                      values.value[index],
                      index
                    )
                  "
                >
                </el-switch>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { ref, onMounted, reactive } from "@vue/composition-api";

import {
  getAllApplyRequest,
  updateApplyRequest,
  refuseApplyRequest
} from "../../api/exportApplicaation.js";
export default {
  setup(props, { root }) {
    const value = ref("1");

    //用来存储每一个switch的状态
    const values = reactive({
      value: []
    });

    //存储后台的每个申请
    const applies = reactive({
      apply: []
    });

    const getPower = (printAuthorizationId, value, index) => {
      console.log(printAuthorizationId);
      if (value === "1") {
        console.log("可以同意了");
        console.log(value);
        setApply(printAuthorizationId, index);
      } else {
        console.log("不同意");
        console.log(value);
        refuseApply(printAuthorizationId, index);
      }
    };

    const setApply = (printAuthorizationId, index) => {
      updateApplyRequest(printAuthorizationId)
        .then(Response => {
          console.log("response");
          console.log(Response);

          const msg = Response.data.msg;

          if (Response.data.status == 200) {
            root.$notify({
              title: "成功",
              message: msg,
              type: "success"
            });
          } else {
            root.$notify.error({
              title: "错误",
              message: msg
            });
            values.value[index] = "0";
          }
        })
        .catch(error => {
          console.log(error);

          root.$notify.error({
            title: "错误",
            message: "申请失败"
          });
          values.value[index] = "0";
        });
    };

    //拒绝打印申请
    const refuseApply = (printAuthorizationId, index) => {
      refuseApplyRequest(printAuthorizationId)
        .then(Response => {
          console.log("response");
          console.log(Response);

          const msg = Response.data.msg;

          if (Response.data.status == 200) {
            root.$notify({
              title: "成功",
              message: msg,
              type: "success"
            });
          } else {
            root.$notify.error({
              title: "错误",
              message: msg
            });
            values.value[index] = "1";
          }
        })
        .catch(error => {
          console.log(error);

          root.$notify.error({
            title: "错误",
            message: "设置失败"
          });
          values.value[index] = "1";
          console.log("values.value");
          console.log(values.value);
        });
    };

    //向后台请求所有的打印申请
    const getAllApply = () => {
      getAllApplyRequest()
        .then(Response => {
          console.log("response");
          console.log(Response);
          let data = Response.data;
          applies.apply = data;

          data.forEach(apply => {
            //如果已经授权过了 则为1
            if (apply.pringtAuthorization == 1) {
              values.value.push("1");
            } else {
              //如果没有授权过了 则为0
              values.value.push("0");
            }
          });
          console.log("response");
          console.log(values.value);
          console.log("applies.apply");
          console.log(applies.apply);
        })
        .catch(error => {
          console.log(error);
        });
    };

    onMounted(() => {
      getAllApply();
    });
    return {
      value,
      values,
      applies,
      getPower,
      getAllApply
    };
  }
};
</script>

<style lang="scss" scoped>
.el-icon-printer {
  padding-right: 15px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.apply {
  padding-top: 10px;
}
.apply-height {
  padding: 10px;
}
</style>

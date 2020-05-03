<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-page-header
        @back="goBack"
        content="详情页面"
        style="margin-bottom: 15px;"
      ></el-page-header>

      <span> 以下为项目</span>
      <span class="color" v-if="projectName">{{ projectName }}</span>
      <span>中建筑的详细数据</span>
    </div>

    <!-- <div class="building" v-loading="loading">
      <el-form
        :model="ruleForm"
        :disabled="true"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑名称">
              <el-input v-model="ruleForm.item.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="建筑地址">
              <el-input v-model="ruleForm.item.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑状态">
              <el-input v-model="ruleForm.item.satte"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="危险程度">
              <el-input v-model="ruleForm.item.danger"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="建筑长度">
              <el-input v-model="ruleForm.item.length"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="建筑宽度">
              <el-input v-model="ruleForm.item.width"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="建筑高度">
              <el-input v-model="ruleForm.item.height"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="经度">
              <el-input v-model="ruleForm.item.longitude"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="纬度">
              <el-input v-model="ruleForm.item.latitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="建筑照片" prop="photo">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
    </div> -->

    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      class="build-collapse"
    >
      <el-collapse-item name="1">
        <template slot="title">
          建筑信息<i class="header-icon el-icon-info"></i>
        </template>
        <el-row>
          <el-col
            :span="8"
            class="build-collapse"
            v-for="(build, index) in Project.buildList"
            :key="build.buildId"
            :offset="index >= 0 ? 2 : 0"
          >
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <el-image :src="build.pictures[0].pictureUrl" class="image">
              </el-image>
              <div style="padding: 14px;">
                <span>{{ build.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button
                    type="text"
                    class="button"
                    @click="getBuildDetail(build)"
                    >查看详情</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div
          v-if="Project.buildList[0] && Project.buildList[0].project.tag === 1"
        >
          <el-row
            class="button111"
            v-if="application.info && application.info.pringtAuthorization"
          >
            <el-button
              type="primary"
              round
              @click="print(Project.buildList[0].project.projectId)"
              >打印项目信息</el-button
            >
          </el-row>

          <el-row
            class="button111"
            v-if="application.info && application.info.pringtAuthorization != 1"
          >
            <el-button type="primary" round disabled>申请正在审核中</el-button>
          </el-row>

          <el-row class="button111" v-if="!application.info">
            <el-button
              type="primary"
              round
              @click="applyPrint(Project.buildList[0].project.projectId)"
              >申请项目打印</el-button
            >
          </el-row>
        </div>
        <div v-if="Project.buildList.length == 0">
          <span>该项目还未开始检测或正在进行检测请耐心等待</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- dialog弹窗 -->
    <BuildInfoDrawer :flag.sync="build_info" @close="closeBuildInfo" />
  </el-card>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";

import { GetBuild, GetOneProject } from "../../api/project.js";

import BuildInfoDrawer from "./dialog/buildInfo.vue";

import {
  getApplyRequest,
  postApplyRequest
} from "../../api/exportApplicaation.js";

export default {
  components: { BuildInfoDrawer },

  setup(props, { refs, root }) {
    //路由
    const project_id = root.$route.params.project_id;

    const projectName = ref("");
    const activeNames = ref("first");

    const loading = ref(true);
    console.log(project_id);

    const application = reactive({
      info: []
    });

    //  申请时向后台发送的模板
    const applyInfo = reactive({
      projectId: "",
      userId: "",
      pringtAuthorization: ""
    });

    //存储根据projrctId查询返回的bui的list
    const Project = reactive({
      buildList: []
    });

    //右侧的建筑信息弹出抽屉
    const build_info = reactive({
      dialog_states: false,
      build_index: "",
      build: ""
    });
    const closeBuildInfo = () => {
      build_info.dialog_states = false;
      build_info.build_index = "";
      console.log("aaaaaaaa");
    };
    //点击查看建筑信息详情
    const getBuildDetail = build => {
      build_info.dialog_states = true;
      build_info.build_index = 1;
      build_info.build = build;
      // console.log(build);
    };

    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const goBack = () => {
      root.$router.go(-1); //返回上一层
    };

    const getBuild = project_id => {
      GetBuild(project_id)
        .then(Response => {
          let data = Response.data;
          console.log("这里是data");
          console.log(data);
          Project.buildList = data;
          // let project = data.project;
          // projectName.value = data[0].project.projectName;
          loading.value = false;
          console.log(Response);
          // console.log(project);
        })
        .catch(error => {
          console.log(error);
        });
    };
    const getProject = project_id => {
      GetOneProject(project_id)
        .then(Response => {
          let data = Response.data;
          console.log("这里是dProject");
          console.log(data);
          // let project = data.project;
          projectName.value = data.projectName;
          // loading.value = false;
          console.log(Response);
          // console.log(project);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const ruleForm = reactive({
      item: []
    });
    const currentDate = new Date();
    // const handleChange = val => {
    //   console.log("val");
    //   console.log(val);
    // };
    //点击折叠面板的时候 向后台请求该项目的授权信息
    const handleChange = () => {
      console.log("handleChange");
      console.log(project_id);
      applyRequest(project_id);
    };

    const applyRequest = projectId => {
      getApplyRequest(projectId)
        .then(Response => {
          console.log(Response);

          //将查询出来的授权信息赋给 application 如果没有被授权则为空
          application.info = Response.data;
        })
        .catch(error => {
          console.log(error);
        });
    };

    const print = projectId => {
      console.log("打印按钮");
      console.log(projectId);
      window.open("/info/project/export/?projectId=" + projectId);
    };

    //申请打印请求
    const applyPrint = projectId => {
      console.log(projectId);
      applyInfo.projectId = projectId;
      postApplyRequest(applyInfo)
        .then(Response => {
          console.log(Response);
          const msg = Response.data.msg;

          if (Response.data.status == 200) {
            root.$notify({
              title: "成功",
              message: msg,
              type: "success"
            });
            application.info = {
              pringtAuthorization: null,
              printAuthorizationId: "",
              projectId: "",
              userId: ""
            };
          } else {
            root.$notify.error({
              title: "错误",
              message: msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          root.$notify.error({
            title: "错误",
            message: "申请失败"
          });
        });
    };

    onMounted(() => {
      // console.log("jjjj");
      // let projectId = { projectId: parseInt(project_id) };
      console.log(project_id);
      getBuild(project_id);
      getProject(project_id);
    });
    return {
      project_id,
      activeNames,
      Project,
      build_info,
      application,
      applyInfo,
      closeBuildInfo,
      getBuildDetail,
      loading,
      submitForm,
      goBack,
      dialogImageUrl,
      dialogVisible,
      ruleForm,
      handleChange,
      currentDate,
      print,
      applyPrint,
      projectName
    };
  }
};
</script>

<style lang="scss" scoped>
.color {
  // color: blue;
  font-weight: 700;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// .project {
//   border-bottom: 2px solid rgb(185, 182, 182);
//   // border-bottom-color: rgb(12, 12, 12);
//   padding-bottom: 30px;
// }
.project {
  background-color: #fff;
  border-radius: 20px;
  padding-right: 25px;
}
.building {
  // margin-top: 30px;
  // padding-top: 30px;
  padding-bottom: 50px;
  background-color: #fff;
  border-radius: 20px;
  padding-right: 25px;
}
.center {
  text-align: center;
  margin-right: 100px;
}
.pad {
  padding-right: 5px;
}
.build-collapse {
  padding-left: 30px;
  // padding-right: -40px;
  padding-top: 10px;
  // padding-bottom: 10px;
}
.button {
  padding: 0;
  float: right;
}
.button111 {
  text-align: center;
}
.image {
  // width: 100%;
  height: 200px;
  display: block;
}
</style>

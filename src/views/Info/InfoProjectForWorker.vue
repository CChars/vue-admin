<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新分配项目" name="first">
      <div>
        <el-row :gutter="16">
          <el-col :span="4">
            <div class="label-wrap category">
              <label for="">类型：</label>
              <div class="wrap-content">
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="label-wrap date">
              <label for="">日期: </label>
              <div class="wrap-content">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                >
                </el-date-picker>
              </div>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="label-wrap key-word">
              <label for="">关键字: </label>
              <div class="wrap-content">
                <el-select v-model="search_Key" style="width: 100px;">
                  <el-option
                    v-for="item in searchOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>

          <el-col :span="3">
            <!-- <el-form-item> -->
            <el-input
              v-model="input"
              placeholder="请输入内容"
              style="width: 100%"
            ></el-input>
            <!-- </el-form-item> -->
          </el-col>

          <el-col :span="2">
            <!-- <el-form-item> -->
            <el-button type="primary" style="width: 100%">搜索</el-button>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>

        <div class="block-space-30"></div>
        <!-- 表格 -->
        <el-table
          :data="tableData.item"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column type="selection" width="40"> </el-table-column>

          <el-table-column prop="projectName" label="项目名称" width="400">
          </el-table-column>
          <el-table-column prop="projectAddress" label="建筑地址" width="400">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="230">
          </el-table-column>
          <el-table-column
            prop="singleUser.username"
            label="申请人"
            width="115"
          >
          </el-table-column>

          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="
                  uploadBuildInfo(scope.$index, scope.row);
                  look_dialog_info.dialog_info_1 = true;
                "
                >更新建筑数据</el-button
              >
              <!-- <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              > -->
            </template></el-table-column
          >
        </el-table>

        <div class="block-space-30"></div>

        <!-- 底部分页 -->
        <el-row>
          <el-col :span="12">
            <el-button size="mini" @click="deleteAll">批量删除</el-button>
          </el-col>
          <el-col :span="12">
            <el-pagination
              class="pull-right"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.item.length"
            >
            </el-pagination>
          </el-col>
        </el-row>

        <div class="block-space-30"></div>
        <!-- dialog弹窗 -->
        <DialogInfo :flag.sync="dialog_info" />
        <StateDialog :flag.sync="look_dialog_info" />
      </div>
    </el-tab-pane>

    <el-tab-pane label="正在更新项目" name="second">
      <div class="block">
        <el-col
          :span="20"
          v-if="
            updataData.item.length - tableData.item.length ==
              doenProjectData.item.length
          "
        >
          <el-card shadow="hover">
            当前暂无正在更新的项目
          </el-card>
        </el-col>

        <el-timeline
          v-for="project in updataData.item"
          :key="project.projectId"
        >
          <el-timeline-item
            timestamp="2018/4/12"
            placement="top"
            v-if="project.buildList.length && !project.tag"
          >
            <el-card shadow="hover">
              <h4>项目名称: {{ project.projectName }}</h4>
              <p>项目地址: {{ project.projectAddress }}</p>
              <el-collapse
                v-model="activeNames[index]"
                @change="handleChange2"
                class="build-collapse"
                v-for="(build, index) in project.buildList"
                :key="build.buildId"
              >
                <el-collapse-item name="1">
                  <template slot="title">
                    {{ build.name }}<i class="header-icon el-icon-info"></i>
                  </template>
                  <el-button
                    @click="getBuildDetail(build)"
                    size="mini"
                    type="primary"
                    >查看建筑详情</el-button
                  >
                </el-collapse-item>
                <!-- <el-collapse-item title="第二个建筑" name="2">
                  <div>
                    控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                  </div>
                  <div>
                    页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
                  </div>
                </el-collapse-item> -->
              </el-collapse>
              <div class="build-button"></div>
              <el-button
                @click="go_on_updataBuildInfo(project)"
                size="mini"
                type="primary"
                >继续更新建筑信息</el-button
              >
              <el-button
                @click="make_this_project_done(project)"
                size="mini"
                type="primary"
                >完结该项目建筑检测</el-button
              >
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>

    <el-tab-pane label="已完成项目" name="third">
      <div class="block">
        <el-timeline
          v-for="(doneProject, index) in doenProjectData.item"
          :key="doneProject.projectId"
        >
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card shadow="hover">
              <h4>项目名称: {{ doneProject.projectName }}</h4>
              <p>项目地址: {{ doneProject.projectAddress }}</p>

              <el-collapse
                v-model="activeNames[index]"
                @change="handleChange(doneProject.projectId)"
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
                      v-for="(build, index) in doneProject.buildList"
                      :key="build.buildId"
                      :offset="index >= 0 ? 2 : 0"
                    >
                      <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <el-image
                          :src="build.pictures[0].pictureUrl"
                          class="image"
                        >
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

                  <el-row
                    class="button"
                    v-if="application.info && application.pringtAuthorization"
                  >
                    <el-button
                      type="primary"
                      round
                      @click="print(doneProject.projectId)"
                      >打印项目信息</el-button
                    >
                  </el-row>

                  <el-row
                    class="button"
                    v-if="application.info && !application.pringtAuthorization"
                  >
                    <el-button type="primary" round disabled
                      >申请正在审核中</el-button
                    >
                  </el-row>

                  <el-row class="button" v-if="!application.info">
                    <el-button
                      type="primary"
                      round
                      @click="applyPrint(doneProject.projectId)"
                      >申请项目打印</el-button
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <div class="build-button"></div>
              <!-- <el-button
                @click="go_on_updataBuildInfo"
                size="mini"
                type="primary"
                >查看详情</el-button
              > -->
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>
    <!-- dialog弹窗 -->
    <BuildInfoDrawer :flag.sync="build_info" @close="closeBuildInfo" />
  </el-tabs>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import DialogInfo from "./dialog/info.vue";
import StateDialog from "./dialog/state.vue";
import BuildInfoDrawer from "./dialog/buildInfo.vue";

import {
  GetWorkerProject,
  PutProjectDone,
  GetAllDoneProject
} from "../../api/project.js";

import {
  getApplyRequest,
  postApplyRequest
} from "../../api/exportApplicaation.js";
// import VueRouter from "vue-router";

// import App from "../../App.vue";
import { global } from "../../utils/global_3.0.js";

export default {
  name: "infoIndex",
  components: { DialogInfo, StateDialog, BuildInfoDrawer },

  setup(props, { root }) {
    const { confirm } = global();

    // const User = {
    //   props: ["id"],
    //   template: "<div>User {{ id }}</div>"
    // };
    // const router = new VueRouter({
    //   routes: [{ path: "/user/:id", component: User }]
    // });
    // App.use(router);

    const activeName = ref("first");

    const activeNames = reactive(
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""]
    );
    const loading = ref(true);

    const currentDate = new Date();

    const application = reactive({
      info: []
    });

    //  申请时向后台发送的模板
    const applyInfo = reactive({
      projectId: "",
      userId: "",
      pringtAuthorization: ""
    });

    //点击折叠面板的时候 向后台请求该项目的授权信息
    const handleChange = projectId => {
      console.log("handleChange");
      console.log(projectId);
      applyRequest(projectId);
    };

    const handleChange2 = val => {
      console.log(val);
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

    const options = reactive([
      {
        value: 1,
        label: "黄金糕"
      },
      {
        value: 2,
        label: "双皮奶"
      },
      {
        value: 3,
        label: "蚵仔煎"
      },
      {
        value: 4,
        label: "龙须面"
      }
    ]);
    const searchOption = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    //所有的数据
    const updataData = reactive({
      item: []
    });
    //表格数据
    const tableData = reactive({
      item: []
    });
    //已经完成的project数据
    const doenProjectData = reactive({
      item: []
    });
    const value = ref("");
    const value2 = ref("");
    const search_Key = ref("id");
    const input = ref("");
    const dialog_info = ref(false);

    const look_dialog_info = reactive({
      dialog_info_1: false,
      dialog_info_2: 3
    });
    //右侧的建筑信息弹出抽屉
    const build_info = reactive({
      dialog_states: false,
      build_index: "",
      build: ""
    });

    //新增建筑信息
    const go_on_updataBuildInfo = project => {
      // /Info/newBuild/:project_id
      //该路由方式在此处不生效
      // let path = "/Info/newBuild/" + 1;
      // root.$router.push(path);
      console.log("project");
      console.log(project);
      root.$store.commit("project/CLEAN_PROJECT");
      root.$store.commit("project/SET_PROJECT", project);

      let path = "/Info/newPro/";
      root.$router.push({
        path,
        query: {
          id: project.projectId
        }
      });
    };
    //完结该项目
    const make_this_project_done = project => {
      root
        .$confirm("此操作将终止该项目的检测, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          console.log("project");
          console.log(project);
          makeProjectDone(project.projectId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    };
    //点击查看建筑信息详情
    const getBuildDetail = build => {
      build_info.dialog_states = true;
      build_info.build_index = 1;
      build_info.build = build;
      // console.log(build);
    };

    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const uploadBuildInfo = (index, row) => {
      console.log("index");
      console.log(index);
      console.log("row");
      console.log(row);
      root.$store.commit("project/CLEAN_PROJECT");
      root.$store.commit("project/SET_PROJECT", row);
      // console.log(look_dialog_info);
      // console.log("dialog_info_1");
      // console.log(look_dialog_info.dialog_info_1);
      let path = "/Info/newPro/";
      root.$router.push({
        path,
        query: {
          id: row.projectId
        }
      });
    };

    const handleEdit = (index, row) => {
      console.log(index, row);
      // let a = "/user/" + 1;
      // root.$router.push(a);
    };

    //单个删除
    const handleDelete = (index, row) => {
      // console.log(index, row);
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        index: index,
        row: row,
        function: infoDelete
      });
    };
    //批量删除
    const deleteAll = () => {
      // console.log(index, row);
      confirm({
        content: "删除全部已选择项目, 是否继续?",
        index: "",
        row: "",
        function: infoDelete
      });
    };
    //删除的信息弹窗
    const infoDelete = (type, message) => {
      root.$message({
        type: type,
        message: message
      });
    };

    // 分页配置函数
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    const closeBuildInfo = () => {
      build_info.dialog_states = false;
      build_info.build_index = "";
      console.log("aaaaaaaa");
    };

    //获取有该检测人员标识的项目project
    const getWorkerProject = () => {
      GetWorkerProject()
        .then(Response => {
          console.log(Response);
          updataData.item = Response.data;
          loading.value = false;
          //挑选出新分配的项目
          tableData.item = [];
          updataData.item.forEach(project => {
            if (project.buildList.length === 0) {
              tableData.item.push(project);
            }
          });
          console.log(111111111);
          console.log(tableData.item);
          root.$store.commit("project/CLEAN_ALL_PROJECT");
          root.$store.commit("project/SET_ALL_PROJECT", updataData.item);
        })
        .catch(error => {
          console.log(error);
        });
    };
    //为项目设置是否完成
    const makeProjectDone = projectId => {
      PutProjectDone(projectId)
        .then(Response => {
          console.log(Response);
          const data = Response.data;
          if (data.status === 200) {
            //成功之后再次获取信息
            getDoneWorkerProject();
            getWorkerProject();
            // 显示弹框
            root.$message({
              type: "success",
              message: data.msg
            });
          } else {
            root.$message({
              type: "error",
              message: data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          root.$message({
            type: "error",
            message: "操作失败！"
          });
        });
    };
    //获取有该检测人员标识的并且已经完成检测的项目project
    const getDoneWorkerProject = () => {
      GetAllDoneProject()
        .then(Response => {
          console.log(Response);
          doenProjectData.item = Response.data;
          // loading.value = false;

          console.log(111111111);
          console.log(doenProjectData.item);
          // root.$store.commit("project/CLEAN_ALL_PROJECT");
          // root.$store.commit("project/SET_ALL_PROJECT", updataData.item);
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
      getWorkerProject();
      getDoneWorkerProject();
    });
    return {
      options,
      value,
      activeName,
      activeNames,
      application,
      currentDate,
      handleChange,
      handleChange2,
      value2,
      searchOption,
      search_Key,
      tableData,
      updataData,
      doenProjectData,
      input,
      dialog_info,
      build_info,
      go_on_updataBuildInfo,
      make_this_project_done,
      getBuildDetail,
      handleClick,
      handleEdit,
      handleDelete,
      deleteAll,
      handleSizeChange,
      handleCurrentChange,
      closeBuildInfo,
      look_dialog_info,
      uploadBuildInfo,
      print,
      applyPrint,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(center, 90, 40);
  }
  &.key-word {
    @include labelDom(center, 90, 40);
  }
}
.build-collapse {
  padding-left: 30px;
  padding-top: 10px;
  // padding-bottom: 10px;
}
.build-button {
  padding-top: 15px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  text-align: center;
}

.image {
  // width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

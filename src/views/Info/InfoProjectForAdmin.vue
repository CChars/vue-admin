<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待分配项目" name="first">
      <div class="block">
        <el-timeline
          v-for="(project, index) in cardData.item"
          :key="project.projectId"
          v-loading="loading"
        >
          <el-timeline-item
            v-if="!project.workerID"
            timestamp="2018/4/12"
            placement="top"
          >
            <el-card>
              <h4>{{ project.projectName }}</h4>
              <p>{{ project.projectAddress }}</p>

              <el-form
                :inline="true"
                :model="formInline.workers[index]"
                class="demo-form-inline"
              >
                <el-form-item label="审批人" :disabled="true">
                  <el-input
                    v-model="formInline.workers[index].adminUser"
                    placeholder="审批人"
                    >{{ username }}</el-input
                  >
                </el-form-item>
                <el-form-item label="检测人员">
                  <el-select
                    v-model="formInline.workers[index].workerID"
                    placeholder="请选择检测人员"
                  >
                    <!-- <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option> -->
                    <el-option
                      v-for="item in options.item"
                      :key="item.id"
                      :label="item.account"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>

              <el-button
                @click="onSubmitForWorker(index, project.projectId)"
                size="mini"
                type="primary"
                >为此项目分配人员</el-button
              >
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已分配项目" name="second">
      <div>
        <div class="block-space-30"></div>
        <!-- 表格 -->
        <el-table
          :data="tableData.item"
          border
          style="width: 100%"
          v-loading="loadingTable"
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
              <el-popover placement="right" width="600" trigger="click">
                <el-table :data="littleTable.gridData">
                  <el-table-column
                    width="150"
                    property="name"
                    label="建筑名称"
                  ></el-table-column>

                  <el-table-column
                    width="200"
                    property="address"
                    label="建筑地址"
                  ></el-table-column>

                  <el-table-column
                    width="150"
                    property="project.worker"
                    label="检测人员"
                  ></el-table-column>

                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope1">
                      <el-button
                        type="text"
                        class="button"
                        @click="getBuildDetail(scope1.row)"
                        >查看详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <el-button
                  slot="reference"
                  size="mini"
                  @click="getBuilds(scope.$index, scope.row)"
                  >查看</el-button
                >
              </el-popover>

              <el-button
                v-if="scope.row.tag"
                size="mini"
                type="success"
                style="margin-left:10px;"
                @click="print(scope.row.projectId)"
                >打印</el-button
              >
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
    <!-- dialog弹窗 -->
    <BuildInfoDrawer :flag.sync="build_info" @close="closeBuildInfo" />
  </el-tabs>
  <!-- <div>项目列表</div> -->
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  onBeforeMount
} from "@vue/composition-api";

import DialogInfo from "./dialog/info.vue";

import StateDialog from "./dialog/state.vue";

import BuildInfoDrawer from "./dialog/buildInfo.vue";

// import VueRouter from "vue-router";

// import App from "../../App.vue";
import { global } from "../../utils/global_3.0.js";

import { GetAllProject } from "../../api/project.js";

import { GetBuild } from "../../api/project.js";

import { getWorkerRequest, putSetWorkerRequest } from "../../api/user.js";

export default {
  name: "infoIndex",
  components: { DialogInfo, StateDialog, BuildInfoDrawer },

  setup(props, { root }) {
    const { confirm } = global();

    const loading = ref(true);
    const loadingTable = ref(true);
    // const User = {
    //   props: ["id"],
    //   template: "<div>User {{ id }}</div>"
    // };
    // const router = new VueRouter({
    //   routes: [{ path: "/user/:id", component: User }]
    // });
    // App.use(router);

    const formInline = reactive({
      workers: []
    });

    const username = computed(() => root.$store.state.app.username);

    const activeName = ref("first");

    const options = reactive({
      item: []
    });
    const littleTable = reactive({
      gridData: []
    });
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
    //表格数据
    const tableData = reactive({
      item: []
    });
    //卡片数据
    const cardData = reactive({
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

    const onSubmitForWorker = (index, projectId) => {
      // console.log(options);
      console.log(index);
      console.log("projectId");
      console.log(projectId);
      console.log("workerId");
      console.log(formInline.workers[index]);
      const workerId = formInline.workers[index].workerID;

      SetWorkerRequest(projectId, workerId);
    };
    // const toDetail = () => {
    //   console.log("为此项目分配人员");
    // };
    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const print = projectId => {
      console.log("打印按钮");
      console.log(projectId);
      window.open("/info/project/export/?projectId=" + projectId);
    };

    //点击列表中的查看按钮将查询项目中的build信息
    const getBuilds = (index, row) => {
      console.log(index, row);
      // let a = "/user/" + 1;
      // root.$router.push(a);
      const project_id = row.projectId;
      GetBuild(project_id)
        .then(Response => {
          let data = Response.data;
          console.log("这里是dataaaaaaaaa");
          console.log(data);
          loading.value = false;
          littleTable.gridData = data;
          // console.log(project);
        })
        .catch(error => {
          console.log(error);
        });
    };
    const getBuildDetail = build => {
      console.log(build);
      // let a = "/user/" + 1;
      // root.$router.push(a);
      build_info.dialog_states = true;
      build_info.build_index = 1;
      build_info.build = build;
    };

    const closeBuildInfo = () => {
      build_info.dialog_states = false;
      build_info.build_index = "";
      console.log("aaaaaaaa");
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
    const closeDialog = () => {
      dialog_info.value = false;
    };
    //将有workerId的项目收集起来就是已分配项目
    const setTableData = oldData => {
      tableData.item = [];
      oldData.forEach(project => {
        if (project.workerID) {
          tableData.item.push(project);
        }
      });
      loadingTable.value = false;
      console.log("tableData.item");
      console.log(tableData.item);
    };

    //获取所有的项目
    const getAllProject = () => {
      GetAllProject()
        .then(Response => {
          console.log(Response);
          cardData.item = Response.data;
          //定义分配时提交表单的格式
          // const submitInfo = reactive({
          //   adminUser: "",
          //   workerID: ""
          // });
          // // 每一个projet要有一个对应的提交表单  如果只用一个则，每一个项目的值都是一样的
          for (let index = 0; index < cardData.item.length; index++) {
            formInline.workers.push({
              adminUser: username.value,
              workerID: ""
            });
          }
          console.log("存进去的数据");
          console.log(formInline);
          // console.log(formInline.workers[1]);
          const oldData = Response.data;
          setTableData(oldData);
          loading.value = false;
        })
        .catch(error => {
          loading.value = false;
          console.log(error);
        });
    };
    //获取所有的检测人员用户
    const getAllWorkerRequest = () => {
      getWorkerRequest()
        .then(Response => {
          console.log(Response);
          options.item = Response.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    //为项目分配检测人员
    const SetWorkerRequest = (projectId, workerId) => {
      putSetWorkerRequest(projectId, workerId)
        .then(Response => {
          console.log("分配返回信息");
          console.log(Response);
          const data = Response.data;
          if (data.status === 200) {
            //分配完之后再次获取一次项目列表
            getAllProject();
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
        });
    };

    onMounted(() => {
      // getAllProject();
      getAllWorkerRequest();
    });
    onBeforeMount(() => {
      getAllProject();
    });
    return {
      // SetWorkerRequest,
      loading,
      loadingTable,
      username,
      options,
      littleTable,
      value,
      activeName,
      value2,
      searchOption,
      formInline,
      search_Key,
      tableData,
      cardData,
      input,
      dialog_info,
      onSubmitForWorker,
      // toDetail,
      build_info,
      closeBuildInfo,
      handleClick,
      getBuildDetail,
      getBuilds,
      handleDelete,
      deleteAll,
      setTableData,
      handleSizeChange,
      handleCurrentChange,
      closeDialog,
      look_dialog_info,
      print
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
</style>

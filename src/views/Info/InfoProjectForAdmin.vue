<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待分配项目" name="first">
      <div class="block">
        <el-timeline
          v-for="(project, index) in tableData.item"
          :key="project.projectId"
        >
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>{{ project.projectName }}</h4>
              <p>{{ project.projectAddress }}</p>

              <el-form
                :inline="true"
                :model="formInline.workers[index][0]"
                class="demo-form-inline"
              >
                <el-form-item label="审批人" :disabled="true">
                  <el-input v-model="username" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="检测人员">
                  <el-select
                    v-model="formInline.workers[index][0].workerID"
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
        <!-- <el-row :gutter="16">
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
            <el-form-item>
         <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input> -->
        <!-- </el-form-item> -->
        <!-- </el-col> -->

        <!-- <el-col :span="2">
            <el-button type="primary" style="width: 100%">搜索</el-button>
          </el-col> -->

        <!-- <el-col :span="3"> &nbsp;</el-col> -->

        <!-- <el-col :span="2" :offset="3">
        <el-button type="danger" style="width: 100%" @click="dialog_info = true"
          >新增</el-button
        >
        </el-col> -->
        <!-- </el-row> -->

        <div class="block-space-30"></div>
        <!-- 表格 -->
        <el-table :data="tableData.item" border style="width: 100%">
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
                type="info"
                @click="
                  handleLook(scope.$index, scope.row);
                  look_dialog_info.dialog_info_1 = true;
                "
                >进度</el-button
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
  </el-tabs>
  <!-- <div>项目列表</div> -->
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
import DialogInfo from "./dialog/info.vue";
import StateDialog from "./dialog/state.vue";

// import VueRouter from "vue-router";

// import App from "../../App.vue";
import { global } from "../../utils/global_3.0.js";

import { GetAllProject } from "../../api/project.js";

import { getWorkerRequest, putSetWorkerRequest } from "../../api/user.js";

export default {
  name: "infoIndex",
  components: { DialogInfo, StateDialog },

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

    const formInline = reactive({
      workers: [
        // [
        //   {
        //     adminUser: "",
        //     workerID: ""
        //   }
        // ],
        // [
        //   {
        //     adminUser: "",
        //     workerID: ""
        //   }
        // ],
        // [
        //   {
        //     adminUser: "",
        //     workerID: ""
        //   }
        // ]
      ]
    });

    const username = computed(() => root.$store.state.app.username);

    const activeName = ref("first");

    const options = reactive({
      item: [
        // {
        //   value: 1,
        //   label: "黄金糕"
        // },
        // {
        //   value: 2,
        //   label: "双皮奶"
        // }
      ]
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
    const value = ref("");
    const value2 = ref("");
    const search_Key = ref("id");
    const input = ref("");
    const dialog_info = ref(false);

    const look_dialog_info = reactive({
      dialog_info_1: false,
      dialog_info_2: 3
    });

    const onSubmitForWorker = (index, projectId) => {
      console.log(options);
      console.log(index);
      console.log(projectId);
      console.log(formInline.workers[index][0]);
      const workerId = formInline.workers[index][0].workerID;

      putSetWorkerRequest(projectId, workerId)
    };
    // const toDetail = () => {
    //   console.log("为此项目分配人员");
    // };
    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const handleLook = (index, row) => {
      console.log(index, row);
      console.log(look_dialog_info);
      console.log("dialog_info_1");
      console.log(look_dialog_info.dialog_info_1);
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
    const closeDialog = () => {
      dialog_info.value = false;
    };

    //获取所有的项目
    const getAllProject = () => {
      GetAllProject()
        .then(Response => {
          console.log(Response);
          tableData.item = Response.data;
          //定义分配时提交表单的格式
          const submitInfo = reactive({
            adminUser: "",
            workerID: ""
          });
          // 每一个projet要有一个对应的提交表单  如果只用一个则，每一个项目的值都是一样的
          for (let index = 0; index < tableData.item.length; index++) {
            formInline.workers.push(submitInfo);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

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

    onMounted(() => {
      getAllProject();
      getAllWorkerRequest();
    });
    return {
      username,
      options,
      value,
      activeName,
      value2,
      searchOption,
      formInline,
      search_Key,
      tableData,
      input,
      dialog_info,
      onSubmitForWorker,
      // toDetail,
      handleClick,
      handleEdit,
      handleDelete,
      deleteAll,
      handleSizeChange,
      handleCurrentChange,
      closeDialog,
      look_dialog_info,
      handleLook
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

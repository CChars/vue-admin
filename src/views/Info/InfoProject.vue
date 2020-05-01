<template>
  <!-- <div>项目列表</div> -->
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label style="font-size: 18px">项目列表</label>
          <!-- <div class="wrap-content">
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
          </div> -->
        </div>
      </el-col>

      <el-col :span="7">
        <!-- <div class="label-wrap date">
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
        </div> -->
      </el-col>

      <el-col :span="3">
        <!-- <div class="label-wrap key-word">
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
        </div> -->
      </el-col>

      <el-col :span="3">
        <!-- <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input> -->
      </el-col>

      <el-col :span="2">
        <!-- <el-button type="primary" style="width: 100%">搜索</el-button> -->
      </el-col>

      <el-col :span="2" :offset="3" class="pull-right">
        <el-button
          type="primary"
          style="width: 100%"
          @click="dialog_info = true"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <!-- <div class="block-space-30"></div> -->
    <!-- 表格 -->
    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="selection" width="40"> </el-table-column>

      <el-table-column prop="projectName" label="项目名称" width="380">
        <template slot-scope="scope">
          <router-link v-bind:to="'/Info/newBuild/' + scope.row.projectId">
            {{ scope.row.projectName }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="projectAddress" label="建筑地址" width="400">
      </el-table-column>
      <el-table-column prop="worker" label="负责人员" width="230">
      </el-table-column>
      <!-- <el-table-column label="申请人" width="115">-->
      <el-table-column label="申请人" width="250">
        {{ username }}
      </el-table-column>

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleLook(scope.$index, scope.row)"
            >进度</el-button
          >
          <!-- <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
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
    <DialogInfo :flag.sync="dialog_info" @reflash="reflashTable" />
    <StateDialog :flag.sync="look_dialog_info" @close="closeState" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
import DialogInfo from "./dialog/info.vue";
import StateDialog from "./dialog/state.vue";

import { GetProject } from "../../api/project.js";

// import VueRouter from "vue-router";

// import App from "../../App.vue";
import { global } from "../../utils/global_3.0.js";

export default {
  name: "infoIndex",
  components: { DialogInfo, StateDialog },

  setup(props, { root }) {
    const { confirm } = global();
    const username = computed(() => root.$store.state.app.username);
    const loading = ref(true);
    // const User = {
    //   props: ["id"],
    //   template: "<div>User {{ id }}</div>"
    // };
    // const router = new VueRouter({
    //   routes: [{ path: "/user/:id", component: User }]
    // });
    // App.use(router);

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
      dialog_info_2: 0
    });

    //向后端请求用户已经申请的项目
    const getProjects = () => {
      GetProject()
        .then(Response => {
          console.log("response");
          console.log(Response);
          tableData.item = Response.data;
          loading.value = false;
          // let data = Response.data;
        })
        .catch(error => {
          console.log(error);
        });
    };

    const handleLook = (index, row) => {
      console.log(index, row);
      if (row.worker != null && row.tag == null) {
        //说明已经分配了检测人员 但是没有检测完成
        look_dialog_info.dialog_info_2 = 2;
      } else if (row.worker == null) {
        //说明还没有分配检测人员
        look_dialog_info.dialog_info_2 = 1;
      } else if (row.tag == 1) {
        //说明检测完成
        look_dialog_info.dialog_info_2 = 3;
      }

      look_dialog_info.dialog_info_1 = true;
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
    const reflashTable = () => {
      // dialog_info.value = false;
      getProjects();
    };

    const closeState = () => {
      look_dialog_info.dialog_info_1 = false;
      look_dialog_info.dialog_info_2 = 0;
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      getProjects();
    });

    return {
      username,
      options,
      loading,
      value,
      value2,
      searchOption,
      search_Key,
      tableData,
      input,
      dialog_info,
      handleEdit,
      handleDelete,
      deleteAll,
      handleSizeChange,
      handleCurrentChange,
      reflashTable,
      closeState,
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

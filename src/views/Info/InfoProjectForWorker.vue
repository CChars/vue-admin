<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待完成项目" name="first">
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

          <!-- <el-col :span="3"> &nbsp;</el-col> -->

          <!-- <el-col :span="2" :offset="3">
        <el-button type="danger" style="width: 100%" @click="dialog_info = true"
          >新增</el-button
        >
        </el-col> -->
        </el-row>

        <div class="block-space-30"></div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="40"> </el-table-column>

          <el-table-column prop="title" label="项目名称" width="400">
          </el-table-column>
          <el-table-column prop="category" label="建筑地址" width="400">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="230">
          </el-table-column>
          <el-table-column prop="user" label="申请人" width="115">
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
                >更新</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
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
              :total="1000"
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

    <el-tab-pane label="已完成项目" name="second">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
              <el-button @click="toDetail" size="mini" type="primary"
                >查看详情</el-button
              >
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!-- <div>项目列表</div> -->
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from "./dialog/info.vue";
import StateDialog from "./dialog/state.vue";

// import VueRouter from "vue-router";

// import App from "../../App.vue";
import { global } from "../../utils/global_3.0.js";

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

    const activeName = ref("first");

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
    const tableData = reactive([
      {
        title: "hoiOA的花费ID哦安徽的否的飞的凤凰哈大幅度",
        category: "上海市普陀区金沙江路 1518 弄",
        date: "2222222222222222222",
        user: "所发生的积分"
      },
      {
        title: "hhiOA的花费ID哦安徽的否的飞的凤凰哈大幅度",
        category: "上海市普陀区金沙江路 1518 弄",
        date: "222222222222",
        user: "东方华府"
      },
      {
        title: "hoA的花费ID哦安徽的否的飞的凤凰哈大幅度",
        category: "上海市普陀区金沙江路 1518 弄",
        date: "2222222",
        user: "额吴瑞"
      }
    ]);
    const value = ref("");
    const value2 = ref("");
    const search_Key = ref("id");
    const input = ref("");
    const dialog_info = ref(false);

    const look_dialog_info = reactive({
      dialog_info_1: false,
      dialog_info_2: 3
    });

    const toDetail = () => {
      // /Info/newBuild/:project_id
      let path = "/Info/newBuild/" + 1;
      root.$router.push(path);
    };

    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const handleLook = (index, row) => {
      console.log(index, row);
      console.log(look_dialog_info);
      console.log("dialog_info_1");
      console.log(look_dialog_info.dialog_info_1);
      let path = "/Info/newPro/";
      root.$router.push({
        path,
        query: {
          id: 111
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
    const closeDialog = () => {
      dialog_info.value = false;
    };
    return {
      options,
      value,
      activeName,
      value2,
      searchOption,
      search_Key,
      tableData,
      input,
      dialog_info,
      toDetail,
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

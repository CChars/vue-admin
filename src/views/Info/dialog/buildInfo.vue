<template>
  <div>
    <el-drawer
      title="建筑详情"
      :visible.sync="dialog_info_flag"
      direction="rtl"
      :before-close="handleClose"
    >
      <div>
        <el-form
          label-width="100px"
          class="demo-ruleForm"
          labelPosition="right"
          :model="build_info.item"
          :disabled="true"
        >
          <el-row :gutter="20" class="rowStyle">
            <el-col :span="20">
              <el-form-item label="建筑名称">
                <el-input v-model="build_info.item.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="rowStyle">
            <el-col :span="20">
              <el-form-item label="建筑地址">
                <el-input v-model="build_info.item.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="rowStyle">
            <el-col :span="20">
              <el-form-item label="建筑状态">
                <el-input v-model="build_info.item.satte"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="rowStyle">
            <el-col :span="12">
              <el-form-item label="危险程度">
                <el-input v-model="build_info.item.danger"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="rowStyle">
            <el-col :span="10">
              <el-form-item label="建筑长度">
                <el-input v-model="build_info.item.length"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="建筑宽度">
                <el-input v-model="build_info.item.width"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="rowStyle">
            <el-col :span="10">
              <el-form-item label="建筑高度">
                <el-input v-model="build_info.item.height"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="经度">
                <el-input v-model="build_info.item.longitude"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="rowStyle">
            <el-col :span="10">
              <el-form-item label="纬度">
                <el-input v-model="build_info.item.latitude"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="bbb">
        <div class="aaa">
          <!-- <div>
            <div> -->
          <el-image
            v-for="url in urls.urls"
            :key="url.pictureId"
            :src="url.pictureUrl"
            lazy
          ></el-image>
          <!-- </div>
          </div> -->
        </div>
      </div>
    </el-drawer>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import { ref, watch, reactive } from "@vue/composition-api";
export default {
  name: "buildInfo",
  props: {
    flag: {
      type: Object,
      dialog_states: {
        type: Boolean,
        default: false
      },
      build_index: {
        type: Number
      },
      build: {
        type: Object
      }
    }
  },
  setup(props, { emit, root }) {
    const dialog_info_flag = ref(false);
    const active_flag = ref("");
    const formLabelWidth = ref("80px");
    const build_info = reactive({
      item: []
    });
    const urls = reactive({
      urls: []
    });
    // const dialogFormVisible = ref(false);
    // const

    const form = reactive({
      name: "",
      region: "",
      data1: "",
      data2: "",
      delivery: false,
      type: [],
      resouse: "",
      desc: ""
    });

    //watch
    watch(() => {
      console.log("1234");
      console.log(props.flag);

      dialog_info_flag.value = props.flag.dialog_states;
      active_flag.value = props.flag.build_index;
      build_info.item = props.flag.build;
      urls.urls = props.flag.build.pictures;
      console.log("urls");
      console.log(urls);
    });

    // const look_dialog_info_q = reactive({
    //   dialog_info_1: false,
    //   dialog_info_2: 1
    // });

    //function
    //关闭前的回调
    const handleClose = done => {
      root
        .$confirm("确认关闭？")
        .then(() => {
          console.log("124");
          dialog_info_flag.value = false;
          emit("close", false);
          done();
        })
        .catch(() => {});
    };

    // const close = () => {
    //   console.log("1234");
    //   dialog_info_flag.value = false;
    //   emit("update:flag", {
    //     dialog_states: false,
    //     build_index: ""
    //   });
    // };

    return {
      dialog_info_flag,
      active_flag,
      formLabelWidth,
      handleClose,
      build_info,
      urls,
      // dialogFormVisible,
      form
    };
  }
};
</script>
<style lang="scss" scoped>
.rowStyle {
  padding-top: 20px;
}
.bbb {
  padding-top: 20px;
}
.aaa {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  overflow: auto;
  display: inline-block;
  height: 400px;
}
</style>

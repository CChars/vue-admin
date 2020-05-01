<template>
  <div>
    <el-dialog title="项目进度" :visible.sync="dialog_info_flag" @close="close">
      <el-steps :active="active_flag" align-center>
        <el-step
          title="进度1"
          description="您已提交申请，请耐心等待处理"
        ></el-step>
        <el-step
          title="进度2"
          description="你所申请的项目已成功分配，检测员将进行现场勘查"
        ></el-step>
        <el-step
          title="进度3"
          description="建筑检测完成，请点击项目查看详情或下载项目报表查看"
        ></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
export default {
  name: "look_dialogInfo",
  props: {
    flag: {
      type: Object,
      dialog_info_1: {
        type: Boolean,
        default: false
      },
      dialog_info_2: {
        type: Number
      }
    }
  },
  setup(props, { emit }) {
    const dialog_info_flag = ref(false);
    const active_flag = ref();
    // const formLabelWidth = ref("70px");
    // const dialogFormVisible = ref(false);

    // const form = reactive({
    //   name: "",
    //   region: "",
    //   data1: "",
    //   data2: "",
    //   delivery: false,
    //   type: [],
    //   resouse: "",
    //   desc: ""
    // });

    //watch
    watch(() => {
      // console.log("1234");
      // console.log(props.flag.dialog_info_1);

      dialog_info_flag.value = props.flag.dialog_info_1;
      active_flag.value = props.flag.dialog_info_2;
    });

    // const look_dialog_info_q = reactive({
    //   dialog_info_1: false,
    //   dialog_info_2: 1
    // });

    //function
    const close = () => {
      dialog_info_flag.value = false;
      // emit("update:flag", {
      //   dialog_info_1: false,
      //   dialog_info_2: 1
      // });
      emit("close", false);
    };

    return {
      dialog_info_flag,
      active_flag,
      // formLabelWidth,
      // dialogFormVisible,
      // form,
      close
    };
  }
};
</script>
<style lang="scss" scoped></style>

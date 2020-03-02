<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("70px");
    const dialogFormVisible = ref(false);

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
      console.log("133333333334");
      console.log(props.flag);
      dialog_info_flag.value = props.flag;
    });

    //function
    const close = () => {
      dialog_info_flag.value = false;
      emit("update:flag", false);
    };

    return {
      dialog_info_flag,
      formLabelWidth,
      dialogFormVisible,
      form,
      close
    };
  }
};
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close">
      <el-form :model="form" ref="form">
        <el-form-item
          label="项目名称"
          :label-width="formLabelWidth"
          prop="projectName"
          :rules="[
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.projectName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="建筑地址"
          :label-width="formLabelWidth"
          prop="projectAddress"
          :rules="[
            { required: true, message: '请输入建筑地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.projectAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="primary" @click="yes('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
import { PostProject } from "../../../api/project.js";
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root, refs }) {
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("70px");
    const dialogFormVisible = ref(false);

    const form = reactive({
      projectName: "",
      projectAddress: ""
    });

    //watch
    watch(() => {
      // console.log("133333333334");
      // console.log(props.flag);
      dialog_info_flag.value = props.flag;
    });

    const no = () => {
      dialogFormVisible.value = false;
      dialog_info_flag.value = false;
      console.log(dialogFormVisible.value);
    };

    const yes = form => {
      refs[form].validate(valid => {
        if (valid) {
          console.log(form);
          newProject();
          dialog_info_flag.value = false;
          dialogFormVisible.value = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //function
    const close = () => {
      dialog_info_flag.value = false;
      emit("update:flag", false);
    };
    //删除的信息弹窗
    const infoDelete = (type, message) => {
      root.$message({
        type: type,
        message: message
      });
    };
    // 新增项目
    const newProject = () => {
      PostProject(form)
        .then(Response => {
          console.log(Response);
          infoDelete("success", Response.data.msg);
          emit("reflash", false);
        })
        .catch(error => {
          console.log(error);
          infoDelete("error", Response.data.msg);
        });
    };

    return {
      dialog_info_flag,
      formLabelWidth,
      dialogFormVisible,
      form,
      no,
      yes,
      close
    };
  }
};
</script>
<style lang="less" scoped></style>

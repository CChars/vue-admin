<template>
  <div>
    <div class="project">
      <el-form
        ref="projectForm"
        :inline="true"
        :model="sizeForm"
        label-width="100px"
        size="mini"
        :rules="projectrules"
      >
        <!-- <el-col :span="6"> -->
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <!-- </el-col> -->
        <!-- <el-col :span="6"> -->
        <el-form-item label="项目地址" prop="region">
          <el-input v-model="sizeForm.region"></el-input>
        </el-form-item>
        <!-- </el-col> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('projectForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('projectForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="building">
      <el-form
        :model="ruleForm"
        :rules="buildingrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="建筑地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑状态" prop="state">
              <el-input v-model="ruleForm.state"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="危险程度" prop="danger">
              <el-select v-model="ruleForm.danger" placeholder="请选择危险程度">
                <el-option label="正常" value="normal"></el-option>
                <el-option label="轻度" value="justSoSo"></el-option>
                <el-option label="中等" value="medial"></el-option>
                <el-option label="高危" value="primary"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="建筑长度" prop="length">
              <el-input v-model="ruleForm.length"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="建筑宽度" prop="width">
              <el-input v-model="ruleForm.width"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="建筑高度" prop="height">
              <el-input v-model="ruleForm.height"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="ruleForm.longitude"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="ruleForm.latitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="建筑照片" prop="photo">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-row>

        <el-form-item class="center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  setup(props, { refs, root }) {
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

    const resetForm = formName => {
      refs[formName].resetFields();
    };

    const onSubmit = () => {
      console.log("submit!");
    };

    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    const handlePictureCardPreview = file => {
      root.dialogImageUrl = file.url;
      root.dialogVisible = true;
    };

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const projectrules = reactive({
      name: [
        { required: true, message: "请输入项目名称", trigger: "blur" },
        { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
      ],
      region: [{ required: true, message: "请输入项目地址", trigger: "blur" }]
    });
    const sizeForm = reactive({
      name: "",
      region: ""
    });

    const buildingrules = reactive({
      name: [{ required: true, message: "请输入建筑名称", trigger: "blur" }],
      danger: [
        { required: true, message: "请选择危险等级", trigger: "change" }
      ],
      address: [{ required: true, message: "请输入建筑地址", trigger: "blur" }],
      state: [{ required: true, message: "请输入建筑状态", trigger: "blur" }],
      length: [{ required: true, message: "请输入建筑长度", trigger: "blur" }],
      width: [{ required: true, message: "请输入建筑宽度", trigger: "blur" }],
      height: [{ required: true, message: "请输入建筑高度", trigger: "blur" }],
      longitude: [
        { required: true, message: "请输入建筑经度", trigger: "blur" }
      ],
      latitude: [
        { required: true, message: "请输入建筑纬度", trigger: "blur" }
      ],
      photo: [{ required: true, message: "请上传建筑照片", trigger: "blur" }]
    });
    const ruleForm = reactive({
      name: "",
      region: "",
      address: "",
      state: "",
      length: "",
      width: "",
      height: "",
      longitude: "",
      latitude: "",
      photo: ""
    });
    return {
      submitForm,
      resetForm,
      onSubmit,
      handleRemove,
      dialogImageUrl,
      handlePictureCardPreview,
      dialogVisible,
      buildingrules,
      projectrules,
      ruleForm,
      sizeForm
    };
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.project {
  border-bottom: 2px solid rgb(185, 182, 182);
  // border-bottom-color: rgb(12, 12, 12);
  padding-bottom: 30px;
}
.building {
  padding-top: 30px;
  padding-bottom: 50px;
}
.center {
  text-align: center;
  margin-right: 100px;
}
.pad {
  padding-right: 5px;
}
</style>

<template>
  <div>
    <div class="building">
      <div style="padding-left: 30px; padding-top: 20px" v-if="$route.query.id">
        <el-page-header
          @back="goBack"
          style="margin-bottom: 15px;"
        ></el-page-header>
        <label for="" style="font-size:16px "
          ><span> 为项目</span>
          <span class="color" v-if="projectName">{{ projectName }}</span>
          <span> 上传更新建筑的详细数据</span>
          <span> 路由： {{ $route.query.id }}</span></label
        >

        <el-divider></el-divider>
      </div>

      <div
        style="padding-left: 30px; padding-top: 20px;"
        v-if="!$route.query.id"
      >
        <label for="" style="font-size:16px "><span> 为项目</span></label>
        <el-select
          v-model="projectId2"
          placeholder="请选择"
          style="padding-left: 15px; padding-right: 15px;"
        >
          <el-option
            v-for="item in options.item"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectId"
          >
          </el-option>
        </el-select>
        <label for="" style="font-size:16px "
          ><span> 上传更新建筑的详细数据</span></label
        >

        <el-divider></el-divider>
      </div>

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
            <el-form-item label="建筑状态" prop="satte">
              <el-input v-model="ruleForm.satte"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="危险程度" prop="danger">
              <el-select v-model="ruleForm.danger" placeholder="请选择危险程度">
                <el-option label="正常" value="正常"></el-option>
                <el-option label="轻度" value="轻度"></el-option>
                <el-option label="中等" value="中等"></el-option>
                <el-option label="高危" value="高危"></el-option>
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
          <el-form-item label="建筑照片" prop="pictures">
            <el-upload
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="uploadAvatar"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList.list"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-row>

        <el-form-item class="center">
          <el-button type="primary" @click="submitBuildForm('ruleForm')"
            >立即新增</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, onUnmounted } from "@vue/composition-api";
import { PostBuild, uploadBuildPhoto } from "../../api/project.js";
export default {
  setup(props, { refs, root }) {
    const projectName = ref("");
    const projectId = ref("");
    const projectId2 = ref("");
    //项目选择框
    const options = reactive({
      item: []
    });
    //拿到存在vuex中的project信息
    const projectInfo = watch(() => {
      const a = root.$store.state.project.project;
      const projects = root.$store.state.project.allProject;
      console.log(1111111111111);
      console.log(a);
      console.log(222222222222);
      console.log(projects);
      projectName.value = a.projectName;
      projectId.value = a.projectId;

      options.item = projects;
      console.log(options.item);
    });

    const buildingrules = reactive({
      name: [{ required: true, message: "请输入建筑名称", trigger: "blur" }],
      danger: [
        { required: true, message: "请选择危险等级", trigger: "change" }
      ],
      address: [{ required: true, message: "请输入建筑地址", trigger: "blur" }],
      satte: [{ required: true, message: "请输入建筑状态", trigger: "blur" }],
      length: [{ required: true, message: "请输入建筑长度", trigger: "blur" }],
      width: [{ required: true, message: "请输入建筑宽度", trigger: "blur" }],
      height: [{ required: true, message: "请输入建筑高度", trigger: "blur" }],
      longitude: [
        { required: true, message: "请输入建筑经度", trigger: "blur" }
      ],
      latitude: [{ required: true, message: "请输入建筑纬度", trigger: "blur" }]
      // photo: [{ required: true, message: "请上传建筑照片", trigger: "blur" }]
    });
    const ruleForm = reactive({
      name: "",
      address: "",
      satte: "",
      length: "",
      width: "",
      height: "",
      longitude: "",
      latitude: "",
      pictures: []
    });
    const submitBuildForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          // console.log("formName submit!!");
          // console.log(ruleForm);
          // console.log(projectId.value);
          // console.log(projectId2.value);
          const id = ref("");
          if (root.$route.query.id) {
            id.value = projectId.value;
          } else if (!root.$route.query.id) {
            id.value = projectId2.value;
          }
          picList.list.forEach(list => {
            // ruleForm.photo.push(list.pictureUrl);
            ruleForm.pictures.push({ pictureUrl: list.pictureUrl });
            // { key: uid, pictureUrl: res.data.obj.url }
          });
          console.log("这里是ruleForm");
          console.log(ruleForm);
          addBuildForProject(id.value, ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const resetForm = formName => {
      refs[formName].resetFields();
    };

    //删除的信息弹窗
    const infoUpload = (type, message) => {
      root.$message({
        type: type,
        message: message
      });
    };
    //向后台提交build信息
    const addBuildForProject = (projectId, ruleForm) => {
      PostBuild(projectId, ruleForm)
        .then(Response => {
          console.log(Response.data);
          console.log("formName submit!!formNameformNameformName");
          // refs[ruleForm].resetFields();
          resetForm("ruleForm");
          picList.list = [];
          infoUpload("success", Response.data.msg);
        })
        .catch(error => {
          console.log(error);
          // refs[ruleForm].resetFields();
          resetForm("ruleForm");
          picList.list = [];
          infoUpload("error", "上传建筑信息失败！");
        });
    };

    ////######################图片上传相关##################################

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const picList = reactive({
      list: []
    });
    const fileList = reactive({
      list: []
    });

    //给后台上传图片
    const uploadAvatar = item => {
      const formData = new FormData();
      formData.append("file", item.file);
      const uid = item.file.uid;

      console.log("formData");
      console.log(formData);
      console.log("uid");
      console.log(uid);
      console.log("item");
      console.log(item);

      const id = ref("");
      if (root.$route.query.id) {
        id.value = projectId.value;
      } else if (!root.$route.query.id) {
        id.value = projectId2.value;
      }

      uploadBuildPhoto(id.value, formData)
        .then(res => {
          console.log("res");
          console.log(res);
          picList.list.push({ key: uid, pictureUrl: res.data.obj.url });
          console.log("picList");
          console.log(picList);
          emptyUpload();
        })
        .catch(() => {
          root.$message.error("上传失败，请重新上传");
          emptyUpload();
        });
    };

    //在上传之前校验图片格式大小
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        root.$message.error("上传图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isPng) && isLt2M;
    };

    const handleRemove = (file, fileList) => {
      for (const i in picList.list) {
        if (picList.list[i].key === file.uid) {
          picList.list.splice(i, 1);
        }
      }
      console.log(file, fileList);
    };

    //查看大图
    const handlePictureCardPreview = file => {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
      console.log("file");
      console.log(file);
    };

    /**
     * 清空上传组件
     */
    const emptyUpload = () => {
      const mainImg = refs.upload;
      if (mainImg) {
        if (mainImg.length) {
          mainImg.forEach(item => {
            item.clearFiles();
          });
        } else {
          refs.upload.clearFiles();
        }
      }
    };
    ////######################图片上传相关##################################

    onUnmounted(() => {
      console.log("组件将要卸载");
      //在关闭之后将vuex里面的项目信息清除
      root.$store.commit("project/CLEAN_PROJECT");
    });
    //返回上一层
    const goBack = () => {
      root.$router.go(-1); //返回上一层
      root.$store.commit("project/CLEAN_PROJECT");
    };
    return {
      projectName,
      projectId2,
      projectInfo,
      submitBuildForm,
      options,
      resetForm,
      handleRemove,
      dialogImageUrl,
      dialogVisible,
      buildingrules,
      // projectrules,
      //#############
      picList,
      fileList,
      uploadAvatar,
      beforeAvatarUpload,
      ruleForm,
      handlePictureCardPreview,
      emptyUpload,
      //#############
      // sizeForm,
      goBack,
      addBuildForProject
    };
  }
};
</script>

<style lang="scss" scoped>
.color {
  // color: blue;
  font-weight: 700;
}
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
  background-color: #fff;
  border-radius: 20px;
  padding-right: 25px;
}
.building {
  margin-top: 30px;
  // padding-top: 30px;
  padding-bottom: 50px;
  background-color: #fff;
  border-radius: 20px;
  padding-right: 25px;
}
.center {
  text-align: center;
  margin-right: 100px;
}
.pad {
  padding-right: 5px;
}
</style>

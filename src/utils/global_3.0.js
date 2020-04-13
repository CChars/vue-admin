import { MessageBox } from "element-ui";

export function global() {
  const confirm = params => {
    console.log(params.index, params.row);

    MessageBox.confirm(params.content, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        // root.$message({
        //   type: "success",
        //   message: "删除成功!"
        // });
        params.function("success", "删除成功!");
      })
      .catch(() => {
        // root.$message({
        //   type: "info",
        //   message: "已取消删除"
        // });
        params.function("info", "已取消删除");
      });
  };

  return {
    confirm
  };
}

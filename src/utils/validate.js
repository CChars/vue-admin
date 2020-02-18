//过滤特殊字符串

export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—— |{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
// 验证邮箱格式
export function validateEmail(value) {
  let pattern = /^([A-Za-z0-9])+@[A-Za-z0-9]+\.([A-Za-z]{2,4})$/;
  if (!pattern.test(value)) {
    return true;
  } else {
    return false;
  }
}

// 验证密码格式
export function validatePass(value) {
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;
  if (!pattern.test(value)) {
    return true;
  } else {
    return false;
  }
}

// 验证验证码格式
export function validateCodes(value) {
  let pattern = /^[a-z0-9]{6}$/;

  return !pattern.test(value) ? true : false;
  // if (!pattern.test(value)) {
  //   return true;
  // } else {
  //   return false;
  // }
}

//使用export时，文件 import 需要用 { }
//能使用多个export 引用时需要用花括号

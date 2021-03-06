let validcodeName = (rule, value, callback) => {
  let reg = /^[0-9]*$/;
  if (reg.test(value)) {
    callback(new Error("登录用户名不能为纯数字"));
  } else {
    callback();
  }
};
let rule = {
  loginPassword: [{ required: true, message: "请填写密码", trigger: "blur" }],
  memName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
  loginName: [
    { required: true, message: "请填写登录用户名", trigger: "blur" },
    { validator: validcodeName, trigger: "blur" },
    {
      min: 6,
      message: "请输入至少6位字母或数字字母组合",
      trigger: "blur"
    }
  ],
  companyName: [{ required: true, message: "请填写公司名称", trigger: "blur" }],
  memPhone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
  memMobile: [{ required: true, message: "请填写手机号码", trigger: "blur" }],
  legalman: [
    { required: true, message: "请填写法人代表姓名", trigger: "blur" }
  ],
  lawphone: [
    { required: true, message: "请填写法人代表联系电话", trigger: "blur" }
  ],
  lawmobile: [
    { required: true, message: "请填写法人代表手机号码", trigger: "blur" }
  ],
  companyCode: [
    { required: true, message: "请填写公司统一社会信用代码", trigger: "blur" }
  ],
  companyBank: [
    { required: true, message: "请填写公司开户银行", trigger: "blur" }
  ],
  companyBankAccount: [
    { required: true, message: "请填写公司银行账号", trigger: "blur" }
  ],
  companyBankAccountName: [
    { required: true, message: "请填写公司银行开户名", trigger: "blur" }
  ]
};

export default {
  rule
};

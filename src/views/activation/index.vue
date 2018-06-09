<template>
  <div class="activation">
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <span>设置密码</span>
        <el-button style="float: right; padding:0" type="text">登录</el-button>
      </div>
      <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form-box">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';

  export default {
    name: 'activation',
    data() {
      let validatePass
        , validatePass2;

      validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [{validator: validatePass, trigger: 'blur'}],
          checkPass: [{validator: validatePass2, trigger: 'blur'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>
<style scoped>
  .activation {
  }

  .card-box {
    width: 400px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .form-box {
    padding: 10px 20px 0 10px;
  }
</style>

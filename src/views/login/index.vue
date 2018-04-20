<template>
  <div class="login">
    <div class="login-top"></div>
    <section id="login-app" class="login-box">
      <div style="text-align: center;">
        <i class="logo"></i>
        <span class="title">{{ $tc('login.text.signIn') }}</span>
      </div>
      <div class="login-form">
        <div class="from">
          <el-form :model="formInline" label-width="100px" :rules="ruleInline" ref="formInline">
            <div class="from-item">
              <el-form-item :label="$tc('login.userInformation.email')" prop="username">
                  <el-input v-model="formInline.username" type="email" placeholder="Email" style="width:300px"></el-input>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item :label="$tc('login.userInformation.password')" prop="password">
                  <el-input v-model="formInline.password" type="password" placeholder="Password" style="width:300px"></el-input>
              </el-form-item>
            </div>
            <div class="login-link" style="margin-top:50px;">
              <!-- <el-checkbox v-model="checked">{{ $t('login.text.remenberMe') }}</el-checkbox> -->
              <router-link to="/forgetPassword">{{ $tc('login.text.forgetPassword') }}?</router-link>
            </div>
            <el-button type="primary" @click="handleSubmit('formInline')" style="width:100%;margin:10px 0;">{{$tc('login.text.loginIn')}}</el-button>
            <div class="login-link active">
              <router-link to="/signUp">{{$tc('login.text.noAccount')}}? {{$tc('login.text.signUpNow')}}>></router-link>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import config from  'service/config';
  export default {
    name: 'login',
    data() {
      return {
        loginLoading: false,
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            { required: true, message: '请输入邮箱地址', trigger: 'change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger:'blur,change' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.$localStore.clearAll();
      this.$sessionStore.clearAll();
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // console.log(new Date(new Date().valueOf()+1*24*60*60*1000*30))
            // this.judgeCookieSign()
          } else {
               this.$message({
                  message: '请输入正确的用户名密码！',
                  type: 'warning',
              });
            // this.$Message.warning('请输入正确的用户名密码！');
            return false;
          }
        });

      },
      judgeCookieSign(){
          if(this.getCookie('username') && this.getCookie('password')){
            this.formInline.username = this.getCookie('username') 
            this.formInline.password = this.getCookie('password')
            const params = {
              userName : this.formInline.username,
              password : this.formInline.password
            }
            this.$ajax.post(this.$apis.post_user_application,params).then(res =>{
                if(res.status == 'SUCCESS'){
                  const data = res.content.userAuthorization
                  this.$localStore.set('userSessionToken', data.userSessionToken);
                  this.$localStore.set('userPrivileges', data.userPrivileges);
                  setTimeout( ()=> {
                    this.$Message.success('登录成功');
                     //跳转到对应得workbench
                      window.location.href = ''
                  },1000);
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errorMsg,
                        center: true
                    });
                }
            })
          }else{
              this.$ajax.post(this.$apis.post_user_application,params).then(res =>{
                if(res.status == 'SUCCESS'){
                  // const data = res.content.userAuthorization
                  // this.$localStore.set('userSessionToken', data.userSessionToken);
                  // this.$localStore.set('userPrivileges', data.userPrivileges);
                  //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数） 
                  const expiredays = new Date(new Date().valueOf()+1*24*60*60*1000*30)
                  this.setCookie ('username', this.formInline.username, expiredays)
                  this.setCookie ('password', this.formInline.password, expiredays)            
                  // this.$message({
                  //     message: '登陆成功',
                  //     type: 'success',
                  //     onClose(){
                  //         window.location.href = ''
                  //     }
                  // });
                }else{
                  this.$message({
                      showClose: true,
                      message: res.errorMsg,
                      center: true
                  });
                }
              })
          }
      },
    }
  }
</script>
<style scoped lang="less">
  .login {
    .login-link {
      display:flex;
      justify-content: flex-end;
      &.active {
        justify-content: center;
      }
      a {
        color:#409EFF;
        font-size:14px;
        &:hover {
          opacity: .6;
        }
      }
    }
  }
  .login .ivu-input-group-prepend {
    background-color: #ffffff;
    border: none;
    width: 40px;
    text-align: left;
  }

  .login .ivu-form-item-content {
    line-height: 40px;
    height: 40px;
  }

  .login .ivu-input {
    height: 40px;
    border: none;
    padding: 0;
    border-radius: 0;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-input:focus {
    border: none;
    box-shadow: none;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-input:hover {
    border-color: none;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-form-item-error-tip {
    left: 40px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login-top {
    position: absolute;
    width: 100%;
    height: 398px;
    background-image: url("../../assets/images/login-back.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  .login-box {
    max-width: 500px;
    width: 500px;
    height: 380px;
    background-color: #fff;
    position: fixed;
    top: 45%;
    left: 50%;
    margin-top: -160px;
    margin-left: -250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  }

  .login-box .logo {
    display: inline-block;
    background-image: url("../../assets/images/logo.jpg");
    width: 150px;
    height: 68px;
    vertical-align: middle;
    margin: 30px 20px 20px 0;
    background-size: 100% 100%;
  }

  .login-box .title {
    display: inline-block;
    vertical-align: middle;
    font-size: 50px;
  }

  .login-form {
    padding-left: 45px;
    padding-right: 45px;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    .from {
      .from-item {
        display:flex;
        align-items:center;
        margin-bottom:10px;
        span {
          width: 100px;
          font-size:12px;
          color:#666;
          text-align:right;
          padding-right:10px;
        }
      }
    }
  }


</style>

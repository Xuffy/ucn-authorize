<template>
    <div class="input-email">
        <el-form class="input-email" :model="emailFrom" :rules="rules" ref="emailFrom">
            <!-- <div class="inputBox center" >
                <label for="Email">{{ $t('login.userInformation.email') }}：</label>
                <el-input v-model="emailFrom.email" type="email" placeholder="Please input the email" style="width: 200px"></el-input>
            </div> -->
            <el-form-item :label="this.$i.login.userInformation.email" prop="email" class="inputBox center" >
                <el-input v-model="emailFrom.email" type="email" :placeholder="this.$i.login.placeholder.email" style="width: 200px"></el-input>
            </el-form-item>

             <div class="bottom-btn">
                <div class="btn-wrap">
                    <el-button type="primary" @click="Next('emailFrom')" :loading="loading">{{ $i.login.btn.submit }}</el-button>
                    <el-button @click="goBack">{{ $i.login.btn.cancel }}</el-button>
               </div>
             </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'inputEmail',
        data() {
            return {
                loading: false,
                emailFrom:{
                    email:'',
                    callback:''
                },
                rules: {
                     email: [
                        { required: true, message: this.$i.login.prompt.inputYourEmail, trigger: 'blur' },
                        { type: 'email', message:  this.$i.login.prompt.pleaseEnterCorrectEmail, trigger: 'blur,change' }
                    ]
                }
            }
        },
        mounted(){
            // console.log(window.location)
        },
        methods: {
            Next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         this.inputEmail();
                    } else {
                        return false;
                    }
                });
            },
            inputEmail(){
                //若录入的email在我们系统不存在，返回：您输入的emai未注册，请核对后重新输入！
                this.loading = true;
                let {type} = this.$sessionStore.get('query');
                this.$ajax.post(this.$apis.POST_USER_SEND_PASS_RESET, {
                    email: this.emailFrom.email,
                    callback:`${window.location.origin}/#/forgetPassword/ResetPassword?type=${type}&activeToken=%s&email=%s`
                })
                .then(res => {
                    this.$router.push({
                        name: 'Identify',
                        params: {
                            email: this.emailFrom.email
                        }
                    });
                    this.loading = false;
                }).catch(res =>{
                    this.loading = false;
                });
            },
          goBack(){
              window.history.go(-1);
          }
        },
    }
</script>
<style lang="less" scoped>
    .input-email {
        flex:1;
        display:flex;
        flex-direction: column;
        .inputBox {
            display:flex;
            align-items: center;
            justify-content: center;
            &.center {
                height:50%;
            }
        }
    }
     .bottom-btn {
        .choice {
            padding:0 100px;
            height: 60px;
            display:flex;
            align-items: center;
        }
        .btn-wrap {
            width: 200px;
            margin:0 auto;
            display:flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>


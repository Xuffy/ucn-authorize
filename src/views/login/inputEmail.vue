<template>
    <div class="input-email">
        <el-form class="input-email" :model="emailFrom" :rules="rules" ref="emailFrom"> 
            <!-- <div class="inputBox center" >
                <label for="Email">{{ $t('login.userInformation.email') }}：</label>
                <el-input v-model="emailFrom.email" type="email" placeholder="Please input the email" style="width: 200px"></el-input>
            </div> -->
            <el-form-item :label="$tc('login.userInformation.email')" prop="email" class="inputBox center" >
                <el-input v-model="emailFrom.email" type="email" :placeholder="$tc('login.placeholder.email')" style="width: 200px"></el-input>
            </el-form-item>

            <div class="inputBox">
                <el-button type="primary" @click="Next('emailFrom')">{{ $tc('login.btn.submit') }}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'inputEmail',
        data() {
            return {
                emailFrom:{
                    email:'',
                },
                rules: {
                     email: [
                        { required: true, message: this.$tc('login.prompt.inputYourEmail'), trigger: 'blur' },
                        { type: 'email', message:  this.$tc('login.prompt.pleaseEnterCorrectEmail'), trigger: 'blur,change' }
                    ]
                }
            }          
        },
        methods: {
            Next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                     this.$router.push('Identify')
                    } else {
                        // this.$Message.warning('请输入正确的邮箱地址！');
                        return false;
                    }
                }); 
            },
            inputEmail(){
                //若录入的email在我们系统不存在，返回：您输入的emai未注册，请核对后重新输入！
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
</style>


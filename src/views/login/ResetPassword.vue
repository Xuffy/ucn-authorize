<template>
    <div class="input-email">
        <el-form :label-position="labelPosition" class="inputBox center" label-width="200px"  :model="password" :rules="rules" ref="password">
            <el-form-item :label="$tc('login.text.newPassword')" prop="pass">
                <el-input v-model="password.pass" type="password" :placeholder="$tc('login.placeholder.password')"  style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item :label="$tc('login.text.repeatThePassword')" prop="checkPass">
                <el-input v-model="password.checkPass" type="password" :placeholder="$tc('login.placeholder.password')"  style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
         <div class="inputBox btn">
            <el-button type="primary" @click="Next('password')">{{$tc('login.btn.submit') }}</el-button>
        </div>
    </div>
</template>
<script>
    let bFlage = true;
    export default {
        name: 'inputEmail',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error(this.$tc('login.prompt.inputYourPassword')));
                } else {
                if (this.password.checkPass !== '') {
                    this.$refs.password.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error(this.$tc('login.prompt.checkpassword')));
                } else if (value !== this.password.pass) {
                callback(new Error(this.$tc('login.prompt.passwordMistake')));
                } else {
                callback();
                }
            };
            return {
                labelPosition: 'right',
                password:{
                    pass:'',
                    checkPass:'',
                },
                rules: {
                    pass: [
                        { min:6, message: this.$tc('login.prompt.passwordLength'), trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { min:6, message: this.$tc('login.prompt.passwordLength'), trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            Next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!bFlage) return;
                        bFlage = false;
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                            this.$router.push('Finish')
                            bFlage = true;
                        }, 2000);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            }
        }
    }
</script>
<style lang="less" scoped>
    .input-email {
        flex:1;
        display:flex;
        flex-direction: column;
        .inputBox {
            padding:40px 0;
            &.center {
                height:40%;
                margin: 0 auto;
            }
            .form-input {
                width:100%;
                display:flex;
                align-items: center;
                margin-top:30px;
            }
            &.btn {
                text-align: center;
                padding: 0;
            }
            label {
                width: 40%;
                text-align: right;
                padding-right:15px;
            }
        }
    }
</style>


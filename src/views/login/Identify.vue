<template>
    <div class="input-email">
        <div class="inputBox center">
            <label for="icon"><i class="el-icon-success"></i></label> {{email}}，<span v-if="$route.name === 'Identify'">{{$i.login.text.modifyPassword}}</span><span v-else>{{$i.login.text.successPassword}}</span>
        </div>
        <div class="inputBox">
            <button @click="sendOut" v-if="$route.name === 'Identify'"> {{ $i.login.text.reSendMail }} </button>
            <div class="link" v-else @click="linklogin">
                {{ $i.login.text.goSignInNow }}>>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'inputEmail',
        data() {
            return {
                val:'',
                email:'',
                bFlage:true,
            }
        },
        methods: {
            sendOut() {
                if(!this.bFlage) return;
                this.bFlage = false;
                this.resetInputEmail();
            },
            resetInputEmail(){
                let {type} = this.$sessionStore.get('query');
                this.$ajax.post(this.$apis.POST_USER_SEND_PASS_RESET, {
                    email: this.email,
                    callback:`${window.location.origin}/#/forgetPassword/ResetPassword?type=${type}&activeToken=%s&email=%s`
                })
                .then(res => {
                    this.$message({
                      type: 'success',
                      message: this.$i.login.prompt.sendSuccess,
                    });
                    this.bFlage = true;
                })
            },
            linklogin(){
                this.$router.push({
                   name:'login'
                });
            }
        },
        created() {
             this.email =  this.$localStore.get('email') || ''
            this.sendOut();
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
            label {
                padding-right:10px;
                i {
                    color:#2d8cf0;
                    font-size:25px;
                }
            }
            button, .link {
                border:none;
                background:none;
                color:#2d8cf0;
                font-size:14px;
                cursor: pointer;
                &:hover {
                    opacity: .8;
                }
            }
        }
    }

</style>


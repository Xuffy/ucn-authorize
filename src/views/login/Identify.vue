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
    import Qs from 'qs';
    import {Base64} from 'js-base64';
    export default {
        name: 'inputEmail',
        data() {
            return {
                val:'',
                email:'',
                bFlage:true,
                query: this.$sessionStore.get('query') || {}
            }
        },
        methods: {
            sendOut() {
                if(!this.bFlage) return;
                this.bFlage = false;
                this.resetInputEmail();
            },
            resetInputEmail(){
                console.log(1)
                let {type} = this.$sessionStore.get('query')
                ,callback='{url}/#/forgetPassword/ResetPassword?{params}&activeToken=%s&email=%s&reset_email={reset}';

                callback=_.template(callback)({
                    url:window.location.origin,
                    params:Qs.stringify(this.$sessionStore.get('query')),
                    reset:Base64.encode(`${window.location.ancestorOrigins[0]}/login`)
                    })
                this.$ajax.post(this.$apis.POST_USER_SEND_PASS_RESET, {
                    email: this.email,
                    callback
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
                let url = Base64.decode(this.query.reset_email)
                window.location.href = url
            }
        },
        created() {
            this.email =  this.$localStore.get('email') || ''
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


<template>
    <div class="input-email">
        <div class="inputBox center">
            <label for="icon"><i class="el-icon-success"></i></label>{{$i.login.text.modifyPassword}} xxxxx，<span v-if="$route.name === 'Identify'">{{$i.login.text.modifyPassword}}</span><span v-else>{{$i.login.text.successPassword}}</span>
        </div>
        <div class="inputBox">
            <button @click="sendOut" v-if="$route.name === 'Identify'"> {{ $i.login.text.reSendMail }} </button>
            <router-link to="/" v-else>{{ $i.login.text.goSignInNow }}>></router-link>
        </div>
    </div>
</template>
<script>
    let bFlage = true;
    export default {
        name: 'inputEmail',
        data() {
            return {
                val:'',
            }
        },
        methods: {
            sendOut() {
                if(!bFlage) return;
                bFlage = false;
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    this.$router.push('ResetPassword')
                    loading.close();
                    bFlage = true;
                }, 2000);
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
            button, a {
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


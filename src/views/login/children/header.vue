<template>
    <header>
        <div v-for="(item, index) in list" :key="item.id" :class="{'active':$route.name === item.text}">
            <span>{{index + 1}}</span>{{item.name}} 
        </div>
    </header>
    <!-- <div>
        <el-steps :active="active" align-center finish-status="success">
            <el-step :title="$i.login.text.inputEmail"></el-step>
            <el-step :title="$i.login.text.identify" ></el-step>
            <el-step :title="$i.login.text.resetPassword" ></el-step>
            <el-step :title="$i.login.text.finish" ></el-step>
        </el-steps>
    </div> -->
</template>
<script>
    export default {
        name: 'vheader',
        data() {
            return {
                list:[
                {
                    name: this.$i.login.text.inputEmail,
                    text: 'InputEmail'
                },
                {
                    name: this.$i.login.text.identify,
                    text: 'Identify'
                },
                {
                    name: this.$i.login.text.resetPassword,
                    text: 'ResetPassword'
                },
                {
                    name: this.$i.login.text.inputEmail,
                    text: 'Finish'
                }
               ]
            }
        },
        created() {
         
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
    header {
        display:flex;
        justify-content: space-between;
        height: 50px;
        box-sizing: border-box;
        padding:10px;
        border-bottom:2px solid #ebebeb;
        div {
            position:relative;
            margin:0 10px;
            padding:0 10px;
            color:#999;
            display: flex;
            align-items: center;
            font-size:16px;
            &::after {
                position: absolute;
                left:0;
                bottom:-12px;
                content:' ';
                width:100%;
                height: 2px;
            }
            &.active {
                color:#108ee9;
                span {
                    background:#108ee9;
                }
                &::after {
                    background:#108ee9;
                }
            }
            span {
                display:flex;
                align-items: center;
                justify-content: center;
                width: 25px;
                height: 25px;
                background:#999;
                color:#fff;
                border-radius: 50%;
                margin-right:10px;
                font-size:16px;
            }   
        }
    }
</style>


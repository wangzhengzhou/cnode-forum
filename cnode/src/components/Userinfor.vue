<template>
    <div class="user-infor">
        <div class="load" v-if="isloading">
            <img src="../assets/loading.gif" alt="" >
        </div>
        <div class="infor-header">
            <div class="us-header">主页/</div>
            <img :src="userinfor.avatar_url" alt="">
            <span class="ar-author">{{userinfor.loginname}}</span>
            <div>{{userinfor.score}}积分</div>
            <div>注册时间{{userinfor.create_at | formatDate}}</div>
        </div>
        <div class="topics">
            <div class="us-header">最近创建的话题</div>
            <ul>
                <li v-for="topic in topics">
                    <img :src="topic.author.avatar_url" alt="">
                    <router-link :to="{
                        name:'post-content',
                        params:{
                            id:topic.id
                        }
                    }">
                        <span class="title">{{topic.title}}</span>
                    </router-link>
                    <span class="last-reply">{{topic.last_reply_at | formatDate}}</span>
                </li>
            </ul>
        </div>

        <div class="replies">
            <div class="us-header">最近参与的话题</div>
            <ul>
                <li v-for="reply in replies">
                    <img :src="reply.author.avatar_url" alt="">
                    <router-link :to="{
                        name:'post-content',
                        params:{
                            id:reply.id
                        }
                    }">
                        <span class="title">{{reply.title}}</span>
                    </router-link>
                    <span class="last-reply">{{reply.last_reply_at | formatDate}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Userinfor',
        data(){
        return {
            isloading:false,
            userinfor:{},
            replies:{},
            topics:{},
        }
    },
    methods:{
        getdata(){
            console.log(this.$route.params.id)
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
                this.isloading=false,
                this.userinfor = res.data.data
                this.replies = this.userinfor.recent_replies
                this.topics = this.userinfor.recent_topics
                console.log(this.replies)
                console.log(this.topics)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.isloading = true;
        this.getdata()
    }

}
</script>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .us-header{
        line-height: 40px;
        background-color: #eee;
        font-size: 14px;
        padding-left: 10px;
    }
    .infor-header>.us-header{
        color: #80bd01;

    }
    .user-infor{
        color: #555;
        font-size: 14px;
    }
    .user-infor img{
        width: 40px;
        border-radius:4px;
        margin: 10px 0 -10px 10px;
    }
    .infor-header div{
        padding-left: 10px;
    }
    .infor-header{
        line-height: 40px;
        background-color: white;
    }
    .ar-author,.title,.last-reply{
        line-height: 40px;
        display: inline-block;
    }
    .title{
        margin-left: 10px;
    }
    li{
        list-style: none;
        line-height: 40px;
        position: relative;
    }
    .replies,.topics{
        margin-top: 20px;
        background-color: white;
    }
    .last-reply{
        position: absolute;
        right: 20px;
        top: 10px;
    }
    a{
        color: rgb(78, 78, 245);
    }

</style>



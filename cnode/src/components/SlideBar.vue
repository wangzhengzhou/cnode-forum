<template>
    <div class="slidebar">
         <div class="load" v-if="isloading">
            <img src="../assets/loading.gif" alt="" >
        </div>
        <div class="author">
            <div class="us-header">作者</div>
            <router-link :to="{
                        name:'user-infor',
                        params:{
                            name:this.$route.params.name
                        }
                    }">
                        <img :src="userinfor.avatar_url" alt="">
                        <span class="ar-author">{{userinfor.loginname}}</span>
                    </router-link>
        </div>
        <div class="topics">
            <div class="us-header">最近主题</div>
            <ul>
                <li v-for="topic in topicbar">
                    <router-link :to="{
                        name:'post-content',
                        params:{
                            id:topic.id
                        }
                    }">
                        <span class="title">{{topic.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="replys">
            <div class="us-header">最近回复</div>
            <ul>
                <li v-for="reply in  replybar">
                    <router-link :to="{
                        name:'post-content',
                        params:{
                            id:reply.id
                        }
                    }">
                        <span class="title">{{reply.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'SlideBar',
    data(){
        return{
            userinfor:{},
            replies:[],
            topics:[],
        }
    },
    computed:{
        topicbar(){
            if(this.topics){
                return this.topics.slice(0,5);
            }else{
                return this.topics
            }
        },
        replybar(){
            if(this.replies){
                return this.replies.slice(0,5);
            }else{
                return this.topics
            }
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
    li{
        list-style: none;
        line-height: 30px;
        padding-left:10px;  
    }
    ul{
        background-color:white;
    }
    a{
        color: #888;
        font-size: 14px;
    }
    .us-header{
        line-height: 30px;
        background-color: #eee;
        font-size: 14px;
        padding-left:10px;  
    }
    img{
        width: 40px;
        margin:10px 10px -10px ;
    }
    .title{
        display:inline-block; 
        width: 95%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .slidebar>div{
        margin-bottom: 20px;
    }
    .author{
        background-color: white;
        width: 100%;
    }
    .author{
        display: inline-block;
        line-height: 40px;
    }
</style>


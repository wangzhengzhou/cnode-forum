<template>
    <div class="article">
        <div class="load" v-if="isloading">
            <img src="../assets/loading.gif" alt="" >
        </div>
        <div class="ar-header" v-else>
            <div class="top-title">
                <span class="art-top">{{post | formatter}}</span>
                <span class="art-title">{{post.title}}</span>
            </div>
            <ul class="art-infor">
                <li>发布于{{post.last_reply_at | formatDate}}</li>
                <li>作者{{post.author.loginname}}</li>
                <li>{{post.visit_count}}次浏览</li>
                <li>来自{{post | formatter}}</li>
            </ul>
            <div  class="art-content" v-html="post.content">
        </div>
        </div>
        <div class="reply">
            <span>{{replys.length}}回复</span>
            <ul>
                <li v-for="(reply,index) in replys">
                    <router-link :to="{
                        name:'user-infor',
                        params:{
                            name:reply.author.loginname
                        }
                    }">
                        <img :src="reply.author.avatar_url" alt="">
                    </router-link>
                    <router-link :to="{
                        name:'user-infor',
                        params:{
                            name:reply.author.loginname
                        }
                    }">
                        <span class="ar-author">{{reply.author.loginname}}</span>
                    </router-link>
                    <span class="index">{{index + 1}}楼{{post.last_reply_at | formatDate}}</span>
                    <span>{{post | formatDate}}</span>
                    <div>
                        <p v-html="reply.content"></p>
                    </div>
                    <span v-if="reply.ups.length" class="ar-ups"><a href="" class="icon-ups"></a>{{reply.ups.length}}</span>
                    <span v-else></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Article',
    data(){
        return {
            isloading:false,
            post:{},
            replys:[],
        }
    },
    methods:{
        getdata(){
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then(res=>{
                this.isloading=false,
                this.post = res.data.data
                this.replys = this.post.replies
                //console.log(this.post)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.isloading = true;
        this.getdata()
    },
    watch:{
        '$route'(to,from){
            this.getdata()
        }
    }
    
}
</script>

<style>
    @import url('//at.alicdn.com/t/font_1105335_wo7y74ussub.css');
    @import url('../assets/markdown-github.css');
    .load{
        background-color: white;
        text-align: center;
    }
    .art-top{
        padding: 3px;
        font-size: 12px;
        color: white;
        background-color:#80bd01;
        border-radius: 3px; 
    }
    .ar-header{
        background-color: white;
        margin-bottom:20px; 
    }
    .article{
        padding-left:10px; 
    }
    .art-infor>li{
        float: left;
        margin-left:20px; 
    }
    .art-title{
        font-size: 23px;
        font-weight: bold;
    }
    .art-infor{
        font-size: 12px;
        color:#888;
        height: 40px;
        border-bottom:1px solid #ddd 
    }
    .art-infor::after{
        content: '';
        display: block;
        clear: both;
    }
    .top-title{
        line-height: 50px;
        padding-left:10px; 
    }
    .art-content{
        line-height: 30px;
        margin-top: 10px;
        margin-left: 10px;
        color: #444;
        width: 90%;
    }
    .art-content img{
        width: 92% !important;
    }
    .reply{
        background-color: #f1f1f1;
        padding-left:10px;
        line-height:30px;  
    }
    .reply>ul{
        list-style: none;
    }
    .reply img{
        width: 30px;
    }
    .reply>span{
        font-size: 13px;
    }
    .ar-author{
        font-size: 12px;
        color: #666;
        margin-left:10px; 
    }
    .ar-ups{
        float: right;
        right: 20px;
        margin-top:-30px;
        margin-right:20px; 
    }
    .reply li::after{
        content: '';
        display: block;
        clear: both;
    }
    .reply img{
        float: left;
        border-radius:3px; 
        margin-top:10px; 
    }
    .reply p{
        margin-left:25px; 
        color: #444;
    }
    .index{
        font-size:12px; 
    }
    .icon-ups{
        font-family: 'iconfont';
        color:#444;
        text-decoration: none;
    }

    a{
        text-decoration: none;
    }
</style>



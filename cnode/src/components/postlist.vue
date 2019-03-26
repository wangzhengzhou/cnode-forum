<template>
    <div class="postlist">
        <div class="load" v-if="isloading">
            <img src="../assets/loading.gif" alt="" >
        </div>
        <div v-else>
            <ul class="header">
                <li>
                    <button v-for="page in pageclass" :class="['act',{active : page ==activeeq }]" @click="changeclass(page)">{{page}}</button>
                </li>
            </ul>
            <ul class="post-main">
                <li v-for="post in posts">
                    <img :src="post.author.avatar_url" alt="">
                    <span class="reply">{{post.reply_count}}
                        /<span class="visit">{{post.visit_count}}</span>
                    </span>
                    <span :class="[{good:(post.good == true),top:(post.top == true),tab:(post.good !=true && post.top != true)}]">
                        <span>{{post | formatter}}</span>
                    </span>
                    <router-link :to="{name:'post-content',params:{id:post.id,name:post.author.loginname}}">                    
                        <span class="title">{{post.title}}</span>
                    </router-link>
                    <span class="last-reply">{{post.last_reply_at | formatDate}}</span>
                </li>
            </ul>
        </div>
        <Pagin class="page" @change="changepage"></Pagin>
    </div>
</template>
<script> 
import $ from 'jquery'
import Pagin from './Pagin'
export default {
    name:'Postlist',
    data(){
        return {
            isloading:false,
            posts:{},
            postpage:1,
            tabs:'',
            activeeq:'全部',
            pageclass:['全部','精华','分享','问答','招聘','客户端测试'],
            }
    },
    components:{
        Pagin,
    },
    methods:{
        getdata(){
            this.$http.get('https://cnodejs.org/api/v1/topics',{
                params:{
                    page:this.postpage ,
                    limit:20,
                    tab:this.tabs
                }
            })
            .then(res=>{
                this.isloading=false,
                this.posts = res.data.data
                console.log(this.posts)
            })
            .catch(err=>{
                console.log(err)
            })
        },

        changepage(value){
            this.postpage = value,
            this.getdata()
        },

        changeclass(page){
            this.activeeq = page
            switch(page){
                case '全部':this.tabs = '';break;
                case '精华':this.tabs = 'good';break;
                case '分享':this.tabs = 'share';break;
                case '问答':this.tabs = 'ask';break;
                case '招聘':this.tabs = 'job';break;
                default:break;
            }

            this.getdata()
            console.log(this.tabs)
        }
    },
    beforeMount(){
        this.isloading = true;
        this.getdata();
    }
}
</script>
<style scoped>
    .page{
    box-sizing: border-box;
    margin:10px 0;
    background-color: white;
    padding:10px 0 10px 10px;
    }

    .post-main{
        list-style: none;
        position: relative;
    }
    li>img{
        width: 30px;
        border-radius: 4px;
        margin-left:10px;
        margin-bottom: -10px;
    }
    .title{
        line-height: 30px;
        display: inline-block;
        width:65%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom:-10px ;
        color: #222;
    }
    .visit{
        color: #bbb;
    }
    .reply{
        line-height: 40px;
        color: #666;
        font-size: 12px;
        display: inline-block;
        width: 100px;
        text-align: center;
    }
    .post-main li{
        border-bottom: 1px solid #ddd;
        background-color: white;
    }
    .last-reply{
        position: absolute;
        line-height: 40px;
        font-size: 12px;
        right: 20px;
    }
    .good,.top{
        padding: 3px;
        font-size: 12px;
        color: white;
        background-color:#80bd01;
        border-radius: 3px; 
    }
    .tab{
        padding: 3px;
        font-size: 12px;
        color: #888;
        background-color: #ccc;
        border-radius: 3px; 
    }
    .header{
        border: none;
        background-color: #eee;
        line-height: 40px;
        font-size:13px; 
        list-style: none;
    }
    .act{
        text-decoration: none;
        color: #80bd01;
        margin-left: 30px;
        border-radius:3px; 
        padding: 3px;
        border:none;
        background: none;
    }
    .active{
        background-color: #80bd01;
        color: white;
    }

</style>



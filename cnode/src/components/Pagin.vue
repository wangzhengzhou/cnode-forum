<template>
    <div class="pagin">
        <button class="btn" @click="show">首页</button>
        <button class="btn" @click="show">上一页</button>
        <button v-if="push=push" class="btn">......</button>
        <button class="btn" v-for="page in pagins" :class="[{currentpage :page == currentpage},'btn']" @click="show(page)">{{page}}</button>
        <button class="btn" @click="show">下一页</button>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name:'Pagin',
    data(){
        return{
            pagins:[1,2,3,4,5,'......'],
            currentpage:1,
            push:false,
        }
    },
    methods:{
        show(page){
            if (typeof page !=='number'){
                switch(page.target.innerText) {
                case'上一页': $('button.currentpage').prev().click();break;
                case'下一页': $('button.currentpage').next().click();break;
                case'首页': this.pagins = [1,2,3,4,5,'......'];this.show(1); break;
                default:break;
                }
                return;
            }

            this.currentpage = page
            if (page==this.pagins[4]){
                this.pagins.shift()
                this.pagins.splice(4,0,page+1)
            }else if(page == this.pagins[0]&&page!=1){
                this.pagins.unshift(page-1)
                this.pagins.splice(5,1)
            }

            if(page > 4){
                this.push = true
            }else{
                this.push = false
            }
            
            this.$emit('change',page)
        }
    }
}
</script>
<style>
.btn{
    background-color:white;
    border: 1px solid #ccc;
    border-radius: 3px; 
    display:inline-block;
    width: 50px;
    line-height: 30px;
    font-size: 15px; 
}
.currentpage{
    background-color: #333;
    color: white;
}
</style>



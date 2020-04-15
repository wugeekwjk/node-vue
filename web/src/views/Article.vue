<template>
  <div class="article" v-if="model">
    <div class="header d-flex py-2 border-bottom">
      <i class="iconfont text-blue icon-Back px-2 fs-xl" @click="goBack()"></i>
      <div class="flex-1 text-blue fs-lg text-ellipsis"><strong>{{model.title}}</strong></div>
      <div class="text-grey mr-1">{{model.updatedAt | date}}</div>
    </div>
    <div class="body fs-xl">
      <div v-html="model.body"></div>
    </div>
    <div class="footer">
      <div class="up d-flex ai-center">
        <i class="iconfont icon-menu1 fs-xl"></i>
        <div  class="text-blue fs-lg felx-1 ml-1">相关资讯</div>
      </div>
      <div class="down">
        <div v-for="(relatedItem,i) in model.relates" :key="i" >
        <router-link tag="div" :to="`/articles/${relatedItem._id}`" class="d-flex al-center" >
          <div class="my-2 ml-1 text-ellipsis flex-1">{{relatedItem.title}}</div>
          <div class="my-2 mr-1 text-grey">{{relatedItem.updatedAt | date}}</div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  props:{
    id:{type:String, required:true}
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY/MM/DD')
    }
  },
  data(){
    return{
      model:null
    }
  },
  watch:{
    id(){
      this.fetchArticles()
    }
  },
  methods:{
    async fetchArticles(){
      const res = await this.$http.get(`/articles/${this.id}`)
      this.model = res.data
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  created(){
    this.fetchArticles()
  }
}
</script>
<style lang="scss">
.article{
  .icon-Back{
      font-size: 1.6923rem;
    }
  .body{
    p{
      line-height: 1.5em;
    }
    img{
      width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>

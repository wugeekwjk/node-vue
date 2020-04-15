<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/swiper1.jpeg" class="w-100" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/swiper2.jpeg" class="w-100" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/swiper3.jpeg" class="w-100" >
      </swiper-slide>
      <div class="swiper-pagination paginaton-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <nav-item></nav-item>
    

    <m-list-card title="新闻资讯" icon="menu1" :categories="newsCart">
      <template #items="{category}">
        <div class=" parent py-2 fs-lg ai-center" v-for="(item,i) in category.newsList" :key="i">
          <router-link tag="div" :to="`articles/${item._id}`" class="content">
            <span class="text-info">[{{item.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="title text-dark">{{item.title}}</span>
            <span class="time text-grey-1 fs-sm">{{item.updateAt | date}}</span>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
    <m-list-card title="英雄列表" icon="card-hero" :categories="heroCart">
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <div style="width:20%" class="text-center p-2 fs-sm" v-for="(item,i) in category.heroList" :key="i">
            <router-link tag="div" :to="`heros/${item._id}`">
              <img :src="item.avatar" class="w-100">
              <div>{{item.name}}</div>
            </router-link>
          </div>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import NavItem from '../components/NavItem'
export default {
  components:{
    NavItem
  },
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  name: 'Home',
   data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.paginaton-home'
          },
          autoplay:true
        },
        newsCart:[],
        heroCart:[]
      }
  },
  methods:{
    async fetchCats(){
      const res = await this.$http.get('/news/list')
      this.newsCart = res.data
    },
    async fetchHeros(){
      const res = await this.$http.get('/heros/list')
      this.heroCart = res.data
    },
  },
  created(){
    this.fetchHeros()
    this.fetchCats()
  }
  }
</script>
<style lang="scss">
@import '../assets/scss/variables.scss';
.paginaton-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background-color:map-get($map: $colors, $key:'white');
    &.swiper-pagination-bullet-active{
      background: map-get($map:$colors, $key:'info');
    }
  }
}

.nav-icons{
  .nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
  }
}
// .title{
//   // display: inline-block;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   width: 20rem;
//   line-height: 16px;
//   height: 16px;
// }
.content{
  display: inline-block;
  width: 90%;
  height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.parent{
  position: relative;
}
.time{
    position: absolute;
    top:6px;
    right: 0;
    color: red($color: #000000);
    z-index: 999;
  }


</style>
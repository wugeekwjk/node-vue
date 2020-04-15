<template>
  <div class="hero" v-if="model">
    <div class="topbar bg-black py-2 text-white px-3 d-flex ai-cneter">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1 text-white py-2">
        <span class="text-white">王者荣耀</span>
        <span class="mt-1 ml-3">攻略站</span>
      </div>
      <router-link tag="div" to="/" class="py-2">
        更多英雄&nbsp;&nbsp;&nbsp;
        <strong class="fs-xl">&gt;</strong>
      </router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info p-3 text-white d-flex flex-column jc-end h-100">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>

    <div>
      <div class="bg-white pt-3 pb-2">
        <div class="nav jc-around pb-2">
          <div class="nav-item active">
            <router-link class="nav-link" tag="div" to="/">英雄初识</router-link>
          </div>
          <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/">进阶攻略</router-link>
          </div>
        </div>
        <div class="border-bottom px-2"></div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
              <div class="profile bg-white border-bottom">
                  <div class="d-flex text-center jc-around ai-center pt-2">
                      <router-link tag="button" to="/" class="py-2 px-3 d-flex ai-center flex-1 ml-2 border" style="background-color:#fcfcfc;">
                          <i class="iconfont icon-menu1 text-primary icon"></i>
                          <span class="fs-lg ml-2">英雄介绍视频</span>
                      </router-link>
                      <router-link tag="button" to="/" class="py-2 px-3 d-flex ai-center flex-1 mx-2 bordr" style="background-color:#fcfcfc;" >
                          <i class="iconfont icon-menu1 text-primary icon"></i>
                          <span class="fs-lg ml-2">一图识英雄</span>
                      </router-link>
                  </div>
                  <div class="skill d-flex jc-around mt-5">
                      <img v-for="(skill,index) in model.skills" 
                      :key="skill._id" 
                      :src="skill.icon" 
                      width="65" height="65" 
                      :class="{active:index === currentIndex}"
                      @click="() => currentIndex = index"
                      >
                  </div>
                  <div v-if="currentSkill" class="d-flex ai-center mt-1">
                      <h3 class="ml-2">{{currentSkill.name}}</h3>
                      <span class="ml-3 text-grey fs-sm">(冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})</span>
                  </div>
                  <div class="text-dark mx-2 text-left fs-lg">
                      <p>
                          {{currentSkill.description}}
                      </p>
                  </div>
              </div>
              <div class="items bg-white mt-3">
                  <div class="d-flex ai-center">
                      <i class="iconfont icon-menu1"></i>
                      <h3 class="ml-1" style="font-size:1.3846rem;">出装推荐</h3>
                  </div>
                  <div>
                      <div class="fs-xl ml-2 text-dark-1">顺风出装</div>
                      <div class="d-flex jc-around mx-2 mt-3 pb-1">
                          <div v-for="item in model.items1" :key="item._id">
                              <img :src="item.icon" width="45" height="45" style="border-radius:50%;">
                              <div>{{item.name}}</div>
                          </div>
                      </div>
                      <div class="border-bottom px-2"></div>
                      <div class="fs-xl ml-2 text-dark-1 mt-3">逆风出装</div>
                      <div class="d-flex jc-around mx-2 mt-3 pb-1">
                          <div v-for="item in model.items2" :key="item._id">
                              <img :src="item.icon" width="45" height="45" style="border-radius:50%;">
                              <div>{{item.name}}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="mt-3 bg-white pt-3 ">
                  <div class="d-flex ai-center">
                      <i class="iconfont icon-menu1 ml-2"></i>
                      <div style="font-size:1.3846rem;" class="ml-1">使用技巧</div>
                  </div>
                  <div class="px-2 pb-1">
                      <p>{{model.usageTips}}</p>
                  </div>
              </div>
              <div class="mt-3 bg-white pt-3 ">
                  <div class="d-flex ai-center">
                      <i class="iconfont icon-menu1 ml-2"></i>
                      <div style="font-size:1.3846rem;" class="ml-1">对抗技巧</div>
                  </div>
                  <div class="px-2 pb-1">
                      <p>{{model.battleTips}}</p>
                  </div>
              </div>
              <div class="mt-3 bg-white pt-3 ">
                  <div class="d-flex ai-center">
                      <i class="iconfont icon-menu1 ml-2"></i>
                      <div style="font-size:1.3846rem;" class="ml-1">团战思路</div>
                  </div>
                  <div class="px-2 pb-1">
                      <p>{{model.teamTips}}</p>
                  </div>
              </div>
              <div class="items bg-white mt-3">
                  <div class="d-flex ai-center">
                      <i class="iconfont icon-menu1"></i>
                      <h3 class="ml-1" style="font-size:1.3846rem;">英雄关系</h3>
                  </div>
                  <div>
                      <div class="fs-xl ml-2 text-dark-1">最佳搭档</div>
                      <div class="mx-2 mt-3 pb-1">
                          <div v-for="hero in model.partners" :key="hero._id" class="d-flex jc-around ai-center">
                              <img :src="hero.hero.avatar" width="48" height="48">
                              <p class="ml-2">{{hero.description}}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      model: null,
      currentIndex:0,
    };
  },
  computed:{
      currentSkill(){
          return this.model.skills[this.currentIndex]
      }
  },
  methods: {
    async fetchHeros() {
      const res = await this.$http.get(`/heros/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetchHeros();
  }
};
</script>
<style lang='scss'>
@import '../assets/scss/variables.scss';
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-radius: 50%;
      font-size: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
.profile{
    .icon{
        font-size: 20px;
    }
}
.skill{
    img{
        border: 3px solid white;
        border-radius: 45%;
        &.active{
            border: 3px solid map-get($map: $colors, $key:'primary' );
        }
    }
}
</style>

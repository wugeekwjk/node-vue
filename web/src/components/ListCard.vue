<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" v-for="(category,i) in categories" :key="i" :class="{active:active===i}" @click="IndexChang(i)">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-2">
      <swiper ref="mySwiper" @slide-change="() => active = $refs.mySwiper.$swiper.realIndex" :options="{autoHeight:true}">
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array}
  },
  data(){
    return {
      active: 0
    }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
  methods:{
    IndexChang(i){
      this.active = i
      this.swiper.slideTo(i, 500, false)
    }
  }
};
</script>

<style>
</style>

<template>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center fs-xl pb-3">
        <i class="iconfont icon-menu1" :class="`icon-${icon}`"></i>
        <span class="flex-1 mx-3">{{title}}</span>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body mt-3">
          <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{type:String, required:true},
        icon:{type:String, required:true}
    }
}
</script>
<style lang="scss">
@import '../assets/scss/variables.scss';
.card-header{
    border-bottom: 1px solid $border-color;
}
</style>
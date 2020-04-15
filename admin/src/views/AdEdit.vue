<template>
<div>
    <h1>{{ id ? '编辑' : '新增'}}广告位</h1>
    <el-form label-width="130px" label-position="center" @submit.native.prevent="save()">
        <el-form-item label="名称">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="广告">
            <el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            <el-row type="flex">
                <el-col :span="24" v-for="(item, index) in model.items" :key="index">
                    <el-form-item label="跳转链接（URL）">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" style="margin-top:1rem;">
                        <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'/upload'"
                        :headers="getHeader()"
                        :show-file-list="false"
                        :on-success="res => $set(item,'image',res.url)"
                        >
                        <img v-if="item.image" :src="item.image" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="() => model.items.splice(i,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{
                items:[]
            },
        }
    },
    methods:{
        async save(){
            if(this.id){
                await this.$http.put(`rest/ads/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/ads',this.model)
            }
            this.$router.push('/ads/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
          const res = await this.$http.get(`rest/ads/${this.id}`)
          console.log(res.data)
          this.model = Object.assign({},this.model,res.data)
        },
    },
    created(){
        this.id && this.fetch()
    }   
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
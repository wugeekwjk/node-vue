<template>
  <div>
    <h1>{{ id ? '编辑' : '新增'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getHeader()"
              :show-file-list="false"
              :on-success="res => $set(this.model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getHeader()"
              :show-file-list="false"
              :on-success="res => $set(this.model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              :max="10"
              show-score
              style="margin-top:0.6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="10" show-score style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="10" show-score style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="10" show-score style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skill">
            <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加</el-button>
            <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :span="24" v-for="(item, index) in model.skills" :key="index">
                    <el-form-item label="名称">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'/upload'"
                        :headers="getHeader()"
                        :show-file-list="false"
                        :on-success="res => $set(item,'icon',res.url)"
                        >
                        <img v-if="item.icon" :src="item.icon" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="冷却值">
                        <el-input v-model="item.delay"></el-input>
                    </el-form-item>
                    <el-form-item label="消耗">
                        <el-input v-model="item.cost"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="item.description"></el-input>
                    </el-form-item>
                    <el-form-item label="小提示">
                        <el-input type="textarea" v-model="item.tips"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="() => model.skills.splice(i,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partner">
            <el-button type="text" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
            <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :span="24" v-for="(item, index) in model.partners" :key="index">
                    <el-form-item label="名称">
                        <el-select v-model="item.hero" filterable>
                          <el-option v-for="hero in heros" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="item.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="() => model.partners.splice(i,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top:1rem;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        scores: {},
        skills:[],
        partners:[]
      },
      categories: [],
      items: [],
      heros:[]
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.$set(this.model, "avatar", res.url);
      // this.model.icon = res.url
    },
    async fetchHeros(){
      const res = await this.$http.get('rest/heros')
      this.heros = res.data
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
        this.model = Object.assign({},this.model,res.data)
    },
    async fetchCategory() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItem() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchHeros()
    this.fetchItem();
    this.fetchCategory();
    this.id && this.fetch();
  }
};
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
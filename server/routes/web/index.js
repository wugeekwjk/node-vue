module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Article = require('../../models/Article')
    const Category = require('../../models/Category')
    const Hero = require('../../models/Hero')

    //导入新闻数据
    // router.get('/news/init',async(req,res) => {
    //     const parent = await Category.findOne({
    //         name:'新闻分类'
    //     })
    //     const cats = await Category.find().where({parent:parent}).lean()
    //     const newsTitles = ["体验服爆料丨廉颇未老，尚能战斗！老将廉颇重返巅峰", "新皮肤爆料丨拔刀斩恶魂！橘右京新装登场~", "豪横！王者荣耀英雄主打歌完整歌单霸气登陆酷狗！", "蔡文姬繁星吟游皮肤，史诗升级进行时！", "冷艳御姐是如何练成的？参与「镜」主题创作赢荣耀水晶", "4月5日开服及奖励通知", "QQ消息同步功能介绍及问题说明", "4月9日体验服不停机更新公告", "4月8日净化游戏环境声明及处罚公告", "4月8日“演员”惩罚名单", "橘右京全新史诗皮肤上架 SNK皮肤齐聚峡谷福利大放送", "【预告】荣耀中国节·轻风戏纸鸢，参与必得纸鸢回城特效（永久）", "参与“S19战令集结号”，赢80级直升经验大礼", "【镜界诞生 见证觉醒】活动公告", "S19赛季来临 多重好礼邀你开启全新赛季", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌", "为战队争夺荣誉！城市联赛战队赛通道报名开启！", "高校联赛分站赛即将打响 今年又有多少好玩的活动值得期待？", "《一招即浪》第一期：白起强势归来，教你如何化身“边路杀神”", "KPL王者荣耀职业联赛4月4日比赛停赛公告"]
    //     const newsList = newsTitles.map(title => {
    //         const randomCats = cats.slice(0).sort((a,b) => Math.random()-0.5)
    //         return{
    //             categories:randomCats.slice(0,2),
    //             title:title
    //         }
    //     })
    //     await Article.deleteMany()
    //     await Article.insertMany(newsList)
    //     res.send(newsList)
    // })

    //web端请求新闻数据
    router.get('/news/list',async(req,res) => {
        // const parent = await Category.findOne({
        //     name:'新闻分类'
        // }).populate({
        //     path:'children',
        //     populate:{
        //         path:'newsList'
        //     }
        // }).lean()

        const parent = await Category.findOne({
            name:'新闻分类'
        })
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'newsList'
                }
            },
            {
                $addFields:{
                    newsList:{$slice:['$newsList',5]}
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name:'热门',
            newsList:await Article.find().where({categories:{$in:subCats}}).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门'? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })

    //导入英雄数据
    // router.get('/heros/init',async(req,res) => {
    //     const rowData = 
    //     for(let cat of rowData){
    //         if(cat.name === '辅助'){
    //             const category = await Category.findOne({
    //                 name:cat.name
    //             })
    //             cat.heros.map(hero => {
    //                 hero.categories = [category]
    //                 return hero
    //             })
    //             await Hero.insertMany(cat.heros)
    //         }else{
    //             continue
    //         }
    //     }
    //     res.send(await Hero.find())
    // })

    //web端请求英雄数据
    router.get('/heros/list',async(req,res) => {
        const parent = await Category.findOne({
            name:'英雄分类'
        })
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'heroes',
                    localField:'_id',
                    foreignField:'categories',
                    as:'heroList'
                }
            },
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name:'热门',
            heroList:await Hero.find().where({categories:{$in:subCats}}).limit(10).lean()
        })
        res.send(cats)
    })

    //查询文章
    router.get('/articles/:id',async(req,res) => {
        const data = await Article.findById(req.params.id).lean()
        data.relates = await Article.find().where({categories:{$in:data.categories}}).limit(2)
        res.send(data)
    })
    //查询英雄
    router.get('/heros/:id',async(req,res) => {
        const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean()
        res.send(data)
    })
    app.use('/web/api',router)
}
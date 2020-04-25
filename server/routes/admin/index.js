module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const authMiddelWare = require('../../middleware/auth')
    const resMiddelWare = require('../../middleware/resource')

    //新建分类
    router.post('/',async(req, res) =>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //编辑分类
    router.put('/:id',async(req, res) =>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    //删除分类
    router.delete('/:id',async(req, res) =>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })

    //请求分类数据
    router.get('/',async(req,res) =>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //根据id查询某一分类
    router.get('/:id',async(req,res) =>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource',authMiddelWare(),resMiddelWare(),router)

    //上传图片
    const multer = require('multer')
    const upload = multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),authMiddelWare(),async(req, res) =>{
        const file = req.file
        file.url = `http://wjk.lanzhou-up.top/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login',async (req, res) => {
       const {username, password} = req.body
       const AdminUser = require('../../models/AdminUser')
       //1.从数据库中查找的用户
       const user = await AdminUser.findOne({username}).select('+password')
       assert(user,422,'用户不存在')
        const isVaild = require('bcrypt').compareSync(password,user.password)
        assert(isVaild,422,'密码错误')
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({
            token
        })
    })

    app.use(async(error, req, res, next) => {
        res.status(error.status || 500).send({
            message:error.message
        })
    })
}
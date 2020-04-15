const jwt = require('jsonwebtoken')
const assert = require('http-assert')
module.exports = options => {
    return async(req,res,next) => {
        assert(req.headers.authorization,401,'请先登录')
        const token = req.headers.authorization.toString().split(' ').pop()
        assert(token,401,'用户不存在')
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'用户不存在')
        const AdminUser = require('../models/AdminUser')
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'用户不存在')
        next()
    }
}
const express = require('express')

const app = express()
app.set('secret', '2rwbjch')
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))
app.use(require('cors')())
app.use(express.json())

require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)


app.listen(3000,() => {
    console.log('服务端启动成功')
})
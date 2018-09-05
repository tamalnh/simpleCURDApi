const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors')
const contactApiRoute = require('./api/route/contactRoute');
const userApiRoute = require('./api/route/userRoute')
const config = require('./api/config/config');
const mongoose = require('mongoose')
const App = express();


const PORT = process.env.PORT || 3030

mongoose.connect(config.DBURL, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connected....')
}).catch(err => {
    console.log(`Database connection faild ${err}`)
})
mongoose.Promise = global.Promise;



App.use(cors())
App.use(bodyParser.urlencoded({extended: false}))
App.use(bodyParser.json())

App.use('/api/contacts', contactApiRoute)
App.use('/api/user', userApiRoute)

App.use((req, res, next) => {
    let error = new Error('error occurred');
        error.status = 404;
    
    next(error);

})

App.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error
    })
})




App.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
    
})

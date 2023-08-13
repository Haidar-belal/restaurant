const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/resturant/categories', require('./routes/category'));
app.use('/resturant/items', require('./routes/item'));
app.use('/resturant/tags', require('./routes/tag'));
app.use('/resturant/ingredients', require('./routes/ingredient'));
app.use('/resturant/users', require('./routes/auth'));
app.get('/resturant',(req,res)=>{
    return res.json("welcome to our Resurant app!" );
})

app.listen({ port: 3000, }, async () => {
    // { focus: true }
     //await sequelize.sync();
    await sequelize.authenticate();
    console.log('starting');
});
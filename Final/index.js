const express = require('express');
const app = express();
const ehbs = require('express-handlebars');

app.engine('hbs', ehbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname +  '/view/partials'
}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created');
    })
});

app.use('/', require('./routes/indexRoute'));
app.use('/nhaxe', require('./routes/nhaxeRoute'));
app.use('/chuyenxe', require('./routes/chuyenxeRoute'));
app.use('/timkiem', require('./routes/timkiemRoute'));
app.use('/datve', require('./routes/datveRoute'));
app.use('/taikhoan', require('./routes/taikhoanRoute'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});
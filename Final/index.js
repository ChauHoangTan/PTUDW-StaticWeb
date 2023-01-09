const express = require('express');
const app = express();
const ehbs = require('express-handlebars');
const helper = require('./controllers/helper');
const paginateHelper = require('express-handlebars-paginate')


app.engine('hbs', ehbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname +  '/view/partials',
    helpers: {
        toFixed: helper.toFixed,
        generateStarList: helper.generateStarList,
        createPagination: paginateHelper.createPagination,
        generateSeat : helper.generateSeat,
        parseToDate: helper.parseToDate,
        calculateTimeEnd: helper.calculateTimeEnd,
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/createTables', (req, res) => {
    
    var generateData = require('./seeders/data/generateData')
    

    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send(`tables created `);
    })
});

app.use('/', require('./routes/indexRoute'));
app.use('/nhaxe', require('./routes/nhaxeRoute'));
app.use('/chuyenxe', require('./routes/chuyenxeRoute'));
app.use('/timkiem', require('./routes/timkiemRoute'));
app.use('/chuyenxe/:id/datve', require('./routes/datveRoute'));
app.use('/taikhoan', require('./routes/taikhoanRoute'));
app.use('/taikhoan/lichsudatve', require('./routes/lichsudatveRoute'));
app.use('/login',require('./routes/loginRoute'))

// admin routes
app.use('/Dashboard', require('./routes/admin/DashboardRoute'));
app.use('/QL_DatCho', require('./routes/admin/QL_DatChoRoute'));
app.use('/QL_NhaXe', require('./routes/admin/QL_NhaXeRoute'));
app.use('/QL_TuyenXe', require('./routes/admin/QL_TuyenXeRoute'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);

});



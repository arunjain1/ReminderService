const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        sendBasicEmail(
            '"Support" <support@gmail.com>',
            'profilebuildingsessions@gmail.com',
            'This is a testing email',
            'Hey, How are you,I hope you like our services'
        )
    });
}

setupAndStartServer();
// https://sequelize.org/

// "start": "node index.js",
// "dev": "nodemon index.js"

// ******* heroku *******
// git add .
// git commit -m "commint message"
// git push heroku master

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const sequelize = require('./database/db')
const bcrypt = require('bcrypt')

const app = express();



app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


const Project = require('./models/Project');
const Tool_p = require('./models/Tool_p');
const Tool_u = require('./models/Tool_u');
const User = require('./models/User');
const Participant = require('./models/Participant');

const Message = require('./models/Message');





var Users = require('./routes/Users');
app.use('/users', Users);

const projects = require('./routes/Projects.js');
app.use(projects);

const tools = require('./routes/Tools.js');
app.use(tools);

const messages = require('./routes/Messages.js');
app.use(messages);




Project.hasMany(Tool_p)

Project.hasMany(Participant)
Participant.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });

Project.hasMany(Message)

User.hasMany(Project)

User.hasMany(Participant)
Participant.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Message)
Message.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Tool_u)







sequelize
    .sync({ force: false })
    .then(results => {

        app.listen(port, function () {
            console.log('Server is running on port: ' + port)
        })
    })
    .catch(err => {
        console.log(err);
    })
















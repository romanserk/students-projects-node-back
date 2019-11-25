// https://sequelize.org/

// "start": "node index.js",
//     "dev": "nodemon index.js"

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


const Message = require('./models/Message');
const Participant = require('./models/Participant');
const Project = require('./models/Project');
const Reply = require('./models/Reply');
const Tool_p = require('./models/Tool_p');
const Tool_u = require('./models/Tool_u');
const User = require('./models/User');



var Users = require('./routes/Users');
app.use('/users', Users);

const projects = require('./routes/Projects.js');
app.use(projects);

const tools = require('./routes/Tools.js');
app.use(tools);




Project.hasMany(Tool_p)
Tool_p.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });

Project.hasMany(Participant)
Participant.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });

Project.hasMany(Message)
Message.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Project)
Project.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Participant)
Participant.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Tool_u)
Tool_u.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

Message.hasMany(Reply)
Reply.belongsTo(Message, { constraints: true, onDelete: 'CASCADE' });




sequelize
    .sync({ force: true })
    .then(results => {

        User.findByPk(1)
            .then(user => {
                if (!user) {
                    generateDummyUsers()
                }
            })
        app.listen(port, function () {
            console.log('Server is running on port: ' + port)
        })
    })
    .catch(err => {
        console.log(err);
    })


















const generateDummyUsers = () => {
    const today = new Date()
    let newUsers = new Array(4).fill({});
    const userNames = ['user one', 'user two', 'user three', 'user four']
    const userMails = ['userone@gmail.com', 'usertwo@gmail.com', 'userthree@gmail.com', 'userfour@gmail.com']


    bcrypt.hash('1', 10, (err, hash) => {

        // each newUsers create dumy user
        Promise.all(newUsers.map((elemU, index) => {
            return (User.create({
                user_name: userNames[index],
                email: userMails[index],
                password: hash,
                created: today
            }))
        })).then(values => {
            createDummyProjects()
        }).catch(err => {
            console.log(err);
        });
    })

}


const createDummyProjects = () => {

    const projects = [
        project_one = {
            project: {
                project_name: "project one",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum sem eget fermentum interdum. Sed eleifend elit a ex tincidunt, vitae dictum velit mollis. Vivamus at ex orci. Suspendisse tortor quam, laoreet quis interdum eget, consequat facilisis erat. Praesent aliquam, urna non placerat ornare, urna eros fringilla nunc, ut ornare ligula ante at lectus. Ut et risus sagittis, porttitor urna quis, sollicitudin justo. Duis at nibh ut lectus venenatis ultrices at a sapien.",
                user_name: "user one",
                userID: 1
            },
            tools: [
                {
                    projectID: 1,
                    tool: "tool_one"
                },
                {
                    projectID: 1,
                    tool: "tool_two"
                },
                {
                    projectID: 1,
                    tool: "tool_three"
                },
                {
                    projectID: 1,
                    tool: "tool_four"
                },
            ]
        },
        project_two = {
            project: {
                project_name: "project two",
                description: "In lacinia malesuada dapibus. Pellentesque tempus velit in efficitur finibus. In sagittis convallis vestibulum. Donec ut mauris a ipsum fringilla feugiat id a purus. Integer at tincidunt lacus, sed semper velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                user_name: "user one",
                userID: 11
            },
            tools: [
                {
                    projectID: 11,
                    tool: "tool_1"
                },
                {
                    projectID: 11,
                    tool: "tool_2"
                },
                {
                    projectID: 11,
                    tool: "tool_3"
                }
            ]
        },
        project_three = {
            project: {
                project_name: "project three",
                description: "Vivamus nec dui diam. Nunc volutpat a quam nec tincidunt. Suspendisse vitae hendrerit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In eros nisl, ultricies a sapien ac, viverra tincidunt nulla. Sed porta, sapien id egestas consectetur, quam ante aliquam ligula, a blandit mi nisi id magna.",
                user_name: "user two",
                userID: 21
            },
            tools: [
                {
                    projectID: 21,
                    tool: "tool_one"
                },
                {
                    projectID: 21,
                    tool: "tool_two"
                },
                {
                    projectID: 21,
                    tool: "tool_three"
                },
                {
                    projectID: 21,
                    tool: "tool_four"
                },
            ]
        }
        ,
        project_four = {
            project: {
                project_name: "project four",
                description: "Integer nisl dolor, tristique id sollicitudin a, porta ut enim. Integer lectus tortor, laoreet at blandit ac, vehicula eu purus. Pellentesque gravida lorem quis metus rhoncus, id ullamcorper erat tristique. Proin mattis vestibulum sapien, at posuere orci tincidunt a. Proin non ipsum eu metus fringilla gravida eu a odio. Sed id leo congue dui ultrices porta quis a nulla. Vestibulum viverra sem at felis aliquam mollis. Maecenas egestas et lorem ac tempus. Aliquam eu finibus nisl. Vivamus vulputate ipsum vel fringilla lacinia.",
                user_name: "user two",
                userID: 21
            },
            tools: [
                {
                    projectID: 31,
                    tool: "tool_a"
                },
                {
                    projectID: 31,
                    tool: "tool_b"
                }
            ]

        },
        project_five = {
            project: {
                project_name: "project five",
                description: "In egestas dui a congue pellentesque. Curabitur dapibus dictum leo quis pellentesque. Mauris faucibus sit amet turpis in aliquam. Nam iaculis feugiat ante, eu molestie velit venenatis posuere. Mauris congue commodo luctus. Mauris vitae ante non felis vehicula dictum in ac neque. Proin a ex tristique, semper nibh quis, vulputate mauris. Integer auctor libero id augue rhoncus, eget tristique lorem maximus.",
                user_name: "user three",
                userID: 31
            },
            tools: [
                {
                    projectID: 41,
                    tool: "tool_A"
                },
                {
                    projectID: 41,
                    tool: "tool_B"
                },
                {
                    projectID: 41,
                    tool: "tool_C"
                },
                {
                    projectID: 41,
                    tool: "tool_D"
                }
            ]
        }
    ]


    // each project in projects create new project then create tools for this project
    Promise.all(projects.map(elemP => {
        return (
            Project.create(elemP.project)
                .then(() => {
                    Promise.all(elemP.tools.map(elemT => {
                        return Tool_p.create(elemT)
                    }))
                }))
    })).then(values => {
    }).catch(err => {
        console.log(err);
    });

}

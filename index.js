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
                github_profile: 'https://github.com/romanserk/students-project-react-front',
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

    const projectsID = [1, 2, 3, 4, 5];
    const usersID = [1, 2, 3, 4, 5];

    const projects = [
        project_one = {
            project: {
                project_name: "project one",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum sem eget fermentum interdum. Sed eleifend elit a ex tincidunt, vitae dictum velit mollis. Vivamus at ex orci. Suspendisse tortor quam, laoreet quis interdum eget, consequat facilisis erat. Praesent aliquam, urna non placerat ornare, urna eros fringilla nunc, ut ornare ligula ante at lectus. Ut et risus sagittis, porttitor urna quis, sollicitudin justo. Duis at nibh ut lectus venenatis ultrices at a sapien.",
                user_name: "user one",
                userID: usersID[0],
                git_link: 'https://github.com/romanserk/students-project-react-front'
            },
            tools: [
                {
                    projectID: projectsID[0],
                    tool: "tool_one"
                },
                {
                    projectID: projectsID[0],
                    tool: "tool_two"
                },
                {
                    projectID: projectsID[0],
                    tool: "tool_three"
                },
                {
                    projectID: projectsID[0],
                    tool: "tool_four"
                },
            ]
        },
        project_two = {
            project: {
                project_name: "project two",
                description: "In lacinia malesuada dapibus. Pellentesque tempus velit in efficitur finibus. In sagittis convallis vestibulum. Donec ut mauris a ipsum fringilla feugiat id a purus. Integer at tincidunt lacus, sed semper velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                user_name: "user one",
                userID: usersID[0],
                git_link: 'https://github.com/romanserk/students-project-react-front'
            },
            tools: [
                {
                    projectID: projectsID[1],
                    tool: "tool_1"
                },
                {
                    projectID: projectsID[1],
                    tool: "tool_2"
                },
                {
                    projectID: projectsID[1],
                    tool: "tool_3"
                }
            ]
        },
        project_three = {
            project: {
                project_name: "project three",
                description: "Vivamus nec dui diam. Nunc volutpat a quam nec tincidunt. Suspendisse vitae hendrerit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In eros nisl, ultricies a sapien ac, viverra tincidunt nulla. Sed porta, sapien id egestas consectetur, quam ante aliquam ligula, a blandit mi nisi id magna.",
                user_name: "user two",
                userID: usersID[1],
                git_link: 'https://github.com/romanserk/students-project-react-front'
            },
            tools: [
                {
                    projectID: projectsID[2],
                    tool: "tool_one"
                },
                {
                    projectID: projectsID[2],
                    tool: "tool_two"
                },
                {
                    projectID: projectsID[2],
                    tool: "tool_three"
                },
                {
                    projectID: projectsID[2],
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
                userID: usersID[1],
                git_link: 'https://github.com/romanserk/students-project-react-front'
            },
            tools: [
                {
                    projectID: projectsID[3],
                    tool: "tool_a"
                },
                {
                    projectID: projectsID[3],
                    tool: "tool_b"
                }
            ]

        },
        project_five = {
            project: {
                project_name: "project five",
                description: "In egestas dui a congue pellentesque. Curabitur dapibus dictum leo quis pellentesque. Mauris faucibus sit amet turpis in aliquam. Nam iaculis feugiat ante, eu molestie velit venenatis posuere. Mauris congue commodo luctus. Mauris vitae ante non felis vehicula dictum in ac neque. Proin a ex tristique, semper nibh quis, vulputate mauris. Integer auctor libero id augue rhoncus, eget tristique lorem maximus.",
                user_name: "user three",
                userID: usersID[2],
                git_link: 'https://github.com/romanserk/students-project-react-front'
            },
            tools: [
                {
                    projectID: projectsID[4],
                    tool: "tool_A"
                },
                {
                    projectID: projectsID[4],
                    tool: "tool_B"
                },
                {
                    projectID: projectsID[4],
                    tool: "tool_C"
                },
                {
                    projectID: projectsID[4],
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
        createDummyParticipants(projectsID, usersID)
    }).catch(err => {
        console.log(err);
    });

}



const createDummyParticipants = (projectsID, usersID) => {
    const partArr = [
        {
            projectID: projectsID[0],
            userID: usersID[1]
        },
        {
            projectID: projectsID[0],
            userID: usersID[2]
        },
        {
            projectID: projectsID[1],
            userID: usersID[3]
        },
        {
            projectID: projectsID[1],
            userID: usersID[2]
        },
        {
            projectID: projectsID[3],
            userID: usersID[0]
        },
        {
            projectID: projectsID[3],
            userID: usersID[1]
        },
    ];

    Promise.all(partArr.map(elemP => {
        return Participant.create(elemP)
    })).then(values => {
        createDummyMessages(projectsID, usersID)
    }).catch(err => {
        console.log(err);
    });

}


const createDummyMessages = (projectsID, usersID) => {
    const today = new Date()

    const messages = [
        {
            projectID: projectsID[0],
            userID: usersID[0],
            content: "Mauris non ante purus. Sed eu augue vitae metus fermentum convallis. Etiam vitae tellus odio. Donec ornare fringilla mollis.",
            created_date: today
        },
        {
            projectID: projectsID[0],
            userID: usersID[2],
            content: "Etiam facilisis enim magna, non fringilla risus porttitor a. Mauris lacus nunc, fermentum non nunc aliquet",
            created_date: today
        },
        {
            projectID: projectsID[0],
            userID: usersID[1],
            content: "Vestibulum sodales commodo urna id bibendum.",
            created_date: today
        },
        {
            projectID: projectsID[1],
            userID: usersID[0],
            content: "Mauris non ante purus. Sed eu augue vitae metus fermentum convallis. Etiam vitae tellus odio. Donec ornare fringilla mollis.",
            created_date: today
        },
        {
            projectID: projectsID[1],
            userID: usersID[2],
            content: "Etiam facilisis enim magna, non fringilla risus porttitor a. Mauris lacus nunc, fermentum non nunc aliquet",
            created_date: today
        },
        {
            projectID: projectsID[1],
            userID: usersID[1],
            content: "Vestibulum sodales commodo urna id bibendum.",
            created_date: today
        },
        {
            projectID: projectsID[2],
            userID: usersID[0],
            content: "Mauris non ante purus. Sed eu augue vitae metus fermentum convallis. Etiam vitae tellus odio. Donec ornare fringilla mollis.",
            created_date: today
        },
        {
            projectID: projectsID[2],
            userID: usersID[2],
            content: "Etiam facilisis enim magna, non fringilla risus porttitor a. Mauris lacus nunc, fermentum non nunc aliquet",
            created_date: today
        },
        {
            projectID: projectsID[2],
            userID: usersID[1],
            content: "Vestibulum sodales commodo urna id bibendum.",
            created_date: today
        },
    ]

    Promise.all(messages.map(elemM => {
        return Message.create(elemM)
    })).then(values => {
    }).catch(err => {
        console.log(err);
    });


}
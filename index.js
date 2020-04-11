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

    const projectsID = [1, 11, 21, 31, 41];
    const usersID = [1, 11, 21, 31, 41];

    const projects = [
        project_one = {
            project: {
                project_name: "project one",
                description: `{"blocks":[{"key":"7bp0f","text":"Description title","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9li3f","text":"Mauris in accumsan orci. Vestibulum sit amet nisi non tellus faucibus porta sed.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":24,"style":"ITALIC"},{"offset":25,"length":24,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4qtj1","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6hepb","text":" Curabitur non luctus erat. Sed eget imperdiet urna. Curabitur blandit libero quis urna venenatis elementum. Aliquam ut sem ligula. Aliquam erat volutpat. In ullamcorper quam tempor imperdiet ultricies. Sed condimentum tortor eu tincidunt ullamcorper. Fusce viverra dui turpis, in dignissim lectus interdum malesuada. Phasellus ut porta libero, vel finibus magna. Etiam at molestie nisl, eget viverra velit. Proin egestas maximus enim at faucibus. Nulla maximus, leo vel laoreet blandit, velit nulla accumsan elit, nec scelerisque justo odio eget sem. Mauris in accumsan orci.Vestibulum sit amet nisi non tellus faucibus porta sed eu libero. Duis erat libero, pulvinar ac aliquet in, consequat et enim. In eleifend elementum enim, varius semper dui viverra at. Integer id ante cursus felis scelerisque imperdiet. Vivamus pellentesque convallis odio, vel congue enim dictum condimentum. Donec quam elit, consectetur nec enim eu, imperdiet mattis ex. Nullam sit amet enim nulla. Ut sed libero ut turpis commodo eleifend.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1la2e","text":"About subtitle","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jgc","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":192,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9hrk4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7tvsh","text":"Duis erat libero, pulvinar ac aliquet in","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
                description: `{"blocks":[{"key":"7bp0f","text":"Description title","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9li3f","text":"Mauris in accumsan orci. Vestibulum sit amet nisi non tellus faucibus porta sed.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":24,"style":"ITALIC"},{"offset":25,"length":24,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4qtj1","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6hepb","text":" Curabitur non luctus erat. Sed eget imperdiet urna. Curabitur blandit libero quis urna venenatis elementum. Aliquam ut sem ligula. Aliquam erat volutpat. In ullamcorper quam tempor imperdiet ultricies. Sed condimentum tortor eu tincidunt ullamcorper. Fusce viverra dui turpis, in dignissim lectus interdum malesuada. Phasellus ut porta libero, vel finibus magna. Etiam at molestie nisl, eget viverra velit. Proin egestas maximus enim at faucibus. Nulla maximus, leo vel laoreet blandit, velit nulla accumsan elit, nec scelerisque justo odio eget sem. Mauris in accumsan orci.Vestibulum sit amet nisi non tellus faucibus porta sed eu libero. Duis erat libero, pulvinar ac aliquet in, consequat et enim. In eleifend elementum enim, varius semper dui viverra at. Integer id ante cursus felis scelerisque imperdiet. Vivamus pellentesque convallis odio, vel congue enim dictum condimentum. Donec quam elit, consectetur nec enim eu, imperdiet mattis ex. Nullam sit amet enim nulla. Ut sed libero ut turpis commodo eleifend.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1la2e","text":"About subtitle","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jgc","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":192,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9hrk4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7tvsh","text":"Duis erat libero, pulvinar ac aliquet in","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
                description: `{"blocks":[{"key":"7bp0f","text":"Description title","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9li3f","text":"Mauris in accumsan orci. Vestibulum sit amet nisi non tellus faucibus porta sed.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":24,"style":"ITALIC"},{"offset":25,"length":24,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4qtj1","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6hepb","text":" Curabitur non luctus erat. Sed eget imperdiet urna. Curabitur blandit libero quis urna venenatis elementum. Aliquam ut sem ligula. Aliquam erat volutpat. In ullamcorper quam tempor imperdiet ultricies. Sed condimentum tortor eu tincidunt ullamcorper. Fusce viverra dui turpis, in dignissim lectus interdum malesuada. Phasellus ut porta libero, vel finibus magna. Etiam at molestie nisl, eget viverra velit. Proin egestas maximus enim at faucibus. Nulla maximus, leo vel laoreet blandit, velit nulla accumsan elit, nec scelerisque justo odio eget sem. Mauris in accumsan orci.Vestibulum sit amet nisi non tellus faucibus porta sed eu libero. Duis erat libero, pulvinar ac aliquet in, consequat et enim. In eleifend elementum enim, varius semper dui viverra at. Integer id ante cursus felis scelerisque imperdiet. Vivamus pellentesque convallis odio, vel congue enim dictum condimentum. Donec quam elit, consectetur nec enim eu, imperdiet mattis ex. Nullam sit amet enim nulla. Ut sed libero ut turpis commodo eleifend.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1la2e","text":"About subtitle","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jgc","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":192,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9hrk4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7tvsh","text":"Duis erat libero, pulvinar ac aliquet in","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
                description: `{"blocks":[{"key":"7bp0f","text":"Description title","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9li3f","text":"Mauris in accumsan orci. Vestibulum sit amet nisi non tellus faucibus porta sed.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":24,"style":"ITALIC"},{"offset":25,"length":24,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4qtj1","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6hepb","text":" Curabitur non luctus erat. Sed eget imperdiet urna. Curabitur blandit libero quis urna venenatis elementum. Aliquam ut sem ligula. Aliquam erat volutpat. In ullamcorper quam tempor imperdiet ultricies. Sed condimentum tortor eu tincidunt ullamcorper. Fusce viverra dui turpis, in dignissim lectus interdum malesuada. Phasellus ut porta libero, vel finibus magna. Etiam at molestie nisl, eget viverra velit. Proin egestas maximus enim at faucibus. Nulla maximus, leo vel laoreet blandit, velit nulla accumsan elit, nec scelerisque justo odio eget sem. Mauris in accumsan orci.Vestibulum sit amet nisi non tellus faucibus porta sed eu libero. Duis erat libero, pulvinar ac aliquet in, consequat et enim. In eleifend elementum enim, varius semper dui viverra at. Integer id ante cursus felis scelerisque imperdiet. Vivamus pellentesque convallis odio, vel congue enim dictum condimentum. Donec quam elit, consectetur nec enim eu, imperdiet mattis ex. Nullam sit amet enim nulla. Ut sed libero ut turpis commodo eleifend.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1la2e","text":"About subtitle","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jgc","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":192,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9hrk4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7tvsh","text":"Duis erat libero, pulvinar ac aliquet in","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
                description: `{"blocks":[{"key":"7bp0f","text":"Description title","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9li3f","text":"Mauris in accumsan orci. Vestibulum sit amet nisi non tellus faucibus porta sed.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":24,"style":"ITALIC"},{"offset":25,"length":24,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4qtj1","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6hepb","text":" Curabitur non luctus erat. Sed eget imperdiet urna. Curabitur blandit libero quis urna venenatis elementum. Aliquam ut sem ligula. Aliquam erat volutpat. In ullamcorper quam tempor imperdiet ultricies. Sed condimentum tortor eu tincidunt ullamcorper. Fusce viverra dui turpis, in dignissim lectus interdum malesuada. Phasellus ut porta libero, vel finibus magna. Etiam at molestie nisl, eget viverra velit. Proin egestas maximus enim at faucibus. Nulla maximus, leo vel laoreet blandit, velit nulla accumsan elit, nec scelerisque justo odio eget sem. Mauris in accumsan orci.Vestibulum sit amet nisi non tellus faucibus porta sed eu libero. Duis erat libero, pulvinar ac aliquet in, consequat et enim. In eleifend elementum enim, varius semper dui viverra at. Integer id ante cursus felis scelerisque imperdiet. Vivamus pellentesque convallis odio, vel congue enim dictum condimentum. Donec quam elit, consectetur nec enim eu, imperdiet mattis ex. Nullam sit amet enim nulla. Ut sed libero ut turpis commodo eleifend.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1la2e","text":"About subtitle","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9jgc","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex. Maecenas volutpat tortor vel eleifend hendrerit. Nunc mollis consectetur elit, eget tincidunt ante faucibus sit amet.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":192,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9hrk4","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7tvsh","text":"Duis erat libero, pulvinar ac aliquet in","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
# students-projects-node-back

Back end part of students projects platform written in Node.js & express & sequelize, in which students can share projects, and find participants/team in order to work together of projects.

Database based on mySQL, node server and mySQL database hosted on Heroku.

Exposed api:

<ul>
  <li> 
    all projects list: https://infinite-plains-84143.herokuapp.com/projects 
  </li>
  <li>
    user projects list: https://infinite-plains-84143.herokuapp.com/projects/user
    <br/>params: username
  </li>
  <li>
    add ne project: https://infinite-plains-84143.herokuapp.com/projects/projects/add
    <br/>params: project name, project description, user id, github link
  </li>
  <li>
    remove project: https://infinite-plains-84143.herokuapp.com/projects/projects/remove
    <br/>params: project id
  </li>
  <li>
    single project: https://infinite-plains-84143.herokuapp.com/projects/projects/single_project
    <br/>params: project name
  </li>
  <li>
    leave project: https://infinite-plains-84143.herokuapp.com/projects/projects/leave
    <br/>params: project id, user id
  </li>
  <li>
    join project: https://infinite-plains-84143.herokuapp.com/projects/projects/join
    <br/>params: project id, user id
  </li>
  <li>
    register: https://infinite-plains-84143.herokuapp.com/register
    <br/>params: username, email, password, github profile link
  </li>
  <li>
    register: https://infinite-plains-84143.herokuapp.com/login
    <br/>params: username
  </li>
  <li>
    profile: https://infinite-plains-84143.herokuapp.com/profile
    <br/>params: username
  </li>
</ul>
![Image description](https://github.com/romanserk/students-projects-node-back/blob/master/student-projects.png)

    


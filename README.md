![ScheduleBG](https://user-images.githubusercontent.com/70289115/161655243-15a8fee3-26cd-485d-a2de-0f11c2de2167.png)

## 📖 About

<p align="justify"> The ability to create, read, update and delete items in a web application is crucial to most full stack projects. For example, if we're creating a blog posting page, todo list or social media clone, without CRUD actions you'll get stuck very quickly. So we need to be aware that CRUD is too important to be ignored and also because learning this will really improve our confidence within unfamiliar stacks. </p>

<p align="justify"> In order to understand a litte bit about this programming side, I did some researches and decided to create a <b>Schedule Application</b> with <b>Node, Express and MongoDB.</b> </p>


## 🔥 How to get started

<p align="justify"> If you want to run this application in your local, you should:</p>

```1) Install the dependencies:```
```
npm install
```

```2) Run the application:```
```
npm run dev
```

```3) After that, you should see the app running in the browser in```
```
Local: http://localhost:8080
```


## ⚠️ Be careful

<p align="justify"> This app uses some environment variables, so to run this app successfully you must create a file named <b> config.env </b> and insided of it you must have: </p>

```
PORT=           ---:> The port you want your app to run
MONGO_URI=      ---:> The MONGOOSE URL (use the documentation if necessary) 
SESS_NAME=      ---:> A name for your session
SESS_SECRET=    ---:> A random password for your session
SESS_LIFETIME=  ---:> The time in milliseconds for your session to expire, like 259200000 (3 days) 
```


## 🎯 Packages used in this application

| Dependencies | Version | Dependencies  |Version | 
|--|--|--|--| 
|  |  |  |  | 
| <b> <a  href='https://www.npmjs.com/package/bcryptjs'  target='_blank'> </b> bcryptjs </a> | <b> ^2.4.3 </b> | <b> <a  href='https://www.npmjs.com/package/ejs'  target='_blank'> </b> ejs </a> | <b> ^3.1.6 </b> |
| <b> <a  href='https://www.npmjs.com/package/connect-flash'  target='_blank'> </b> connect-flash </a> | <b> ^0.1.1 </b> | <b> <a  href='https://www.npmjs.com/package/express'  target='_blank'> </b> express </a> | <b> ^4.17.3 </b> |
| <b> <a  href='https://www.npmjs.com/package/connect-mongo'  target='_blank'> </b> connect-mongo </a> | <b> ^4.6.0 </b> | <b> <a  href='https://www.npmjs.com/package/express-session'  target='_blank'> </b> express-session </a> | <b> ^1.17.2 </b> |
| <b> <a  href='https://www.npmjs.com/package/csurf'  target='_blank'> </b> csurf </a> | <b> ^1.11.0 </b> | <b> <a  href='https://www.npmjs.com/package/mongoose'  target='_blank'> </b> mongoose </a> | <b> ^5.13.14 </b> |
| <b> <a  href='https://www.npmjs.com/package/dotenv'  target='_blank'> </b> dotenv </a> | <b> ^16.0.0 </b> | <b> <a  href='https://www.npmjs.com/package/validator'  target='_blank'> </b> validator </a> | <b> ^13.7.0 </b> |
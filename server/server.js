const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require('./models');

const usersRouter = require('./routes/Users');
app.use("/users",usersRouter);

const uploadsRouter = require('./routes/Uploads');
app.use("/uploads",uploadsRouter);

const commentsRouter = require('./routes/Comments');
app.use("/comments",commentsRouter);

const likesRouter = require('./routes/Likes');
app.use("/likes",likesRouter);

const dislikesRouter = require('./routes/DisLikes');
app.use("/dislikes",dislikesRouter);

db.sequelize.sync().then(()=> {
    app.listen(process.env.PORT || 3001,() =>{
        console.log("A Server elindult a 3001-es porton!");
    });
}).catch((err) => {
    console.log(err);
})

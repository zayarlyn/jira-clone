const express = require('express');
const cors = require('cors');

const app = express();

const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const listRoute = require('./routes/list.route');
const issueRoute = require('./routes/issue.route');
const userRoute = require('./routes/user.route');
const memberRoute = require('./routes/member.route');

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use('/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/list', listRoute);
app.use('/api/issue', issueRoute);
app.use('/api/project', projectRoute);
app.use('/api/member', memberRoute);

app.listen(5000);

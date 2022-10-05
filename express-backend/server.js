const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const listRoute = require('./routes/list.route');
const issueRoute = require('./routes/issue.route');
const userRoute = require('./routes/user.route');
const memberRoute = require('./routes/member.route');
const { authMiddleware } = require('./controllers/auth.controller');
const { restrictProjectMiddleware } = require('./utils/restrictProjectMiddleware');

const corOptions = {
  credentials: true,
  origin: ['https://jira-replica.vercel.app/', 'http://localhost:5173'],
};

app.use(cors(corOptions));
app.use(cookieParser());
app.use(express.json());
app.get('/ok', (req, res) => res.end());
app.use('/auth', authRoute);
app.use(authMiddleware);
app.use('/api/user', userRoute);
app.use('/api/project', projectRoute);
app.use('/api/list', restrictProjectMiddleware, listRoute);
app.use('/api/issue', restrictProjectMiddleware, issueRoute);
app.use('/api/member', restrictProjectMiddleware, memberRoute);

app.listen(process.env.PORT || 5000);

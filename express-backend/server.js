const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const projectRoute = require('./routes/project.route');
const listRoute = require('./routes/list.route');
const kanbanRoute = require('./routes/kanban.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/lists', listRoute);
app.use('/api/issues', listRoute);
app.use('/api/projects', projectRoute);

app.listen(5000);

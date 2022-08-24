const app = require('express')();
const bodyParser = require('body-parser');

const projectRoute = require('./routes/project.route');

// app.use((req, res) => res.json({ clone: 'Jira clone: Hello World!' }).end());

app.use(bodyParser.urlencoded());
app.use('/api/project', projectRoute);

app.listen(5000);

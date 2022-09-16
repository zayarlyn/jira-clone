const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const client = new PrismaClient();

exports.signUp = async (req, res) => {
  // validate body (not now)
  // check if user already exists
  const isExist = await client.user.findFirst({ where: { email: req.body.email } });
  if (isExist) return res.status(409).json({ error: 'user with this email already exists' }).end();
  // add to db
  const user = await client.user.create({ data: req.body });
  // create jwt
  const token = generateJwt({ uid: user.id });
  res.cookie('jira-clone', JSON.stringify({ token }), {
    httpOnly: true,
  });
  // send back newly created user obj
  res.json(user).end();
};

exports.logIn = async (req, res) => {
  const token = JSON.parse(req.cookies['jira-clone']).token;
  try {
    const tmp = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    console.log(tmp);
    return res.end();
  } catch (err) {
    return res.json({ error: err.message }).end();
  }
};

exports.logOut = async (req, res) => {
  res.clearCookie('jira-clone').end();
};

const generateJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30s' });

const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const client = new PrismaClient();

exports.signUp = async (req, res) => {
  console.log(req.cookies);
  console.log(req.body);
  // validate body (not now)
  // add to db
  // const user = await client.user.create({ data: req.body });
  // create jwt
  jwt.sign(
    { sus: 'Sekai No Owari' },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' },
    (err, token) => {
      if (err) res.send('an error occured').end();
      res.cookie('jira-clone', JSON.stringify({ token }), {
        maxAge: 3600,
        httpOnly: true,
      });
      res.json({ token }).end();
    }
  );
};

exports.logIn = async (req, res) => {
  res.end();
};

exports.logOut = async (req, res) => {
  res.end();
};

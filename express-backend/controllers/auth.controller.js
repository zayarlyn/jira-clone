const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { badRequest } = require('./util');

const client = new PrismaClient();

exports.register = async (req, res) => {
  try {
    if (await findUser(req.body.email))
      return res.status(409).json({ message: 'user with this email already exists' }).end();
    const pwd = await bcrypt.hash(req.body.pwd, 10);
    const user = await client.user.create({ data: { ...req.body, pwd } });
    const token = generateJwt({ uid: user.id });
    createCookie(res, token);
    res.json(user).end(); // send back newly created user obj
  } catch (err) {
    return badRequest(res);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await findUser(email);
    if (!user)
      return res.status(409).json({ message: 'no account was registered with this email' }).end();
    const isValidPwd = await bcrypt.compare(pwd, user.pwd);
    if (!isValidPwd) return res.status(401).json({ message: 'password is incorrect :(' }).end();
    const token = generateJwt({ uid: user.id });
    await client.user.update({
      where: { id: user.id },
      data: { lastLoggedIn: new Date().toISOString() },
    });
    createCookie(res, token);
    res.json(user).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.logOut = (req, res) => {
  res.clearCookie('jira-clone').end();
};

exports.changePwd = async (req, res) => {
  try {
    const { oldPwd, newPwd } = req.body;
    const id = +req.user.uid;
    const user = await client.user.findFirst({ where: { id } });
    const isValidPwd = await bcrypt.compare(oldPwd, user.pwd);
    if (!isValidPwd) return res.status(401).json({ message: 'old password is incorrect :(' }).end();
    const pwd = await bcrypt.hash(newPwd, 10);
    await client.user.update({ where: { id }, data: { pwd } });
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    return badRequest(res);
  }
};

exports.authMiddleware = (req, res, next) => {
  const cookie = req.cookies['jira-clone'];
  if (!cookie)
    return res
      .status(401)
      .json({ status: 401, message: 'please log in to access this resource' })
      .end();
  const token = JSON.parse(cookie).token;
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.clearCookie('jira-clone').status(401).json({ message: err.message }).end();
  }
};

const generateJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15d' });

const findUser = async (email) => client.user.findFirst({ where: { email } });

function createCookie(res, token) {
  res.cookie('jira-clone', JSON.stringify({ token }), {
    httpOnly: true,
    expires: new Date(Date.now() + 1296000), // 15 days
    // secure: true,
    // domain: '.jira-clone.onrender.com',
  });
}

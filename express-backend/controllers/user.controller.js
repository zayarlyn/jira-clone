const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const client = new PrismaClient();

exports.getUsers = async (req, res) => {
  const { q } = req.query;
  const users = await client.user.findMany({
    where: { username: { contains: q } },
    select: { id: true, username: true, email: true, profileUrl: true },
  });
  res.json(users).end();
};

exports.getAuthUser = async (req, res) => {
  const { pwd, ...user } = await client.user.findFirst({ where: { id: req.user.uid } });
  res.json(user).end();
};

exports.updateAuthUser = async (req, res) => {
  const user = await client.user.update({ where: { id: req.user.uid }, data: req.body });
  res.json(user).end();
};

exports.deleteAuthUser = async (req, res) => {
  const { pwd } = req.body;
  const user = await client.user.findFirst({ where: { id: req.user.uid } });
  const isValidPwd = await bcrypt.compare(pwd, user.pwd);
  if (!isValidPwd) return res.status(401).json({ message: 'password is incorrect :(' }).end();
  const result = await client.user.delete({ where: { id: req.user.uid } });
  res.clearCookie('jira-clone').json(result).end();
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await client.user.findFirst({
    where: { id: +userId },
    select: { id: true, username: true, email: true, profileUrl: true },
  });
  res.json(user);
};

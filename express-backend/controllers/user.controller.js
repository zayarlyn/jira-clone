const { PrismaClient } = require('@prisma/client');

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

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await client.user.findFirst({
    where: { id: +userId },
    select: { id: true, username: true, email: true, profileUrl: true },
  });
  res.json(user);
};

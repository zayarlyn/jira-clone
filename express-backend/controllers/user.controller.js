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

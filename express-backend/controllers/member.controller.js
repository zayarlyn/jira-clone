const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getMembersInProject = async (req, res) => {
  const { projectId } = req.params;
  const members = await client.member.findMany({
    where: { projectId: +projectId },
    orderBy: { createdAt: 'asc' },
    include: { User: { select: { id: true, username: true, email: true, profileUrl: true } } },
  });
  const users = members.map(({ isAdmin, projectId, createdAt, User }) => ({
    isAdmin,
    projectId,
    createdAt,
    ...User,
  }));
  res.json(users).end();
};

exports.addMember = async (req, res) => {
  const { userId, projectId } = req.query;
  const result = await client.member.create({ data: { userId: +userId, projectId: +projectId } });
  res.json(result).end();
};

exports.removeMember = async (req, res) => {
  const { userId, projectId } = req.query;
  const result = await client.member.deleteMany({
    where: {
      AND: [{ userId: +userId }, { projectId: +projectId }],
    },
  });
  res.json(result).end();
};

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getMembersInProject = async (req, res) => {
  const { projectId } = req.customParams;
  const members = await client.member.findMany({
    where: { projectId: +projectId },
    orderBy: { createdAt: 'asc' },
    include: { User: { select: { username: true, email: true, profileUrl: true } } },
  });
  const users = members.map(({ User, ...memberData }) => ({
    ...memberData,
    ...User,
  }));
  res.json(users).end();
};

exports.addMember = async (req, res) => {
  const { userId, projectId } = req.body;
  const result = await client.member.create({ data: { userId: +userId, projectId: +projectId } });
  res.json(result).end();
};

exports.removeMember = async (req, res) => {
  const { userId, projectId } = req.body;
  const result = await client.member.deleteMany({
    where: {
      AND: [{ userId: +userId }, { projectId: +projectId }],
    },
  });
  res.json(result).end();
};

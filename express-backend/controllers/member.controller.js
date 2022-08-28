const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getMembersInProject = async (req, res) => {
  const { projectId } = req.params;
  const projectMembers = await prisma.member.findMany({
    where: { projectId: +projectId },
    orderBy: { createdAt: 'asc' },
  });
  userIds = projectMembers.map(({ userId }) => userId);
  const members = await prisma.user.findMany({ where: { id: { in: userIds } } });
  const filtered = members.map(({ id, username, email, profileUrl }) => ({
    id,
    username,
    email,
    profileUrl,
  }));
  res.json(filtered).end();
};

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
  const { projectId, userId } = req.body;
  const result = await client.member.create({
    data: { userId, projectId: +projectId },
  });
  res.json(result).end();
};

exports.removeMember = async (req, res) => {
  const { memberId: id, projectId, userId } = req.body;
  const member = client.member.delete({ where: { id } });
  const removeAssignees = client.assignee.deleteMany({ where: { AND: { userId, projectId } } });
  await Promise.all([member, removeAssignees]);
  res.json(member).end();
};

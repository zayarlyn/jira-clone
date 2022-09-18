const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getProjects = async (req, res) => {
  const members = await client.member.findMany({ where: { userId: req.user.uid } });
  const projectIds = members.map(({ projectId: pid }) => pid);
  const projects = await client.project.findMany({
    where: { id: { in: projectIds } },
    orderBy: { createdAt: 'desc' },
  });
  console.log(req.user.uid, members);
  res.json(projects).end();
};

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await client.project.findFirst({
    where: { id: +projectId, userId: req.user.uid },
  });
  res.json(project).end();
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const updatedProject = await client.project.update({ where: { id: +projectId }, data: req.body });
  res.json(updatedProject).end();
  res.end();
};

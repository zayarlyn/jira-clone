const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getProjects = async (req, res) => {
  if (+req.params.userId !== req.user.uid)
    return res.status(401).json({ message: "you can't access other people's projects" });
  const userId = Number(req.params.userId);
  const members = await client.member.findMany({ where: { userId } });
  const projectIds = members.map(({ projectId: pid }) => pid);
  const projects = await client.project.findMany({
    where: { id: { in: projectIds } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects).end();
};

exports.getProject = async (req, res) => {
  const { projectId } = req.customParams;
  const project = await client.project.findFirst({
    where: { id: +projectId },
  });
  res.json(project).end();
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.customParams;
  const updatedProject = await client.project.update({ where: { id: +projectId }, data: req.body });
  res.json(updatedProject).end();
  res.end();
};

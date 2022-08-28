const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await client.project.findFirst({
    where: { id: +projectId },
  });
  res.json(project).end();
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const updatedProject = await client.project.update({ where: { id: +projectId }, data: req.body });
  res.json(updatedProject).end();
  res.end();
};

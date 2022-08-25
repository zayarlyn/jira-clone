const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getIssues = async (req, res) => {
  const { listId } = req.param;
  const project = await client.project.findFirst({ where: { listId } });
  res.json(project).end();
};

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getProject = async (req, res) => {
  const project = await client.project.findFirst();
  res.json(project).end();
};

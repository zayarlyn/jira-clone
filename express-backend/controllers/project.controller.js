const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getProject = async (req, res) => {
  const { id } = req.params;
  const projectDetail = await client.project.findFirst({
    where: { id: +id },
    include: { members: { orderBy: { createdAt: 'asc' } } },
  });
  res.json(projectDetail).end();
};

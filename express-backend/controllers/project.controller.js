const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getListsInProject = async (req, res) => {
  const { projectId } = req.params;
  const lists = await client.list.findMany({
    where: { projectId: +projectId },
    orderBy: { order: 'asc' },
  });
  res.json(lists).end();
};

exports.getIssuesInProject = async (req, res) => {
  const { projectId } = req.params;
  const listIssues = await client.list.findMany({
    where: { projectId: +projectId },
    orderBy: { order: 'asc' },
    include: { issue: { orderBy: { order: 'asc' } } },
  });
  const issues = listIssues.reduce((p, { id, issue }) => ({ ...p, [id]: issue }), {});
  res.json(issues).end();
};

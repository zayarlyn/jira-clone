const { PrismaClient } = require('@prisma/client');
const { handleSameListReorder } = require('./util');

const client = new PrismaClient();

exports.getIssuesInList = async (req, res) => {
  const { listId } = req.params;
  const issues = await client.issue.findMany({ where: { listId: +listId } });
  res.json(issues).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  await handleSameListReorder({ id, order, newOrder }, { projectId }, client.list);
  res.end();
};

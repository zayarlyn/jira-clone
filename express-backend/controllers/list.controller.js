const { PrismaClient } = require('@prisma/client');
const { handleSameListReorder } = require('./util');

const client = new PrismaClient();

exports.getListsInProject = async (req, res) => {
  const { projectId } = req.customParams;
  const lists = await client.list.findMany({
    where: { projectId: +projectId },
    orderBy: { order: 'asc' },
  });
  res.json(lists).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  await handleSameListReorder({ id, order, newOrder }, { projectId }, client.list);
  res.end();
};

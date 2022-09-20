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

exports.createList = async (req, res) => {
  const { projectId } = req.body;
  const { _count: order } = await client.list.aggregate({ where: { projectId }, _count: true });
  const project = await client.list.create({ data: { projectId, order } });
  res.json(project).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  await handleSameListReorder({ id, order, newOrder }, { projectId }, client.list);
  res.end();
};

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
  const list = await client.list.create({ data: { projectId, order } });
  res.json(list).end();
};

exports.deleteList = async (req, res) => {
  const { listId } = req.params;
  const list = await client.list.delete({ where: { id: +listId } });
  res.json(list).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  await handleSameListReorder({ id, order, newOrder }, { projectId }, client.list);
  res.end();
};

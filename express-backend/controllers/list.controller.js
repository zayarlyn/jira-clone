const { PrismaClient } = require('@prisma/client');
const { sameContainerReorder } = require('./util');

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

exports.updateList = async (req, res) => {
  const { listId } = req.params;
  const { projectId, ...data } = req.body; //exclude projectId
  const list = await client.list.update({ where: { id: +listId }, data });
  res.json(list).end();
  res.end();
};

exports.deleteList = async (req, res) => {
  const { listId } = req.params;
  await client.issue.deleteMany({ where: { listId: +listId } }); // delete issues in the list
  const list = await client.list.delete({ where: { id: +listId } });
  res.json(list).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  await sameContainerReorder({ id, order, newOrder }, { projectId }, client.list);
  res.end();
};

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getListsInKanban = (req, res) => {
  const { kanbanId } = req.params;
  const lists = prisma.kanban.findMany({ where: { kanbanId } });
  res.json(lists).end();
};

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getIssuesInList = async (req, res) => {
  const { listId } = req.params;
  const issues = await client.issue.findMany({ where: { listId: +listId } });
  res.json(issues).end();
};

exports.reorderLists = async (req, res) => {
  const { id, order, newOrder, projectId } = req.body;
  console.log(req.body);
  const stl = newOrder < order; // shift to
  const lists = await client.list.findMany({
    where: {
      AND: [
        { projectId },
        { order: { [stl ? 'lt' : 'gt']: order } },
        { order: { [stl ? 'gte' : 'lte']: newOrder } },
      ],
    },
    select: { id: true },
  });
  const ids = lists.map(({ id }) => id);
  const single = client.list.update({ where: { id }, data: { order: newOrder } });
  const multiple = client.list.updateMany({
    where: { id: { in: ids } },
    data: { order: { [stl ? 'increment' : 'decrement']: 1 } },
  });
  await Promise.all([single, multiple]);
  res.end();
};

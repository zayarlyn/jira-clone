const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.reorderIssues = async (req, res) => {
  const {
    id,
    s: { sId, order },
    d: { dId, newOrder },
    projectId,
  } = req.body;
  const occurInSameList = sId === dId;
  if (occurInSameList) {
    const btt = newOrder < order; // shift to
    const issues = await client.issue.findMany({
      where: {
        AND: [
          { listId: sId },
          { order: { [btt ? 'lt' : 'gt']: order } },
          { order: { [btt ? 'gte' : 'lte']: newOrder } },
        ],
      },
      select: { id: true },
    });
    const ids = issues.map(({ id }) => id);
    const single = client.issue.update({ where: { id }, data: { order: newOrder } });
    const multiple = client.issue.updateMany({
      where: { id: { in: ids } },
      data: { order: { [btt ? 'increment' : 'decrement']: 1 } },
    });
    await Promise.all([single, multiple]);
  } else {
    const issues = await client.issue.findMany({
      where: {
        AND: [{ listId: dId }, { order: { gte: newOrder } }],
      },
      select: { id: true },
    });
    const ids = issues.map(({ id }) => id);
    const { name } = await client.issue.delete({
      where: { id },
    });
    const single = client.issue.create({ data: { name, order: newOrder, listId: dId } });
    const multiple = client.issue.updateMany({
      where: { id: { in: ids } },
      data: { order: { increment: 1 } },
    });
    await Promise.all([single, multiple]);
  }
  res.end();
};

const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.reorderIssues = async (req, res) => {
  const { s, d } = req.body;
  // check if reorder occur in same list
  await (s.sId === d.dId ? handleSameListReorder : handleDifferentListReorder)(req.body);
  res.end();
};

async function handleSameListReorder({ id, s: { sId, order }, d: { newOrder } }) {
  const btt = newOrder < order; // shift to left
  const reorderSource = reorder(
    sId,
    [{ order: { [btt ? 'lt' : 'gt']: order } }, { order: { [btt ? 'gte' : 'lte']: newOrder } }],
    { order: { [btt ? 'increment' : 'decrement']: 1 } }
  );
  const updateDraggedIssueOrder = client.issue.update({ where: { id }, data: { order: newOrder } });
  return Promise.all([reorderSource, updateDraggedIssueOrder]);
}

async function handleDifferentListReorder({ id, s: { sId, order }, d: { dId, newOrder } }) {
  const reorderSource = reorder(sId, [{ order: { gt: order } }], { order: { decrement: 1 } });
  const reorderTarget = reorder(dId, [{ order: { gte: newOrder } }], { order: { increment: 1 } });
  const { name } = await client.issue.delete({ where: { id } });
  const insertToTarget = client.issue.create({ data: { name, order: newOrder, listId: dId } });
  await Promise.all([reorderSource, reorderTarget, insertToTarget]);
}

async function reorder(listId, selectOptionos, updateCofig) {
  const issues = await client.issue.findMany({
    where: { AND: [{ listId }, ...selectOptionos] },
    select: { id: true },
  });
  const ids = issues.map(({ id }) => id);
  return client.issue.updateMany({
    where: { id: { in: ids } },
    data: updateCofig,
  });
}

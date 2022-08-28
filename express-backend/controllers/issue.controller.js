const { PrismaClient } = require('@prisma/client');
const { handleSameListReorder, reorder } = require('./util');

const client = new PrismaClient();

exports.getIssuesInProject = async (req, res) => {
  const { projectId } = req.params;
  const listIssues = await client.list.findMany({
    where: { projectId: +projectId },
    orderBy: { order: 'asc' },
    include: { issues: { orderBy: { order: 'asc' } } },
  });
  const issues = listIssues.reduce((p, { id, issues }) => ({ ...p, [id]: issues }), {});
  res.json(issues).end();
};

exports.reorderIssues = async (req, res) => {
  const {
    id,
    s: { sId, order },
    d: { dId, newOrder },
  } = req.body;
  // check if reordering occur in same list
  await (sId === dId
    ? handleSameListReorder({ id, order, newOrder }, { listId: sId }, client.issue)
    : handleDifferentListReorder(req.body));
  res.end();
};

async function handleDifferentListReorder({ id, s: { sId, order }, d: { dId, newOrder } }) {
  const reorderSource = reorder(
    { listId: sId },
    [{ order: { gt: order } }],
    { order: { decrement: 1 } },
    client.issue
  );
  const reorderTarget = reorder(
    { listId: dId },
    [{ order: { gte: newOrder } }],
    { order: { increment: 1 } },
    client.issue
  );
  const { name } = await client.issue.delete({ where: { id } });
  const insertToTarget = client.issue.create({ data: { name, order: newOrder, listId: dId } });
  return Promise.all([reorderSource, reorderTarget, insertToTarget]);
}

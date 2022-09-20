const { PrismaClient } = require('@prisma/client');
const { handleSameListReorder, reorder } = require('./util');

const client = new PrismaClient();

exports.getIssuesInProject = async (req, res) => {
  const { projectId } = req.customParams;
  const { userId } = req.query;
  const listIssues = await client.list.findMany({
    where: { projectId: +projectId },
    orderBy: { order: 'asc' },
    include: {
      issues: {
        ...(userId && { where: { assignees: { some: { userId: +userId } } } }),
        orderBy: { order: 'asc' },
        include: {
          assignees: {
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  });
  const issues = listIssues.reduce((p, { id, issues }) => ({ ...p, [id]: issues }), {});
  res.json(issues).end();
};

exports.createIssue = async (req, res) => {
  const { projectId, listId, assignees, ...data } = req.body; // opt out projectId
  // get the number of issues and set it as the order column/attribute
  const { _count: order } = await client.issue.aggregate({ where: { listId }, _count: true });
  // create issue [summary, descr, priority, type, reporter,  list, order*]
  const { id: issueId } = await client.issue.create({ data: { order, listId, ...data } });
  // create assignee[] rows with new issue id
  await client.assignee.createMany({ data: assignees.map((userId) => ({ issueId, userId })) });
  res.json({ msg: 'issue is created' }).end();
};

exports.updateIssue = async (req, res) => {
  const { id } = req.params;
  const { type, value } = req.body;

  switch (type) {
    case 'listId':
      const { _count: order } = await client.issue.aggregate({
        where: { listId: value },
        _count: true,
      });
      await client.issue.update({ where: { id: +id }, data: { [type]: value, order } });
      break;
    case 'addAssignee':
      await client.assignee.create({ data: { issueId: +id, userId: value } });
      break;
    case 'removeAssignee':
      await client.assignee.deleteMany({ where: { AND: { issueId: +id, userId: value } } });
      break;
    default:
      await client.issue.update({ where: { id: +id }, data: { [type]: value } });
      break;
  }
  res.end();
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
  const assigneesRef = client.assignee.findMany({ where: { issueId: id } });
  const deletedIssue = client.issue.delete({ where: { id } });
  const [{ id: oldId, ...oldData }, assignees] = await Promise.all([deletedIssue, assigneesRef]);
  // insert into new location
  const { id: newId } = await client.issue.create({
    data: { ...oldData, order: newOrder, listId: dId },
  });
  // update assignee's forieng key
  const assigneeIds = assignees.map(({ id }) => id);
  const updateAssignees = client.assignee.updateMany({
    where: { id: { in: assigneeIds } },
    data: { issueId: newId },
  });
  return Promise.all([reorderSource, reorderTarget, updateAssignees]);
}

const { PrismaClient } = require('@prisma/client');
const { sameContainerReorder, diffContainerReorder } = require('./util');

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
  const { id: issueId } = await client.issue.create({
    data: { ...data, order: order + 1, listId },
  });
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

exports.deleteIssue = async (req, res) => {
  const { id } = req.params;
  const issue = await client.issue.delete({ where: { id: +id } });
  res.json(issue).end();
};

exports.reorderIssues = async (req, res) => {
  const {
    id,
    s: { sId, order },
    d: { dId, newOrder },
  } = req.body;

  await (sId === dId
    ? sameContainerReorder({ id, order, newOrder }, { listId: sId }, client.issue)
    : diffContainerReorder(req.body, client.issue));
  res.end();
};

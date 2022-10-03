const { PrismaClient } = require('@prisma/client');
const { sameContainerReorder, diffContainerReorder, badRequest } = require('./util');

const client = new PrismaClient();

exports.getIssuesInProject = async (req, res) => {
  try {
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
  } catch (err) {
    return badRequest(res);
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { projectId, listId, assignees, ...data } = req.body; // opt out projectId
    const { _count: order } = await client.issue.aggregate({ where: { listId }, _count: true });
    const { id: issueId } = await client.issue.create({
      data: { ...data, order: order + 1, listId },
    });
    // create assignee[] rows with new issue id
    await client.assignee.createMany({
      data: assignees.map((userId) => ({ issueId, userId, projectId })),
    });
    res.json({ msg: 'issue is created' }).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value, projectId } = req.body;

    switch (type) {
      case 'listId':
        const { _count: order } = await client.issue.aggregate({
          where: { listId: value },
          _count: true,
        });
        await client.issue.update({
          where: { id: +id },
          data: { [type]: value, order: order + 1 },
        });
        break;
      case 'addAssignee':
        await client.assignee.create({ data: { issueId: +id, userId: value, projectId } });
        break;
      case 'removeAssignee':
        await client.assignee.deleteMany({ where: { AND: { issueId: +id, userId: value } } });
        break;
      default:
        await client.issue.update({ where: { id: +id }, data: { [type]: value } });
        break;
    }
    res.end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await client.issue.delete({ where: { id: +id } });
    res.json(issue).end();
  } catch (err) {
    return badRequest(res);
  }
};

exports.reorderIssues = async (req, res) => {
  try {
    const {
      id,
      s: { sId, order },
      d: { dId, newOrder },
    } = req.body;

    await (sId === dId
      ? sameContainerReorder({ id, order, newOrder }, { listId: sId }, client.issue)
      : diffContainerReorder(req.body, client.issue));
    res.end();
  } catch (err) {
    return badRequest(res);
  }
};

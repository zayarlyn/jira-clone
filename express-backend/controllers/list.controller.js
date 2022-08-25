const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.getIssuesInList = async (req, res) => {
  const { listId } = req.params;
  const issues = await client.issue.findMany({ where: { listId: +listId } });
  res.json(issues).end();
};

exports.getListsInProject = async (req, res) => {};

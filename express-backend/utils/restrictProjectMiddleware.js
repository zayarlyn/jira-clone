const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.restrictProjectMiddleware = async (req, res, next) => {
  const projectId = Number(req.params.projectId ?? req.body.projectId ?? req.query.projectId);
  if (!projectId) return reject(res);
  const project = await client.member.findFirst({
    where: { AND: { userId: req.user.uid, projectId } },
  });
  if (!project) return reject(res);
  req.customParams = req.params;
  next();
};

const reject = (res) => res.status(403).json({ message: 'sus' }).end();

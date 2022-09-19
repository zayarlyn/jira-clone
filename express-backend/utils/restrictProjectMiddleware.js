const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

exports.restrictProjectMiddleware = async (req, res, next) => {
  const { user, params } = req;
  // if (!params.projectId) return respondUnauthorized(res);
  const project = await client.member.findFirst({
    where: { AND: { userId: user.uid, projectId: Number(params.projectId) } },
  });
  if (!project) return respondUnauthorized(res);
  req.customParams = params;
  next();
};

const respondUnauthorized = (res) =>
  res.status(401).json({ message: 'you are not part of this project' }).end();

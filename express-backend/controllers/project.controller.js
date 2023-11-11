const { PrismaClient } = require('@prisma/client')
const { badRequest } = require('./util')

const client = new PrismaClient()

exports.getProjects = async (req, res) => {
	try {
		if (+req.params.userId !== req.user.uid) return res.status(401).json({ message: "you can't access other people's projects" }).end()
		const userId = Number(req.params.userId)
		const members = await client.member.findMany({ where: { userId } })
		const projectIds = members.map(({ projectId: pid }) => pid)
		const projects = await client.project.findMany({
			where: { id: { in: projectIds } },
			orderBy: { updatedAt: 'asc' },
		})
		res.json(projects).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.getProject = async (req, res) => {
	try {
		const { projectId } = req.customParams
		const project = await client.project.findFirst({
			where: { id: +projectId },
		})
		res.json(project).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.createProject = async (req, res) => {
	try {
		const project = await client.project.create({ data: req.body })
		await client.member.create({
			data: { projectId: project.id, userId: req.body.userId, isAdmin: true },
		})
		res.json(project).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.updateProject = async (req, res) => {
	try {
		const { projectId } = req.customParams
		const project = await client.project.update({ where: { id: +projectId }, data: req.body })
		res.json(project).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.deleteProject = async (req, res) => {
	try {
		const { projectId } = req.customParams
		await client.project.delete({ where: { id: +projectId } })
		res.json({ message: 'The project is deleted successfully' }).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.leaveProject = async (req, res) => {
	try {
		const projectId = +req.customParams.projectId
		const { userId, memberId } = req.body
		const member = client.member.delete({ where: { id: memberId } })
		const assignees = client.assignee.deleteMany({ where: { userId, projectId } })
		const relatedIssues = client.list.findMany({
			where: { projectId },
			select: { issues: { where: { reporterId: userId }, select: { id: true } } },
		})
		const [issues] = await Promise.all([relatedIssues, assignees, member])
		const issueIds = issues.reduce((t, { issues: i }) => t.concat(i), []).map(({ id }) => id)
		await client.issue.deleteMany({ where: { id: { in: issueIds } } })
		res.json({ message: 'You left from this project successfully' }).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

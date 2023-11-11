const { PrismaClient } = require('@prisma/client')
const { badRequest } = require('./util')

const client = new PrismaClient()

exports.getMembersInProject = async (req, res) => {
	try {
		const { projectId } = req.customParams
		const members = await client.member.findMany({
			where: { projectId: +projectId },
			orderBy: { createdAt: 'asc' },
			include: { User: { select: { username: true, email: true, profileUrl: true } } },
		})
		const users = members.map(({ User, ...memberData }) => ({
			...memberData,
			...User,
		}))
		res.json(users).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.addMember = async (req, res) => {
	try {
		const { projectId, userId } = req.body
		const member = client.member.create({
			data: { userId, projectId: +projectId },
		})
		const project = client.project.update({
			where: { id: projectId },
			data: { updatedAt: new Date(Date.now()).toISOString() },
		})
		await Promise.all([member, project])
		res.json(member).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.removeMember = async (req, res) => {
	try {
		const { memberId: id, projectId, userId } = req.body
		const member = client.member.delete({ where: { id } })
		const removeAssignees = client.assignee.deleteMany({ where: { AND: { userId, projectId } } })
		const project = client.project.update({
			where: { id: projectId },
			data: { updatedAt: new Date(Date.now()).toISOString() },
		})
		await Promise.all([member, removeAssignees, project])
		res.json(member).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

const { PrismaClient } = require('@prisma/client')
const { sameContainerReorder, badRequest } = require('./util')

const client = new PrismaClient()

exports.getListsInProject = async (req, res) => {
	try {
		const { projectId } = req.customParams
		const lists = await client.list.findMany({
			where: { projectId: +projectId },
			orderBy: { order: 'asc' },
		})
		res.json(lists).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.createList = async (req, res) => {
	try {
		const { projectId } = req.body
		const { _count: order } = await client.list.aggregate({ where: { projectId }, _count: true })
		const list = await client.list.create({ data: { projectId, order: order + 1 } })
		res.json(list).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.updateList = async (req, res) => {
	try {
		const { id } = req.params
		const { projectId, ...data } = req.body //exclude projectId
		const list = await client.list.update({ where: { id: +id }, data })
		res.json(list).end()
		res.end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.deleteList = async (req, res) => {
	try {
		const { id } = req.params
		const list = await client.list.delete({ where: { id: +id } })
		res.json(list).end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

exports.reorderLists = async (req, res) => {
	try {
		const { id, order, newOrder, projectId } = req.body
		await sameContainerReorder({ id, order, newOrder }, { projectId }, client.list)
		res.end()
	} catch (err) {
		console.log(err)
		return badRequest(res)
	}
}

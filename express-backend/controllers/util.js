const { PrismaClient } = require('@prisma/client')
const client = new PrismaClient()

const sameContainerReorder = async ({ id, order, newOrder }, whereConfig, model) => {
	const ste = newOrder > order // whether it shifts further from start
	const toBeMoved = model.updateMany({
		where: {
			...whereConfig,
			AND: [{ order: { [ste ? 'gt' : 'lt']: order } }, { order: { [ste ? 'lte' : 'gte']: newOrder } }],
		},
		data: { order: { [ste ? 'decrement' : 'increment']: 1 } },
	})
	const dragged = model.update({ where: { id }, data: { order: newOrder } })
	return Promise.all([toBeMoved, dragged])
}

const diffContainerReorder = async ({ id, s: { sId, order }, d: { dId, newOrder } }, model) => {
	const toBeUpdatedSource = updateOrder({ id: sId, order, type: 'source', model })
	const toBeUpdatedTarget = updateOrder({ id: dId, order: newOrder, type: 'target', model })

	const [nullAssignees, nullComments] = await Promise.all([client.assignee.findMany({ where: { issueId: id } }), client.comment.findMany({ where: { issueId: id } })])

	const toBeDeleted = await model.delete({ where: { id } })
	await model.create({
		data: { ...toBeDeleted, order: newOrder, listId: dId },
	})
	const reattatchAssignees = client.assignee.createMany({ data: nullAssignees })
	const reattatchComments = client.comment.createMany({ data: nullComments })

	return Promise.all([toBeUpdatedSource, toBeUpdatedTarget, reattatchAssignees, reattatchComments])
}

const updateOrder = async ({ id, order, type, model }) => {
	const isSource = type === 'source'
	return model.updateMany({
		where: { listId: id, order: { [isSource ? 'gt' : 'gte']: order } },
		data: { order: { [isSource ? 'decrement' : 'increment']: 1 } },
	})
}

const badRequest = (res) => res.status(400).json({ message: 'Whoop! Looks like your http request is missing something.' }).end()

const cookieConfig = { httpOnly: true, secure: true, sameSite: 'none' }

module.exports = { sameContainerReorder, diffContainerReorder, badRequest, cookieConfig }

const handleSameListReorder = async ({ id, order, newOrder }, container, model) => {
  const btt = newOrder < order; // shift to left
  const reorderSource = reorder(
    container,
    [{ order: { [btt ? 'lt' : 'gt']: order } }, { order: { [btt ? 'gte' : 'lte']: newOrder } }],
    { order: { [btt ? 'increment' : 'decrement']: 1 } },
    model
  );
  const updateDraggedIssueOrder = model.update({ where: { id }, data: { order: newOrder } });
  return Promise.all([reorderSource, updateDraggedIssueOrder]);
};

const reorder = async (container, selectOptionos, updateCofig, model) => {
  const items = await model.findMany({
    where: { AND: [container, ...selectOptionos] },
    select: { id: true },
  });
  const ids = items.map(({ id }) => id);
  return model.updateMany({
    where: { id: { in: ids } },
    data: updateCofig,
  });
};

module.exports = { handleSameListReorder, reorder };

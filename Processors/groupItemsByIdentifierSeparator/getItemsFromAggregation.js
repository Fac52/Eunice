module.exports =
	aggregation => {
		return (
			aggregation
			&&
			createFromGroup()
		);

		function createFromGroup() {
			return (
				[
					...aggregation.items || [],
					getItemOrCreateItemForGroupAndParents(aggregation.group),
				]
			);
		}
	};

function getItemOrCreateItemForGroupAndParents(
	group
) {
	return (
		group.parent
		?
		getItemOrCreateItemForGroupAndParents({
			...group.parent,
			lastItemOfGroup: { item: getItemOrCreateItemForGroup(group) },
		})
		:
		getItemOrCreateItemForGroup(group)
	);
}

function getItemOrCreateItemForGroup(
	group
) {
	return (
		getItemOrCreateGroupItem({
			groupItem:
				group.item,
			itemsOfGroup:
				group.lastItemOfGroup
				&&
				[
					...group.itemsOfGroup || [],
					group.lastItemOfGroup.item,
				],
		})
	);
}

function getItemOrCreateGroupItem({
	groupItem,
	itemsOfGroup,
}) {
	return (
		itemsOfGroup
		?
		createGroupItemWithItemsOfGroup()
		:
		groupItem
	);

	function createGroupItemWithItemsOfGroup() {
		return (
			typeof groupItem === "string"
			?
			{
				id: groupItem,
				items: getItemOrItemsOfGroup(),
			}
			:
			{
				...groupItem,
				items:
					groupItem.items
					?
					getItemsOfGroupAndGroupItemItems()
					:
					getItemOrItemsOfGroup(),
			}
		);
	}

	function getItemsOfGroupAndGroupItemItems() {
		return (
			Array.isArray(groupItem.items)
			?
			[ ...groupItem.items, ...itemsOfGroup ]
			:
			[ groupItem.items, ...itemsOfGroup ]
		);
	}

	function getItemOrItemsOfGroup() {
		return (
			itemsOfGroup.length === 1
			?
			itemsOfGroup[0]
			:
			itemsOfGroup
		);
	}
}
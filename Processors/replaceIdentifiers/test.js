const replaceIdentifiers = require(".");

test.each(
	[
		[
			{ items: null },
			null,
		],
		[
			{ items: "item" },
			"item",
		],
		[
			{
				items: "item",
				pattern: "",
				replacement: "replacement",
			},
			"replacementitem",
		],
		[
			{
				items: { otherIdentifier: "item" },
				pattern: /.+/,
				replacement: "replacement",
			},
			{ otherIdentifier: "item" },
		],
		[
			{
				items: { otherIdentifier: "item" },
				pattern: "",
				replacement: "replacement",
			},
			{
				id: "replacement",
				otherIdentifier: "item",
			},
		],
		[
			{
				items: "item",
				pattern: /$/,
				replacement: "replacement",
			},
			"itemreplacement",
		],
		[
			{
				items: { items: "item" },
				pattern: "",
				replacement: "replacement",
			},
			{ id: "replacement", items: "replacementitem" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "parent",
				replacement: "replacement",
			},
			{ id: "replacement", items: "child" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "child",
				replacement: "replacement",
			},
			{ id: "parent", items: "replacement" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "child",
				replacement: "replacement",
				rootOnly: true,
			},
			{ id: "parent", items: "child" },
		],
	],
)(
	"%j returns %j",
	(
		{ items, pattern, replacement, rootOnly },
		expected,
	) =>
		expect(
			replaceIdentifiers({
				items,
				pattern,
				replacement,
				rootOnly,
			}),
		)
		.toEqual(expected),
);
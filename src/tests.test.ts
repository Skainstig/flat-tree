import { toFlat } from './toFlat';
import { fromFlat } from './fromFlat';
import { TreeNode } from './types';

const flat = [
	{
		children: [],
		value: 'c1',
	},
	{
		children: [],
		value: 'c2',
	},
	{
		children: [0, 1],
		value: 'b1',
	},
	{
		children: [],
		value: 'b2',
	},
	{
		children: [2, 3],
		value: 'a1',
	},
	{
		children: [],
		value: 'b3',
	},
	{
		children: [5],
		value: 'a2',
	},
	{
		children: [4, 6],
		value: 'root',
	},
];

const tree: TreeNode<string> = {
	value: 'root',
	children: [
		{
			value: 'a1',
			children: [
				{
					value: 'b1',
					children: [
						{ value: 'c1', children: [] },
						{ value: 'c2', children: [] },
					],
				},
				{ value: 'b2', children: [] },
			],
		},
		{ value: 'a2', children: [{ value: 'b3', children: [] }] },
	],
};

const increasingPath = {
	value: 0,
	children: [
		{
			value: 1,
			children: [
				{
					value: 2,
					children: [{ value: 3, children: [] }],
				},
			],
		},
	],
};

const oneLevelTree = {
	value: 'root',
	children: [
		{ value: 'child', children: [] },
		{ value: 'child', children: [] },
		{ value: 'child', children: [] },
		{ value: 'child', children: [] },
		{ value: 'child', children: [] },
	],
};
describe('toFlat and fromFlat', () => {
	it('toFlat should create flat tree and should,t mutate argument', () => {
		expect(toFlat(tree)).toEqual(flat);
		expect(tree).toEqual(tree);
	});

	it('fromFlat should create TreeNode and should,t mutate argument', () => {
		expect(fromFlat(flat)).toEqual(tree);
		expect(flat).toEqual(flat);
	});

	it('toFlat and fromFlat should be mutually inverse', () => {
		expect(toFlat(fromFlat(flat))).toEqual(flat);
		expect(fromFlat(toFlat(tree))).toEqual(tree);
	});

	it('children appear before the parent node', () => {
		const values = toFlat(increasingPath).map(({ value }) => value);
		const length = values.length;

		const isDecreases = values.every(
			(value, i) => i + 1 >= length || value > values[i + 1],
		);

		expect(isDecreases).toBe(true);
	});

	it('root should be last in array, flat presentation length should correct length', () => {
		const flat = toFlat(oneLevelTree);

		expect(flat.at(-1)?.value).toBe('root');
		expect(flat.length).toBe(oneLevelTree.children.length + 1);
	});
});

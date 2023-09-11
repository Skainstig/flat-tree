import { FlatPresentation, TreeNode } from './types';

const traverse = <T>(
	{ value, children }: TreeNode<T>,
	arr: FlatPresentation<T>,
): number => {
	const depsIndexes = children.map((child) => traverse(child, arr) - 1);
	return arr.push({ value, children: depsIndexes });
};

export const toFlat = <T>(tree: TreeNode<T>) => {
	const result: FlatPresentation<T> = [];

	traverse(tree, result);

	return result;
};

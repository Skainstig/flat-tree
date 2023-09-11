import { FlatNode, FlatPresentation, TreeNode } from './types';

const getTreeNode = <T>(
	index: number,
	flat: FlatPresentation<T>,
): TreeNode<T> => {
	const { value, children: childrenIndexes } = flat.at(index) as FlatNode<T>;
	const children = childrenIndexes.map((i) => getTreeNode(i, flat));

	return { value, children };
};

export const fromFlat = <T>(flat: FlatPresentation<T>) => getTreeNode(-1, flat);

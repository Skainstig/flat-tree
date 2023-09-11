export interface TreeNode<T> {
	value: T;
	children: TreeNode<T>[];
}

export interface FlatNode<T> {
	value: T;
	children: number[];
}

export type FlatPresentation<T> = FlatNode<T>[];

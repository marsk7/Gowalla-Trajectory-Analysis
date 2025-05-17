declare type Comparator<T> = (a: T, b: T) => number;
declare type Predicate<T> = (value: T) => boolean;
declare class SplayTreeNode<K, Node extends SplayTreeNode<K, Node>> {
    readonly key: K;
    left: Node | null;
    right: Node | null;
    constructor(key: K);
}
declare class SplayTreeSetNode<K> extends SplayTreeNode<K, SplayTreeSetNode<K>> {
    constructor(key: K);
}
declare class SplayTreeMapNode<K, V> extends SplayTreeNode<K, SplayTreeMapNode<K, V>> {
    readonly value: V;
    constructor(key: K, value: V);
    replaceValue(value: V): SplayTreeMapNode<K, V>;
}
declare abstract class SplayTree<K, Node extends SplayTreeNode<K, Node>> {
    protected abstract root: Node | null;
    size: number;
    protected modificationCount: number;
    protected splayCount: number;
    protected abstract compare: Comparator<K>;
    protected abstract validKey: Predicate<unknown>;
    protected splay(key: K): number;
    protected splayMin(node: Node): Node;
    protected splayMax(node: Node): Node;
    protected _delete(key: K): Node | null;
    protected addNewRoot(node: Node, comp: number): void;
    protected _first(): Node | null;
    protected _last(): Node | null;
    clear(): void;
    has(key: unknown): boolean;
    protected defaultCompare(): Comparator<K>;
    protected wrap(): SplayTreeWrapper<K, Node>;
}
declare class SplayTreeMap<K, V> extends SplayTree<K, SplayTreeMapNode<K, V>> implements Iterable<[K, V]>, Map<K, V> {
    protected root: SplayTreeMapNode<K, V> | null;
    protected compare: Comparator<K>;
    protected validKey: Predicate<unknown>;
    constructor(compare?: Comparator<K>, isValidKey?: Predicate<unknown>);
    delete(key: unknown): boolean;
    forEach(f: (value: V, key: K, map: Map<K, V>) => void): void;
    get(key: unknown): V | undefined;
    hasValue(value: unknown): boolean;
    set(key: K, value: V): this;
    setAll(other: Map<K, V>): void;
    setIfAbsent(key: K, ifAbsent: () => V): V;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    firstKey(): K | null;
    lastKey(): K | null;
    lastKeyBefore(key: K): K | null;
    firstKeyAfter(key: K): K | null;
    update(key: K, update: (value: V) => V, ifAbsent?: () => V): V;
    updateAll(update: (key: K, value: V) => V): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    [Symbol.toStringTag]: string;
}
declare class SplayTreeSet<E> extends SplayTree<E, SplayTreeSetNode<E>> implements Iterable<E>, Set<E> {
    protected root: SplayTreeSetNode<E> | null;
    protected compare: Comparator<E>;
    protected validKey: Predicate<unknown>;
    constructor(compare?: Comparator<E>, isValidKey?: Predicate<unknown>);
    delete(element: unknown): boolean;
    deleteAll(elements: Iterable<unknown>): void;
    forEach(f: (element: E, element2: E, set: Set<E>) => void): void;
    add(element: E): this;
    addAndReturn(element: E): E;
    addAll(elements: Iterable<E>): void;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    single(): E;
    first(): E;
    last(): E;
    lastBefore(element: E): E | null;
    firstAfter(element: E): E | null;
    retainAll(elements: Iterable<unknown>): void;
    lookup(object: unknown): E | null;
    intersection(other: Set<unknown>): Set<E>;
    difference(other: Set<unknown>): Set<E>;
    union(other: Set<E>): Set<E>;
    protected clone(): SplayTreeSet<E>;
    protected copyNode<Node extends SplayTreeNode<E, Node>>(node: Node | null): SplayTreeSetNode<E> | null;
    toSet(): Set<E>;
    entries(): IterableIterator<[E, E]>;
    keys(): IterableIterator<E>;
    values(): IterableIterator<E>;
    [Symbol.iterator](): IterableIterator<E>;
    [Symbol.toStringTag]: string;
}
interface SplayTreeWrapper<K, Node extends SplayTreeNode<K, Node>> {
    getRoot: () => Node | null;
    setRoot: (root: Node | null) => void;
    getSize: () => number;
    getModificationCount: () => number;
    getSplayCount: () => number;
    setSplayCount: (count: number) => void;
    splay: (key: K) => number;
    has: (key: unknown) => boolean;
}

export { SplayTreeMap, SplayTreeSet };

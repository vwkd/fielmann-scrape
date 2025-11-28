export type Keys<T> = (keyof T)[];

/**
 * Returns the keys of the own enumerable string-keyed properties of an object
 *
 * - note: only use when object's runtime shape matches its static type
 * - beware: unsafe if object has additional runtime properties not known to TypeScript (e.g. from subtype or dynamic assignment)
 *
 * @param obj object
 * @returns array of keys
 */
export function keys<T extends object>(obj: T): Keys<T> {
  return Object.keys(obj) as Keys<T>;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * Returns the key-value pairs of the own enumerable string-keyed properties of an object
 *
 * - note: only use when object's runtime shape matches its static type
 * - beware: unsafe if object has additional runtime properties not known to TypeScript (e.g. from subtype or dynamic assignment)
 *
 * @param obj object
 * @returns array of key-value pairs
 */
export function entries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

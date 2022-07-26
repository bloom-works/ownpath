/**
 * Helper function to check if any properties in the given
 * boolean map are 'true'; used to optionally display chunks
 * of data in UI
 * @param boolMap
 * @returns
 */
export function anyAreTrue(boolMap: { [key: string]: boolean }) {
  return Object.values(boolMap).some((bool) => !!bool);
}

export function toggleItemInList(list: any[], item: any) {
  // remove an item if it's in the list
  // or add it if it isn't
  return list.includes(item)
    ? list.filter((val) => val !== item)
    : [...list, item];
}

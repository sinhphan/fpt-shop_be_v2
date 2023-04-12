export function isEmptyObject(object?: object): boolean {
  if (!object) return false;
  return Object.keys(object).length === 0;
}

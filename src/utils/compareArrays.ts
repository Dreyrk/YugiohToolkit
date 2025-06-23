export default function compareArrays(array1: unknown[], array2: unknown[]): boolean {
  return array1.length === array2.length && array1.every((el, i) => el === array2[i]);
}

// Immutability
const sortAndMerge = (leftA, rightA) => {
  const merged = []
  while (leftA.length && rightA.length) {
    merged.push(leftA[0] < rightA[0] ? leftA.shift() : rightA.shift())
  }
  return [...merged, ...leftA, ...rightA]
}
const mergeSort2 = (arr) => {
  if (arr.length < 2) return arr
  const midIndex = Math.floor(arr.length / 2)
  const leftArr = mergeSort2(arr.slice(0, midIndex))
  const rightArr = mergeSort2(arr.slice(midIndex, arr.length))
  return sortAndMerge(leftArr, rightArr)
}

/*
const merge = (leftArr, rightArr, arr) => {
  // i, arr index
  // j, leftArr index
  // k, rightArr index
  let [i, j, k] = [0, 0, 0]
  while (j < leftArr.length && k < rightArr.length) {
    if (leftArr[j] <= rightArr[k]) (arr[i] = leftArr[j]), j++
    else (arr[i] = rightArr[k]), k++
    i++
  }
  while (j < leftArr.length) (arr[i] = leftArr[j]), j++, i++
  while (k < rightArr.length) (arr[i] = rightArr[k]), k++, i++
}

const mergeSort = (arr) => {
  const n = arr.length
  if (n < 2) return
  const mid = Math.floor(n / 2)
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid, n)
  mergeSort(leftArr)
  mergeSort(rightArr)
  merge(leftArr, rightArr, arr)
  return arr
}

let array = [5, 3, 2, 1, 6, 0, 8]
console.log(array)
console.log(mergeSort(array))
console.log(array)
*/
let array = [5, 3, 2, 1, 6, 0, 8, 9, 6]
console.log(array)
console.log(mergeSort2(array))
console.log(array)

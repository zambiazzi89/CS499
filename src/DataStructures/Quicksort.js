const Quicksort = (arr) => {
  if (arr.length < 2) return arr
  const pivot = arr[arr.length - 1]
  const leftArr = []
  const rightArr = []
  for (const el of arr.slice(0, arr.length - 1)) {
    el < pivot ? leftArr.push(el) : rightArr.push(el)
  }
  return [...Quicksort(leftArr), pivot, ...Quicksort(rightArr)]
}

let array = [5, 3, 2, 1, 6, 0, 8, 9, 6]
console.log(array)
console.log(Quicksort(array))
console.log(array)

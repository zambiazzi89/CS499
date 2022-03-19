export class CustomArray {
  constructor(arr = []) {
    this.array = arr
  }
  #sortAndMerge = (leftA, rightA) => {
    const merged = []
    while (leftA.length && rightA.length) {
      merged.push(leftA[0] < rightA[0] ? leftA.shift() : rightA.shift())
    }
    return [...merged, ...leftA, ...rightA]
  }
  mergeSort = () => {
    if (this.array.length < 2) return this.array
    const midIndex = Math.floor(this.array.length / 2)
    const leftArr = this.mergeSort(this.array.slice(0, midIndex))
    const rightArr = this.mergeSort(
      this.array.slice(midIndex, this.array.length)
    )
    return this.#sortAndMerge(leftArr, rightArr)
  }
  selectionSort() {
    let indexSmallest
    for (let i = 0; i < this.array.length; i++) {
      // Find index of smallest remaining element
      indexSmallest = i
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[j].bidId < this.array[indexSmallest].bidId) {
          indexSmallest = j
        }
      }
      // Swap arr at i and indexSmallest
      if (i !== indexSmallest)
        [this.array[i], this.array[indexSmallest]] = [
          this.array[indexSmallest],
          this.array[i],
        ]
    }
    return this.array
  }
  quickSort = (arr = this.array) => {
    if (arr.length < 2) return arr
    const pivot = arr[arr.length - 1]
    const leftArr = []
    const rightArr = []
    for (const el of arr.slice(0, arr.length - 1)) {
      el.bidId < pivot.bidId ? leftArr.push(el) : rightArr.push(el)
    }
    return [...this.quickSort(leftArr), pivot, ...this.quickSort(rightArr)]
  }

  findBid = (bidId) => {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].bidId === bidId) {
        return this.array[i]
      }
    }
    return false
  }
  removeBid = (bidId) => {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].bidId === bidId) {
        this.array.splice(i, 1)
        return this.array
      }
    }
    return false
  }
}

export class CustomArray {
  // array field defaults to an empty array if no argument is passed
  constructor(arr = []) {
    this.array = arr
  }

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!
   * !-- Not implemented yet --!
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Private helper function used by mergeSort()
   * While leftArr and rightArr have elements, compare the first element and push the smallest to "merged"
   * When one of the arrays has no elements, use the spread operator (...) to:
   *     return an array with the elements of merged first, then the elements of leftArr, and then the elements of rightArr
   * @param {Array} leftArr left array
   * @param {Array} rightArr right array
   * @returns a merged array of leftArr and rightArr argument arrays
   */
  #sortAndMerge = (leftArr, rightArr) => {
    const merged = []
    while (leftArr.length && rightArr.length) {
      merged.push(leftArr[0] < rightArr[0] ? leftArr.shift() : rightArr.shift())
    }
    return [...merged, ...leftArr, ...rightArr]
  }

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!
   * !-- Not implemented yet --!
   * !-- Errors to be fixed  --!
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Recursive function
   * Split array in two, call itself recursively for the left and right arrays
   * @returns array when length is smaller than 2, else return the merged array by calling #sortAndMerge helper function
   */
  mergeSort = () => {
    if (this.array.length < 2) return this.array
    const midIndex = Math.floor(this.array.length / 2)
    const leftArr = this.mergeSort(this.array.slice(0, midIndex))
    const rightArr = this.mergeSort(
      this.array.slice(midIndex, this.array.length)
    )
    return this.#sortAndMerge(leftArr, rightArr)
  }

  /**
   * Selection sort array
   * Find index of smallest remaining element
   * If i is not the smalled index, swap array elements at i and indexSmallest
   * @returns sorted array
   */
  selectionSort() {
    let indexSmallest
    for (let i = 0; i < this.array.length; i++) {
      //
      indexSmallest = i
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[j].bidId < this.array[indexSmallest].bidId) {
          indexSmallest = j
        }
      }
      if (i !== indexSmallest)
        [this.array[i], this.array[indexSmallest]] = [
          this.array[indexSmallest],
          this.array[i],
        ]
    }
    return this.array
  }

  /**
   * Quick sorts the array
   * Recursive function
   * Set the last element as pivot
   * Push smaller bidId elements to leftArr, and greater bidId elements to rightArr
   * @param {Array} arr (optional): array to be sorted, defaults to this.array
   * @returns If array length is smaller than 2, return array, else, an array using the spread operator calling itself recursively:
   *     Spreads elements of the function return value for the leftArr,
   *     then the pivot, then spreads the elements of the function return value for the rightArr
   */
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

  /**
   * Loop through the array searching for the bidId
   * @param {string} bidId bidId of the bid to be found
   * @returns the bid if found, or false otherwise
   */
  findBid = (bidId) => {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].bidId === bidId) {
        return this.array[i]
      }
    }
    return false
  }

  /**
   * Loop through the array searching for the bidId
   * Use splice to remove the element from the array
   * @param {string} bidId bidId of the bid to be removed
   * @returns the array if bid was found, or false otherwise
   */
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

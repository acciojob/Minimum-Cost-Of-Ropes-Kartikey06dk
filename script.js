function connectRopes(ropes) {
  // Create a min heap
  const minHeap = new MinHeap();

  // Add all the ropes to the min heap
  for (let rope of ropes) {
    minHeap.insert(rope);
  }

  let totalCost = 0;

  // Merge ropes until only one rope is left in the min heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min heap
    const smallest1 = minHeap.extractMin();
    const smallest2 = minHeap.extractMin();

    // Merge the two ropes and calculate the cost
    const mergedRope = smallest1 + smallest2;
    totalCost += mergedRope;

    // Add the merged rope back to the min heap
    minHeap.insert(mergedRope);
  }

  return totalCost;
}

// MinHeap class implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return min;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(smallestIndex, index);
      this.bubbleDown(smallestIndex);
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1]
    ];
  }
}

// Get the input element and the result element
const input = document.getElementById('input');
const result = document.getElementById('result');

// Handle the form submission
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const ropes = input.value.split(',').map(Number);
  const minimumCost = connectRopes(ropes);
  result.textContent = minimumCost;
});

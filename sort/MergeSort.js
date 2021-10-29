const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length * 0.5);

    const leftArr = mergeSort(arr.slice(0, middle));
    const rightArr = mergeSort(arr.slice(middle));

    return merge(leftArr, rightArr);
}

const merge = (leftArr, rightArr) => {
    let i = 0, j =0;
    let mergeArr = [];

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            mergeArr.push(leftArr[i]);
            i++;
        } else {
            mergeArr.push(rightArr[j]);
            j++;
        }
    }

    return mergeArr.concat(leftArr.slice(i)).concat(rightArr.slice(j));
}

const arr = [0,3,1,6,2,7];
console.log(mergeSort(arr))
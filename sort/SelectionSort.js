const selectionSort= (arr, key) => {
    if (arr.length <= 1) return;
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let k = i + 1; k < arr.length; k++) {
            if (key) {
                if (arr[k][key] < arr[minIndex][key]) {
                    minIndex = k;
                }
            } else {
                if (arr[k] < arr[minIndex]) {
                    minIndex = k;
                }
            }
        }
        let tmp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = tmp;
    }
}

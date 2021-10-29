const insertionSort = (arr, key) => {
    if (arr.length <= 1) return;
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];
        let k = i - 1;

        for (; k >= 0; k--) {
            if (key) {
                if (arr[k][key] > value[key]) {
                    arr[k + 1] = arr[k];
                } else {
                    break;
                }
            } else {
                if (arr[k] > value) {
                    arr[k + 1] = arr[k];
                } else {
                    break;
                }
            }
        }
        arr[k + 1] = value;
    }
}
const bubbleSort = (arr, key) => {
    if (arr.length <= 1) return;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let k = i + 1; k < arr.length; k++) {
            if (key) {
                if (arr[k][key] < arr[i][key]) {
                    let tmp = arr[k];
                    arr[k] = arr[i];
                    arr[i] = tmp;
                }
            } else {
                if (arr[k] < arr[i]) {
                    let tmp = arr[k];
                    arr[k] = arr[i];
                    arr[i] = tmp;
                }
            }
        }
    }
}
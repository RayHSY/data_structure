const quickSort = (arr, min = 0, max = arr.length - 1) => {
    if (min >= max) return;

    let pivot = arr[max];
    let current = min, i = min;

    while (i <= max) {
        if (arr[i] <= pivot) {
            if (current !== i) {
                let tmp = arr[current];
                arr[current] = arr[i];
                arr[i] = tmp;
            }
            current++;
        }
        i++;
    }

    quickSort(arr, min, current - 2);
    quickSort(arr, current, max);
}

let arr = [2,4,5,6,7,];
//find middle value

let mid = Math.floor(arr.length / 2);

if (arr.length % 2 === 0) {
    console.log(arr[mid - 1] + " " + arr[mid]);
} else {
    console.log(arr[mid]);
}
//find binary search 10

function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

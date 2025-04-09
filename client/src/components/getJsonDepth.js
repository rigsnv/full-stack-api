function getDepth(obj, currentDepth = 0) {
    if (typeof obj !== 'object' || obj === null) {
        return currentDepth;
    }
    let maxDepth = currentDepth;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            maxDepth = Math.max(maxDepth, getDepth(obj[key], currentDepth + 1));
        }
    }
    return maxDepth;
}

export default getDepth;
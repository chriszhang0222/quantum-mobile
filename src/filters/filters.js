let formatNumber = (obj) => {
    if (isNaN(obj)) {
        return 0;
    }
    return ("" + obj).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}

let truetransfer = (obj) => {
    if(obj === true || obj === 'true'){
        return 'Yes';
    }
    return 'No'
}

export default {
    formatNumber,
    truetransfer
}

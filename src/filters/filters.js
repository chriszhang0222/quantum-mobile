let formatNumber = (obj) => {
    if (isNaN(obj) || obj === null || obj === undefined || obj === '') {
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
function checkAddZone(num) {
    return num < 10 ? `0${num.toString()}` : num
}

const dateFilter = {
    dateFormatter(nows) {
        if (!nows) return ''
        const now = new Date(nows)
        const year = now.getFullYear()

        let month = now.getMonth() + 1
        month = checkAddZone(month)

        let date = now.getDate()
        date = checkAddZone(date)
        return `${year}-${month}-${date}`
    },

    dateTimeFormatter(t) {
        if (!t) return ''
        t = new Date(t).getTime() // eslint-disable-line
        t = new Date(t) // eslint-disable-line
        const year = t.getFullYear()
        let month = t.getMonth() + 1
        month = checkAddZone(month)

        let date = t.getDate()
        date = checkAddZone(date)

        let hour = t.getHours()
        hour = checkAddZone(hour)

        let min = t.getMinutes()
        min = checkAddZone(min)

        let se = t.getSeconds()
        se = checkAddZone(se)

        return `${year}-${month}-${date} ${hour}:${min}:${se}`
    },

    filterTime(value) {
        if (!value) {
            return value
        }
        const date = new Date(value * 1000)
        const y = 1900 + date.getYear()
        const m = `0${date.getMonth() + 1}`
        const d = `0${date.getDate()}`
        const val = `${y}-${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}`
        return val
    },
}
export default {
    formatNumber,
    truetransfer
}

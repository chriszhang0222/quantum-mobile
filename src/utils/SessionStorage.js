export const SessionStorage = {
    getJson: function (key) {
        let v = sessionStorage.getItem(key);
        if (v && typeof(v) !== "undefined" && v !== "undefined") {
            return JSON.parse(v);
        }
        return "";
    },
    get: function(key){
        let v = sessionStorage.getItem(key);
        if (v && typeof(v) !== "undefined" && v !== "undefined") {
            return v;
        }
        return "";
    },
    set: function (key, data) {
        sessionStorage.setItem(key, data);
    },
    setJSON: function(key, data){
      sessionStorage.setItem(key, JSON.stringify(data));
    },
    pop: function(key){
        let v = sessionStorage.getItem(key)
        if(v && typeof(v) !== 'undefined' && v !== 'undefined'){
            sessionStorage.removeItem(key);
            return v;
        }
        return null;
    },
    remove: function (key) {
        sessionStorage.removeItem(key);
    },
    clearAll: function () {
        sessionStorage.clear();
    }
}

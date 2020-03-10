export function parseQuery(url) {
    var query = {};
    if (!url) {
        url = window.location.search;
    }
    if (url.indexOf('?') !== -1) {
        var str = url.split('?')[1];
        var strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
            var temp = strs[i].split('=');
            if (temp.length === 2) {
                query[temp[0]] = unescape(temp[1]);
            }
        }
    }
    return query;
}

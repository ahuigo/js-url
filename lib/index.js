"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greeter = (name) => `Hello ${name}`;
/**
 * Created by ahuigo on 7/12/15.
 * Url.parseUrl();
 * @params url	eg: 'http://username:password@hilo.com/a/b/c?a=1#c1=2&c2=5';
 *				'hilo.com/b/c?a=1#c1=2&c2=5';
 *				'/a/b/c?a=1#c1=2&c2=5';
 */
String.prototype.parseUrl = function () {
    var url = this;
    var pos, str, urlInfo = { 'scheme': '', 'user': '', 'pass': '', 'path': '', 'query': '', 'fragment': '' };
    pos = url.indexOf('#');
    if (pos > -1) {
        urlInfo['fragment'] = url.substr(pos + 1);
        url = url.substr(0, pos);
    }
    pos = url.indexOf('://');
    if (pos > -1) {
        urlInfo['scheme'] = url.substr(0, pos);
        url = url.substr(pos + 3);
    }
    let host_pos, host_str, at_pos;
    if ((host_pos = url.indexOf('/')) > -1
        || (host_pos = url.indexOf('?')) > -1
        || (host_pos = url.indexOf('#')) > -1) {
        host_str = url.substr(0, host_pos);
    }
    else {
        host_str = url;
    }
    if ((at_pos = host_str.indexOf('@')) > -1) {
        const [user, pass] = host_str.substr(0, at_pos).split(':');
        urlInfo['user'] = user;
        urlInfo['pass'] = pass;
        host_str = host_str.substr(at_pos + 1);
    }
    const [host, port] = host_str.split(':');
    urlInfo['host'] = host;
    urlInfo['port'] = port ? port : 80;
    if (-1 == host_pos) {
        return urlInfo;
    }
    url = url.substr(host_pos);
    pos = url.indexOf('?');
    if (pos > -1) {
        urlInfo['path'] = url.substr(0, pos);
        urlInfo['query'] = url.substr(pos + 1);
    }
    else {
        urlInfo['path'] = url;
    }
    return urlInfo;
};
/**
 * addParams
 */
String.prototype.addParams = function (param, withHost = false) {
    var url, query;
    var urlInfo = this.parseUrl();
    query = urlInfo['query'];
    var params = query.parseStr();
    if (typeof param === 'string') {
        param = param.parseStr();
    }
    for (var [k, v] of Object.entries(param)) {
        params[k] = v;
    }
    query = http_build_query(params);
    url = '';
    if (withHost) {
        if (urlInfo['scheme']) {
            url += urlInfo['scheme'] + '://';
        }
        url += urlInfo['host'];
    }
    url += urlInfo['path'] + '?' + query;
    if (urlInfo['fragment']) {
        url += '#' + urlInfo['fragment'];
    }
    return url;
};
/**
 *
 * @param params
 * @param key_prefix
 * @param temp_key
 * @returns {string}
 */
const http_build_query = function (params, temp_key) {
    var output_string = [];
    Object.keys(params).forEach(function (ori_key) {
        var key = ori_key;
        var key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
        if (temp_key) {
            key = temp_key + '[' + key + ']';
        }
        if (typeof params[ori_key] === 'object') {
            var query = http_build_query(params[ori_key], key);
            output_string.push(query);
        }
        else if (['string', 'number'].includes(typeof params[ori_key])) {
            params[ori_key] += '';
            var value = encodeURIComponent(params[ori_key].replace(/[!'()*]/g, escape));
            output_string.push(key + '=' + value);
        }
    });
    return output_string.join('&');
};
/**
 * parseStr('a=1&b=2')
 */
String.prototype.parseStr = function (key) {
    var query = this.replace(/^[&?]/, '').replace(/&$/, '');
    var queryArr = query ? query.split('&') : [];
    var arr = {};
    for (var seg of queryArr) {
        var k = seg.split('=')[0];
        var v = seg.split('=')[1] || '';
        arr[k] = decodeURIComponent(v.replace(/\+/g, '%20'));
    }
    if (key) {
        return arr[key] ? arr[key] : '';
    }
    return arr;
};
String.prototype.encodeEntities = function () {
    var textArea = document.createElement('p');
    textArea.innerText = this;
    return textArea.innerHTML;
};



const {load, extract} = require('@node-rs/jieba')

function getData(data) {
    load();
    return extract(
        fetchAllText(data),
        20,
    );
}

function fetchAllText(data) {
    var allText = '';
    data.forEach(function (val, idx, arr) {
        allText += val.content;
    }, 0);
    return allText;
}
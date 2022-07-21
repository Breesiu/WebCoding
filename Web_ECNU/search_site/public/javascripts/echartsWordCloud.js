

// console.log(
//     fetchAllText()
// );

function fetchAllText() {
    var allText = '';
    $.get(`/wordCloudJieba_get?title=&source_name=`, function (data) {
        data.forEach(function (val, idx, arr) {
            allText += val.content;
        }, 0);

        return allText;
    });
}
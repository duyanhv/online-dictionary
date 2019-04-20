let wordData = [];
const API_KEY = 'trnsl.1.1.20190420T082816Z.13add468d68ed0ad.196cff2c69d297c735a7bbaa931e05e9e4abc052';
$.contextMenu({
    selector: 'body',
    callback: function (key, options) {
        var m = "clicked: " + key;
        window.console && console.log(m) || alert(m);
    },
    items: {
        "translate": {
            name: "Google Translate This Word",
            icon: "copy",
            callback: function (itemKey, opt, e) {
                var text = '';
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type !== "Control") {
                    text = document.selection.createRange().text;
                }
                console.log(text);
                $.ajax({
                    url: 'https://translate.yandex.net/api/v1.5/tr.json/detect?key=' + API_KEY + '&text=' + text,
                    type: 'get',
                    success: (result) => {
                        $.ajax({
                            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + API_KEY + '&text=' + text + '&lang=' + `${result.lang}-vi`,
                            type: 'get',
                            success: (result) => {
                                console.log(result);
                                const win = window.open('about:blank', 'window name', 'width=400, height = 400');
                                $(win.document.body).append($(`<p>Word: ${text}</p>`).html());
                                $(win.document.body).append(document.createElement("br"));
                                $(win.document.body).append($(`<p>Translated Word: ${result.text[0]}</p>`).html());
                                $(win.document.body).append(document.createElement("br"));
                                $(win.document.body).append($(`<p>Translate Direction: ${result.lang}</p>`).html());
                            },
                            error: (error) => {
                                console.log(error);
                            }
                        });
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            }
        }
    }
});

$("#inputWordSearchHome").keyup(_.debounce((e) => {
    getAllWord($("#inputWordSearchHome").val().trim());
}, 300));
const getAllWord = (filter = '') => {
    $('#wordWrapper').empty();
    $.ajax({
        url: `admin/GetAllWord/${filter}`,
        type: "get",
        success: (result) => {
            console.log(result);
            if (!result || !result.data || result.data.length <= 0) {
                return;
            }
            wordData = result.data;
            result.data.map((data) => {
                $('#wordWrapper').append(`<span onclick="showWordDetail(${data.id})">${data.word}</span>`);
            });
        },
        error: (error) => {
            console.log(error);
        }
    });
};
getAllWord();

const showWordDetail = (id) => {
    console.log(id);
    
    let selectedWord = wordData.filter((word) => parseInt(word.id, 10) === parseInt(id, 10));
    if (!selectedWord || selectedWord.length <= 0) {
        alert('Error');
        return;
    }
    selectedWord = selectedWord[0];

    $(".word-detail-header").text(selectedWord.word);
    $(".word-detail-verbose").text(selectedWord.verbose);
    $(".word-detail-description").text(selectedWord.description);
}
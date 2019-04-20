$('#table').bootstrapTable({
    pagination: true,
    columns: [{
        field: 'id',
        title: 'Id'
    }, {
        field: 'word',
        title: 'Word'
    }, {
        field: 'description',
        title: 'Description'
    }, {
        field: 'verbose',
        title: 'Verbose'
    }, {
        field: 'pos',
        title: 'Part Of Speech'
    }, {
        field: 'operate',
        title: 'Action',
        align: 'center',
        valign: 'middle',
        clickToSelect: false,
            formatter: function (value, row, index) {
                return '<button class=\'btn btn-primary \' onClick="onWordEdit(' + row.id + ');" >Edit</button> | <button class=\'btn btn-danger \' onClick="onWordDelete(' + row.id +');" >Delete</button> ';
        }
    }]
});
let isEditWordModalOpen = false;
let wordData = [];
let currentSelectedWordId = -1;

const onWordDelete = (id) => {
    $.ajax({
        url: `admin/DeactivateWord/${id}`,
        type: "get",
        success: (data) => {
            getAllWord();
        },
        error: (error) => {
            alert('Failed');
            console.log(error);
        }
    });
};

const onWordEdit = (id) => {
    isEditWordModalOpen = true;
    $('#wordEditTitle').text('Edit Word');
    $("#wordWrapper").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
    });
    let selectedWord = wordData.filter((word) => parseInt(word.id, 10) === parseInt(id, 10));
    if (!selectedWord || selectedWord.length <= 0) {
        alert('Error');
        return;
    }
    selectedWord = selectedWord[0];
    currentSelectedWordId = selectedWord.id;
    $("#wordWrapper input[name='word']").val(selectedWord.word);
    $("#wordWrapper textarea[name='description']").val(selectedWord.description);
    $("#wordWrapper input[name='pos']").val(selectedWord.pos);
    $("#wordWrapper input[name='verbose']").val(selectedWord.verbose);
};

$('#btnAddNewWord').on('click', (e) => {
    $('#wordEditTitle').text('Add New Word');
    clearAllModalInput();
    $("#wordWrapper").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
    });
});

const clearAllModalInput = () => {
    $("#wordWrapper input[name='word']").val('');
    $("#wordWrapper textarea[name='description']").val('');
    $("#wordWrapper input[name='pos']").val('');
    $("#wordWrapper input[name='verbose']").val('');
};

$("#wordWrapper input[name='word']").on('focus', () => {
    $("#wordWrapper input[name='word']").removeClass('red');
    $("#wordWrapper input[name='word']").css({ border: '' });
    $("#wordWrapper input[name='word']").attr("placeholder", "");
});
$("#wordWrapper textarea[name='description']").on('focus', () => {
    $("#wordWrapper textarea[name='description']").removeClass('red');
    $("#wordWrapper textarea[name='description']").css({ border: '' });
    $("#wordWrapper textarea[name='description']").attr("placeholder", "");
});
$("#wordWrapper input[name='verbose']").on('focus', () => {
    $("#wordWrapper input[name='verbose']").removeClass('red');
    $("#wordWrapper input[name='verbose']").css({ border: '' });
    $("#wordWrapper input[name='verbose']").attr("placeholder", "");
});
$("#wordWrapper input[name='pos']").on('focus', () => {
    $("#wordWrapper input[name='pos']").removeClass('red');
    $("#wordWrapper input[name='pos']").css({ border: '' });
    $("#wordWrapper input[name='pos']").attr("placeholder", "");
});
const wordSubmitValidation = () => {
    if (!$("#wordWrapper input[name='word']").val() || !$("#wordWrapper input[name='word']").val().trim()) {
        $("#wordWrapper input[name='word']").css({ border: '1px solid red' });
        $("#wordWrapper input[name='word']").attr("placeholder", "Please input word");
        $("#wordWrapper input[name='word']").addClass('red');
        return false;
    }

    if (!$("#wordWrapper textarea[name='description']").val() || !$("#wordWrapper textarea[name='description']").val().trim()) {
        $("#wordWrapper textarea[name='description']").css({ border: '1px solid red' });
        $("#wordWrapper textarea[name='description']").attr("placeholder", "Please input description");
        $("#wordWrapper textarea[name='description']").addClass('red');
        return false;
    }

    if (!$("#wordWrapper input[name='verbose']").val() || !$("#wordWrapper input[name='verbose']").val().trim()) {
        $("#wordWrapper input[name='verbose']").css({ border: '1px solid red' });
        $("#wordWrapper input[name='verbose']").attr("placeholder", "Please input verbose");
        $("#wordWrapper input[name='verbose']").addClass('red');
        return false;
    }

    if (!$("#wordWrapper input[name='pos']").val() || !$("#wordWrapper input[name='pos']").val().trim()) {
        $("#wordWrapper input[name='pos']").css({ border: '1px solid red' });
        $("#wordWrapper input[name='pos']").attr("placeholder", "Please input pos");
        $("#wordWrapper input[name='pos']").addClass('red');
        return false;
    }
    return true;
};
$("#inputSearchWordAdmin").keyup(_.debounce((e) => {
    getAllWord($("#inputSearchWordAdmin").val().trim());
}, 300));
$("#btnSubmit").on('click', (e) => {
    if (!wordSubmitValidation()) {
        return;
    }
    $.ajax({
        url: !isEditWordModalOpen ? 'admin/CreateWord' : `admin/EditWord/${currentSelectedWordId}`,
        type: "post",
        data: {
            word: {
                Word: $("#wordWrapper input[name='word']").val(),
                Description: $("#wordWrapper textarea[name='description']").val(),
                Pos: $("#wordWrapper input[name='pos']").val(),
                Verbose: $("#wordWrapper input[name='verbose']").val()
            }
        },
        success: (data) => {
            alert('Success');
            getAllWord();
            $.modal.close();
        },
        error: (error) => {
            alert('Failed');
            console.log(error);
        },
        complete: (data) => {
            isEditWordModalOpen = false;
        }
    });
});

const getAllWord = (filter = '') => {
    $.ajax({
        url: `admin/GetAllWord/${filter}`,
        type: "get",
        success: (result) => {
            $('#table').bootstrapTable("load", result.data);
            wordData = result.data;
        },
        error: (error) => {
            console.log(error);
        }
    });
};
getAllWord();
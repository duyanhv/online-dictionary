$('#table').bootstrapTable({
    pagination: true,
    columns: [{
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
    }],
    data: [{
        id: 1,
        name: 'Item 1',
        price: '$1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '$2'
    }]
});
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

$("#btnSubmit").on('click', (e) => {
    if (!wordSubmitValidation()) {
        return;
    }
      $.ajax({
        url: 'admin/AddWord',
        type: "post",
        data: {
            word: {
                Word: $("#wordWrapper input[name='word']").val(),
                Description: $("#wordWrapper textarea[name='description']").val(),
                Pos: $("#wordWrapper input[name='pos']").val(),
                Verbose: $("#wordWrapper input[name='verbose']").val()
            }
        },
        success:  (data) => {
            console.log(data);
        },
        error: (error) => {
            console.log(error);
        }
    });
});
const wordSubmitValidation = () => {
    if (!$(".form-group input[name='username']").val() || !$(".form-group input[name='username']").val().trim()) {
        $(".form-group input[name='username']").css({ border: '1px solid red' });
        $(".form-group input[name='username']").attr("placeholder", "Please input Username");
        $(".form-group input[name='username']").addClass('red');
        return false;
    }

    if (!$(".form-group input[name='password']").val() || !$(".form-group input[name='password']").val().trim()) {
        $(".form-group input[name='password']").css({ border: '1px solid red' });
        $(".form-group input[name='password']").attr("placeholder", "Please input description");
        $(".form-group input[name='password']").addClass('red');
        return false;
    }
    return true;
};

$(".form-group input[name='username']").on('focus', () => {
    $(".form-group input[name='username']").removeClass('red');
    $(".form-group input[name='username']").css({ border: '' });
    $(".form-group input[name='username']").attr("placeholder", "Your Username *");
});

$(".form-group input[name='password']").on('focus', () => {
    $(".form-group input[name='password']").removeClass('red');
    $(".form-group input[name='password']").css({ border: '' });
    $(".form-group input[name='password']").attr("placeholder", "Your Password *");
});


$("#btnSubmit").on('click', (e) => {
    if (!wordSubmitValidation()) {
        return;
    }
    $.ajax({
        url: '/Auth/Login',
        type: "post",
        data: {
            data: {
                Username: $(".form-group input[name='username']").val(),
                Password: $(".form-group input[name='password']").val()
            }
        },
        success: (result) => {
            console.log(result);
            if (!result) {
                alert('Username or Password is username or password is incorrect');
                return;
            }
            console.log(result.hasRole);
            window.location.replace(result.hasRole ?"/Admin" : "/");
        },
        error: (error) => {
            console.log(error);
        }
    });
})
$(document).ready(function () {
    const url = 'http://172.34.98.64:4000/'

    $("#register").on('click', function (e) {
        e.preventDefault();
        let name = $("#name").val()
        let email = $("#email").val()
        let password = $("#password").val()
        let user = {
            name,
            email,
            password
        }
        $.ajax({
            method: "POST",
            url: `${url}api/v1/register`,
            data: JSON.stringify(user),
            processData: false,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                console.log(data);
                Swal.fire({
                    icon: "success",
                    text: "register success",
                    position: 'bottom-right'

                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#avatar').on('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result)
                $('#avatarPreview').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#login").on('click', function (e) {
        e.preventDefault();

        let email = $("#email").val()
        let password = $("#password").val()
        let user = {
            email,
            password
        }
        $.ajax({
            method: "POST",
            url: `${url}api/v1/login`,
            data: JSON.stringify(user),
            processData: false,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                console.log(data);
                Swal.fire({
                    text: data.success,
                    showConfirmButton: false,
                    position: 'bottom-right',
                    timer: 1000,
                    timerProgressBar: true

                });
                sessionStorage.setItem('token', JSON.stringify(data.token))
                window.location.href = 'profile.html'
            },
            error: function (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    text: error.responseJSON.message,
                    showConfirmButton: false,
                    position: 'bottom-right',
                    timer: 1000,
                    timerProgressBar: true

                });
            }
        });
    });

    $("#updateBtn").on('click', function (event) {
        event.preventDefault();
        userId = sessionStorage.getItem('userId') ?? sessionStorage.getItem('userId')
       
        var data = $('#profileForm')[0];
       
        let formData = new FormData(data);
        formData.append('userId', userId)

        $.ajax({
            method: "POST",
            url: `${url}api/v1/update-profile`,
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

     $("#deactivateBtn").on('click', function (e) {
        e.preventDefault();
        let email = $("#email").val()
        let user = {
            email,
        }
        $.ajax({
            method: "DELETE",
            url: `${url}api/v1/deactivate`,
            data: JSON.stringify(user),
            processData: false,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                console.log(data);
                Swal.fire({
                    text: data.message,
                    showConfirmButton: false,
                    position: 'bottom-right',
                    timer: 2000,
                    timerProgressBar: true
                });
                sessionStorage.removeItem('userId')
                // window.location.href = 'home.html'
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
})

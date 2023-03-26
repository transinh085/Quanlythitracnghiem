Dashmix.helpersOnLoad(['js-flatpickr', 'jq-datepicker']);
Dashmix.onLoad((() => class {
    static initValidation() {
        Dashmix.helpers("jq-validation"), jQuery(".form-change-password").validate({
            rules: {
                "current-password": {
                    required: !0,
                    minlength: 5
                },
                "new-password": {
                    required: !0,
                    minlength: 5
                },
                "password-new-confirm": {
                    required: !0,
                    equalTo: "#new-password"
                },
            },
            messages: {
                "current-password": {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                "new-password": {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                "password-new-confirm": {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
            }
        })

    }
    static init() {
        this.initValidation()
    }
}.init()));

$("#update-password").click(function (e) { 
    e.preventDefault();
    if($(".form-change-password").valid()) {
        let currentPass = $("#current-password").val();
        console.log(currentPass);
        let newPass = $("#new-password").val();
        $.ajax({
            type: "post",
            url: "./account/changePassword",
            data: {
                matkhaucu: currentPass,
                matkhaumoi: newPass
            },
            dataType: "json",
            success: function (response) {
                if(response.valid) {
                    Dashmix.helpers('jq-notify', { type: 'success', icon: 'fa fa-check me-1', message: `${response.message}` });
                    $("#current-password").val("");
                    $("#new-password").val("");
                    $("#password-new-confirm").val("");
                } else {
                    Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: `${response.message}` });
                }
            }
        });
    }
});

    var oldName = $("#dm-profile-edit-name").val();
    let email = $("#dm-profile-edit-email").val();
    let oldBirthDay = $("#user_ngaysinh").val();
    let oldGender = $('input[name="user_gender"]:checked').val();
    let resultElement = $(".up-avatar");
    // let oldAvatar = $("#dm-profile-edit-avatar");

    $("#dm-profile-edit-avatar").change(function (e) { 
        const files = e.target.files
        const file = files[0]

        const fileReader = new FileReader()
        const dk = fileReader.readAsDataURL(file)

        fileReader.onload = function() {
            const url = fileReader.result
            resultElement.html(
                `<img class="img-avatar" src="${url}" alt="${file.name}">`,
                )
        }
    });

// $("#update-profile").click(function (e) {
//     e.preventDefault();
//     console.log($(".form-update-profile").valid())
//     if ($(".form-update-profile").valid()) {
//     let newName = $("#dm-profile-edit-name").val();
    
//     // console.log(newName);
//     // console.log(oldName);
//     // if (newName === oldName) {
//     //     console.log('False');
//     // } else {
//     //     console.log('True');
//     // }
//         $.ajax({
//             type: "post",
//             url: "./account/changeProfile",
//             data: { 
//                 hoten: $("#dm-profile-edit-name").val(),
//                 email: $("#dm-profile-edit-email").val(),
//                 ngaysinh: $("#user_ngaysinh").val(),
//                 gioitinh: $('input[name="user_gender"]:checked').val(),
//             },
//             dataType: "json",
//             success: function(response) {
//             // if (newName != oldName) {
//             //     Dashmix.helpers('jq-notify', { type: 'success', icon: 'fa fa-check me-1', message: `${response.message}` });
//             // } else {
//             //     Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: `${response.message}` });
//             // }   
//                 if (response.valid) {
//                     Dashmix.helpers('jq-notify', { type: 'success', icon: 'fa fa-check me-1', message: `${response.message}` });
//                 } else {
//                     Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: `${response.message}` })
//                 }
//             }
//         })
//     }
// })

$("#update-profile").click(function (e) {
    e.preventDefault();
    let newName = $("#dm-profile-edit-name").val();
    let newBirthDay = $("#user_ngaysinh").val();
    let newGender = $('input[name="user_gender"]:checked').val(); 
    let check;
    if (newName != oldName || newGender != oldGender || newBirthDay != oldBirthDay) {
        check = true;
    } else {
        check = false;
    }

    if (check) {
        $.ajax({
            type: "post",
            url: "./account/changeProfile",
            data: { 
                hoten: $("#dm-profile-edit-name").val(),
                email: $("#dm-profile-edit-email").val(),
                ngaysinh: $("#user_ngaysinh").val(),
                gioitinh: $('input[name="user_gender"]:checked').val(),
            },
            dataType: "json",
            success: function(response) {
                Dashmix.helpers('jq-notify', { type: 'success', icon: 'fa fa-check me-1', message: `${response.message}` });
            }
        })
    } else {
        Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: `Phải thay đổi ít nhất 1 thông tin` });
    }

    saveFileAvatar();
})

function saveFileAvatar() {
    $(document).ready(function() {
        // $("#dm-profile-edit-avatar").change(function (e) {
            
            // const files = e.target.files
            // const file = files[0]
            // const type = file.type
            // console.log(type)
        
            // const match = ["image/gif", "image/png", "image/jpg",];
        
            // if (type == match[0] || type == match[1] || type == match[2]) {
                const form_data = new FormData();
                const file_data = $('#dm-profile-edit-avatar')[0].files;
                form_data.append('dm-profile-edit-avatar', file_data[0]);
                $.ajax({
                    type: "post",
                    url: "./account/uploadFile",
                    data: form_data,
                    contentType: false,
                    processData:false,
                    // dataType: "json",
                    success: function(response) {
                        console.log(response)
                        // $(".up-avatar").html(response)
                        // $("#dm-profile-edit-avatar").val("")
                    }
                })
            // }
        // })
    })
}


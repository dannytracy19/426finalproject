const handleSubmit = function(event){
    event.preventDefault();
    let email = $(".email-input").val();
    let password = $("#pwd").val()



    let preferences = []
    $('#div_checkboxes :checked').each(function(){
        preferences.push($(this).val());
    })

    //axios call to create a new user
    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/signuppage',
        data:{
            "email":email,
            "password": password,
            "preferences": preferences
        }
    })

    //console.log(result)



  //window.location.href = "homepage.html";

    
}





$(function() {
    $(`button.button.is-dark.submit`).on("click", handleSubmit)
});

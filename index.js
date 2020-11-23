const handleSubmit =  function(event){
    console.log("something");
    event.preventDefault();
    let email = $(".email-login").val();
    let password = $(".password-login").val()
    console.log(email);
    console.log(password);


    const $message = $('#message')


    checkCredentials(email,password).then(()=> {
        $message.replaceWith('<span id="message" class="has-text-success">Success! You are now logged in.</span>')
        var timer = setTimeout(function() {
            window.location='/homepage.html'
        }, 3000);
    }).catch(() => {
        $message.replaceWith('<span id="message" class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    })

    


}


//checking the user's credentials
const checkCredentials = async function(email, password) {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3030/',
        data:{
            "email":email,
            "password": password,
        },
        withCredentials: true
    })

    return result;

}

$(function() {
    $(`.login-login`).on("click", handleSubmit)
    
});
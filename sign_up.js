//import axios from 'axios';

const handleSubmit = function(event){
    event.preventDefault();
    email = $(".email-input").val();

    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/',
        data:{
            "email":email
        }
    })

  

    
}


$(function() {
    $(`button.button.is-dark.submit`).on("click", handleSubmit)




});




//import axios from 'axios';

const handleSubmit = function(event){
    event.preventDefault();
    let email = $(".email-input").val();


    let preferences = []
    $('#div_checkboxes :checked').each(function(){
        preferences.push($(this).val());
    })

 



    //let preferences = 'meat'

    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/',
        data:{
            "email":email,
            "preferences": preferences
        }
    })

  window.location.href = "homepage.html";

    
}





$(function() {
    $(`button.button.is-dark.submit`).on("click", handleSubmit)




});

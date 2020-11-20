


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

  

    
}
const handleNext = function(event){
    event.preventDefault();
    window.location.href = "favfoodssignup.html";
    $('.prefsubmit').on("click", handlePreferences);

}

const handlePreferences = function(event){
    console.log("something");
    event.preventDefault();
    var preferences = [];
    $('.pref:checkbox:checked').each(function () {
        preferences.push($(this).val());
        console.log($(this).val());
    });
    console.log(preferences);

    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/preferences',
        data:{
            "preferences":preferences
        }
    })

    

    
}


$(function() {
    $(`button.button.is-dark.submit`).on("click", handleSubmit)
    $('.next').on("click", handleNext);
    $('.prefsubmit').on("click", handlePreferences);



});

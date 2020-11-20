const handleMeetup = function(event){
    console.log("something");
    event.preventDefault();
    let address1 = $('.address1').val();
    let address2 = $('.address2').val();
    let meettype = $('input:radio[name=meetingplace]:checked').val();
    let stars = $('input:radio[name=stars]:checked').val();
    let price = $('input:radio[name=price]:checked').val();
 
    //let preferences = 'meat'

    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/meetups',
        data:{
            "address1": address1,
            "address2": address2,
            "meettype": meettype,
            "stars": stars,
            "price": price
        }
    })

  //window.location.href = "homepage.html";

    
}





$(function() {
    $(`.meetup`).on("click", handleMeetup)




});

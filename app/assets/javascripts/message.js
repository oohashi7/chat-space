$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main__message__cargo" data-message-id=${message.id}>
         <div class="main__message__cargo__info">
           <div class="main__message__cargo__info__talker">
             ${message.user_name}
           </div>
           <div class="main__message__cargo__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="form">
           <p class="form__mask">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main__message__cargo" data-message-id=${message.id}>
         <div class="main__message__cargo__info">
           <div class="main__message__cargo__info__talker">
             ${message.user_name}
           </div>
           <div class="main__message__cargo__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="form">
           <p class="form__mask">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main__message').append(html);      
    $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
    $('form')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
    
    
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  })
  
})
});
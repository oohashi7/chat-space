$(function(){ 
  

  function buildHTML(message){
   if (message.content && message.image) {
     var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="main__message__cargo">
          <div class="main__message__cargo__info">
            <div class="main__message__cargo__info__talker">
              ${message.user_name}
            </div>
            <div class="main__message__cargo__info__date">
              ${message.created_at}
            </div>
          </div>
        </div>
        <p class="lower-message__content">
          ${message.content}
        </p>
        <img src=${message.image} >
      </div>
       `
     return html;
   } else  if (message.content) {
     var html =
     `<div class="message" data-message-id=${message.id}>
        <div class="main__message__cargo">
          <div class="main__message__cargo__info">
            <div class="main__message__cargo__info__talker">
              ${message.user_name}
            </div>
            <div class="main__message__cargo__info__date">
              ${message.created_at}
            </div>
          </div>
        </div>
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
   `
   } else  if (message.image) {
        var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="main__message__cargo">
            <div class="main__message__cargo__info">
              <div class="main__message__cargo__info__talker">
                ${message.user_name}
              </div>
              <div class="main__message__cargo__info__date">
                ${message.created_at}
              </div>
            </div>
          </div>
          <img src=${message.image} >
        </div>
      `
   };
   return html;
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
    $('form')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
})

var reloadMessages = function() {
  last_message_id = $('.message:last').attr('data-message-id');
  
  $.ajax({
    url: 'api/messages',
    type: 'get',
    dataType: 'json',
    data: { id: last_message_id }
  })
  .done(function(messages) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.main__message').append(insertHTML);
    $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
  })
}
setInterval(reloadMessages, 5000);
});
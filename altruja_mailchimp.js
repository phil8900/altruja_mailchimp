/*
Based on the tutorial by Jeff Irwin published here:
https://simplygoodwork.com/blog/how-to-add-a-mailchimp-subscribe-feature-to-an-existing-contact-form

The following code snippet can be placed in the Custom Javascript section in the Altruja Form settings.
*/

    $('<form id="mailchimpcustom" style="display:none;" action="https://placeholder.us#.list-manage.com/subscribe/post-json?u=#########################&id=##########&c=?"><input type="hidden" name="u" value="#########################"><input type="hidden" name="id" value="##########"><input type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" value=""><input type="text" name="MERGE1" id="MERGE1" size="25" value=""><input type="text" name="MERGE2" id="MERGE2" size="25" value=""><div><input type="submit"name="submitmailchimpcustom" value="Subscribe"></div></form>').insertAfter($('#altruja'));
    
  function submitMC() {
    var that = this;
    var $mcForm = $('#mailchimpcustom');
    
    $mcForm.submit(function(event) {
      event.preventDefault();
      var $form = $(this);
      var url = $form.attr('action');
      console.log(url);

      $.ajax({
        type: "GET",
        url: url,
        data: $form.serialize(),
        dataType: "jsonp",
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          submitContact();
        }
      });
    });
    
    $mcForm.submit();
  }

  $('#spendeform').submit(function(event) {
    event.preventDefault();
    var isChecked = $('#spende_profile_newsletter').is(':checked');
    if (checkForm() && isChecked) {
      $('#MERGE0').val($('#spende_profile_email').val());
      $('#MERGE1').val($('#spende_profile_vorname').val());
      $('#MERGE2').val($('#spende_profile_nachname').val());
      submitMC();
    } else {
      submitContact();
    }
  });

  function submitContact() {
    $('#spendeform').unbind('submit').submit();
  }

  function checkForm(){
  	var isComplete = true;

  	if(($('#spende_profile_gender_1').val() === '' && $('#spende_profile_gender_0').val() === '') || ($('#spende_profile_vorname').val() === '') || ($('#spende_profile_nachname').val() === '') || ($('#spende_profile_email').val() === '') || ($('#spende_profile_street').val() === '') || ($('#spende_profile_postcode').val() === '') || ($('#spende_profile_city').val() === '')){
  		isComplete = false;
  	}

  	return isComplete;
  }
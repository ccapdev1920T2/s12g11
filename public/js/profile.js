$(document).ready(function () {

    var uuName = $('#uuName').text();

    $.get('/authorityCheck', {uuName:uuName}, function (result) {
        
        if(result.uuName != uuName){
            $("p.buttonX").hide(0.001);
            $("p.buttonE").hide(0.001);
        }

    });

    $(".revAbt").on('click', '.buttonX', function () {
        if(confirm('Are you sure you want to delete this review?')){
            var reviewer = $(this).siblings('.reviewer').children('a').text();
            var reviewee = $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.reviewee').text();
            var revCourse = $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('.course').text();
            var revStar = $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('.star').text();

            $.get('/deleteReview', {reviewer:reviewer, reviewee:reviewee, revCourse:revCourse, revStar:revStar});
            $(this).closest('.revEntry').remove();
        }
    });

    $(".revAbt").on('click', '.buttonE', function () {
        if(confirm('Are you sure you want to edit this review?')){
            $(this).parent().parent().append(
                "<div class='editDiv'>" +
                "   <form class='editRev' autocomplete='off'>" +

                "       <input  type='text'     id='org_reviewer'   name='org_reviewer'     value='" + $(this).siblings('.reviewer').children('a').text() + "' hidden>" +
                "       <input  type='text'     id='org_reviewee'   name='org_reviewee'     value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.reviewee').text() + "' hidden>" +
                "       <input  type='text'     id='org_revCourse'  name='org_revCourse'    value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.course').text() + "' hidden>" +
                "       <input  type='text'     id='org_revStar'    name='org_revStar'      value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.star').text()  + "' hidden>" +

                "	    <input  type='text' 	id='review' 	name='review'						value='" + $(this).parent().parent().children('.revDet').text() + "' 	required>" +
                "       <input  type='text' 	id='course' 	name='course'	maxlength='10' 		value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.course').text() + "' size='10' disabled>" +
				"	    ✯<input 	type='number'	id='stars' 		name='stars'	min='0' max='5' 	step='0.5' value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.star').text() + "' required>" +
				"	    <input 	type='button' 	id='submit'		class='forClicks'    value='Change'>" +
                "   </form>" +
                "</div>"
            );

            $(this).prop('disabled',true);

            $(".editDiv").on('click', '#submit', function(){
                var reviewer    = $(this).siblings('#org_reviewer').val();
                var reviewee    = $(this).siblings('#org_reviewee').val();
                var revCourse   = $(this).siblings('#org_revCourse').val();
                var revStar     = parseFloat($(this).siblings('#org_revStar').val(), 10);
                
                var newRev = $(this).siblings('#review').val();
                var newCourse = $(this).siblings('#course').val();
                var newStars = parseFloat($(this).siblings('#stars').val(), 10);

				if(newRev!='' && !isNaN(newStars)){
					$.get('/editReview', {reviewer:reviewer, reviewee:reviewee, revCourse:revCourse, revStar:revStar, newRev:newRev, newCourse:newCourse, newStars:newStars}, function(result){

					});
					$(this).parent().parent().parent().children('.revAbt:last').children('.revTag').children('.course').text(newCourse);
					$(this).parent().parent().parent().children('.revAbt:last').children('.revTag').children('.star').text(newStars);
					$(this).parent().parent().parent().children('.revDet').text(newRev);
					
					$(this).parent().parent('.editDiv').remove();
					
					$(this).prop('disabled',false);
				}
				else{
					if(newRev == '')
						$('#review').css('background-color', 'red');
					else
						$('#review').css('background-color', '#756b64');
					
					if(isNaN(newStars))
						$('#stars').css('background-color', 'red');
					else
						$('#stars').css('background-color', '#756b64');
					
					alert('Null inputs for Reviews are not allowed!');
				}
                
            });
        }
    });

});


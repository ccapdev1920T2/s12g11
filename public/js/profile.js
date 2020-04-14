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
            var revCourse = $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.course').text();
            var revStar = $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.star').text(); 

            $.get('/deleteReview', {reviewer:reviewer, reviewee:reviewee, revCourse:revCourse, revStar:revStar});
            $(this).closest('.revEntry').remove();
        }
    });

    $(".revAbt").on('click', '.buttonE', function () {
        if(confirm('Are you sure you want to edit this review?')){
            $(this).parent().parent().append(
                "<div class='editDiv'>" +
                "   <form class='editRev' method='post' autocomplete='off'>" +

                "       <input  type='text'     id='org_reviewer'   name='org_reviewer'     value='" + $(this).siblings('.reviewer').children('a').text() + "' hidden>" +
                "       <input  type='text'     id='org_reviewee'   name='org_reviewee'     value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.reviewee').text() + "' hidden>" +
                "       <input  type='text'     id='org_revCourse'  name='org_revCourse'    value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.course').text() + "' hidden>" +
                "       <input  type='text'     id='org_revStar'    name='org_revStar'      value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.star').text()  + "' hidden>" +

                "	    <input  type='text' 	id='review' 	name='review'						value='" + $(this).parent().parent().children('.revDet').text() + "' 	required>" +
                "       <input  type='text' 	id='course' 	name='course'	maxlength='10' 		value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.course').text() + "' size='10' 		required>" +
				"	    <input 	type='number'	id='stars' 		name='stars'	min='0' max='5' 	step='0.5' value='" + $(this).parentsUntil('#reviewBox').children('.revAbt:last').children('.revTag').children('b.star').text() + "' required>" +
				"	    <input 	type='submit' 	id='submit'		value='Change'>" +
                "   </form>" +
                "</div>"
            );
            $(this).prop('disabled',true);
        }
    });
});
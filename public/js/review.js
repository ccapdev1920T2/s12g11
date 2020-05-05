$(document).ready(function () {

    $('#course').keyup(function() {
        var course = $('#course').val();

        $.get('/reviewCheck', {course:course}, function(result) {
            if(result._id != null){
                $('#course').css('color', 'red');
                $('#submit').prop('disabled',true);
                alert('You have already made a review for ' + course);
            }
            else{
                $('#course').css('color', 'white');
                $('#submit').prop('disabled',false);
            }
               
        });
    });

    $('#submit').click(function () {
        var fuName = window.location.pathname.slice(9);
        var review = $('#review').val();
        var course = $('#course').val();
		var stars = parseFloat($('#stars').val(), 10);

        if(review!='' && course!='' && !isNaN(stars)){
            $.get('/reviewPost', {review:review, course:course, stars:stars, fuName:fuName}, function(data, status) {
                $('#reviewBox').prepend(data);
                $('#review').prop('value', '');		$('#review').css('background-color', '#756b64');
                $('#course').prop('value', '');		$('#course').css('background-color', '#756b64');
                $('#stars').prop('value', '');		$('#stars').css('background-color', '#756b64');

                var isNewSubj = $('.revEntry:first').children('.isNewSubj').text();
                var resOaRating = parseFloat($('.revEntry:first').children('.resOaRating').text(), 10).toFixed(2);
                var resSubjRating = parseFloat($('.revEntry:first').children('.resSubjRating').text(), 10);

                $('#oaRating').children('p:last').text('✯' + resOaRating);

                if(isNewSubj == 'true'){
                    $('#details').append(
                        "<div class='detailDiv'>" +
						"	<p class='label, " + course + "'>" + course + " Rating: </p><p>✯" + resSubjRating + "</p>" +
						"</div>"
                    );
                }
                else{
					$('.' + course).next().text('✯' + resSubjRating);
                }
            });
        }
		else{
			if(review == '')
				$('#review').css('background-color', 'red');
			else
				$('#review').css('background-color', '#756b64');
			
			
			if(course == '')
				$('#course').css('background-color', 'red');
			else
				$('#course').css('background-color', '#756b64');
			
			if(isNaN(stars))
				$('#stars').css('background-color', 'red');
			else
				$('#stars').css('background-color', '#756b64');
			
			alert('Null inputs for Reviews are not allowed!');
        }
    });
});

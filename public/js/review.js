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
});

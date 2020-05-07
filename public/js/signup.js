$(document).ready(function () {

    $('#email').keyup(function () {
		
        validateField($('#email'), 'email', $('#emailError'));
		
    });
	
	$('#name').keyup(function () {
		
        validateField($('#name'), 'name', $('#nameError'));
		
    });

	$('#uuName').keyup(function () {

        validateField($('#uuName'), 'Username', $('#uuNameError'));
		
    });
 
    $('#course').keyup(function () {

        validateField($('#course'), 'course', $('#courseError'));
		
    });
	
    $('#id').keyup(function () {

        validateField($('#id'), 'ID Number', $('#idError'));
		
    });
	
    $('#pass').keyup(function () {

        validateField($('#pass'), 'password', $('#passError'));
		
    });
	
	//Validators
	function isFilled() {

        var email = validator.trim($('#email').val());
        var name = validator.trim($('#name').val());
        var uuName = validator.trim($('#uuName').val());
		var course = validator.trim($('#course').val());
        var id = validator.trim($('#id').val());
        var pass = validator.trim($('#pass').val());
		
        var emailEmpty = validator.isEmpty(email);
        var nameEmpty = validator.isEmpty(name);
        var uuNameEmpty = validator.isEmpty(uuName);
		var courseEmpty = validator.isEmpty(course);
        var idEmpty = validator.isEmpty(id);
        var passEmpty = validator.isEmpty(pass);

        return !emailEmpty && !nameEmpty && !uuNameEmpty && !courseEmpty && !idEmpty && !passEmpty;
		
    };
	
	function isValidID(field, callback) {
		
        var id = validator.trim($('#id').val());
        var isValidLength = validator.isLength(id, {min: 8, max: 8});
		
        if(isValidLength) {
			
            $.get('/checkID', {id: id}, function (result) {

                if(result.id != id) {
					
                    if(field.is($('#id')))
                        $('#idError').text('');
					
                    return callback(true);

                }
                else {
					
                    if(field.is($('#id')))
                        $('#idError').text('ID number already exists.');
					
                    return callback(false);
                }
            });
        }
        else {
			
            if(field.is($('#id')))
                $('#idError').text('ID Number should contain 8 digits.');
			
            return callback(false);
        }
		
    };
	
	function isValidUsername(field, callback) {
		
        var uuName = validator.trim($('#uuName').val());
        var isValidLength = validator.isLength(uuName, {min: 3, max: 20});
		
        if(isValidLength) {
			
            $.get('/checkUsername', {uuName: uuName}, function (result) {

                if(result.uuName != uuName) {
					
                    if(field.is($('#uuName')))
                        $('#uuNameError').text('');
					
                    return callback(true);

                }
                else {
					
                    if(field.is($('#uuName')))
                        $('#uuNameError').text('Username number already exists.');
					
                    return callback(false);
                }
            });
        }
        else {
			
            if(field.is($('#uuName')))
                $('#uuNameError').text('Username should be 3-20 characters.');
			
            return callback(false);
        }
		
    };
	
	function isValidPassword(field) {

        var validPassword = false;

        var password = validator.trim($('#pass').val());
        var isValidLength = validator.isLength(password, {min: 8});
		
        if(isValidLength) {
			
            if(field.is($('#pass')))
                $('#passError').text('');
			
            validPassword = true;
        }
        else {
			
            if(field.is($('#pass')))
                $('#passError').text(`Should be at least 8characters.`);
			
        }
		
        return validPassword;
		
    };
	
	function validateField(field, fieldName, error) {
		
		var value = validator.trim(field.val());
		var empty = validator.isEmpty(value);
		
		if(empty) {
			
			field.prop('value', '');
			error.text(fieldName + ' should not be empty.');
			
		}
		else
			error.text('');
		
		
		var filled = isFilled();
		var validPassword = isValidPassword(field);
		
		isValidID(field, function (validID) {
			
			var validID = validID;
			
		});
		
		isValidUsername(field, function (validUsername) {
			
			var validUsername = validUsername;
			
		});
		
		if(filled && validPassword && validID && validUsername)
			$('#submit').prop('disabled', true);
		else
			$('#submit').prop('disabled', false);
	
    }
	
});

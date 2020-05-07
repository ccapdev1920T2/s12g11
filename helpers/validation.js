const { check } = require('express-validator');

const validation = {

    signupValidation: function () {
		
        var validation = [
		
			check('email', 'Email should not be empty.').notEmpty(),
            check('name', 'Name should not be empty.').notEmpty(),
            check('uuName', 'Username should be 3-20 characters.').isLength({min: 3, max: 20}),
			check('course', 'Course should not be empty.').notEmpty(),
            check('id', 'ID number should contain 8 digits.').isLength({min: 8, max: 8}),
            check('pass', 'Passwords should contain at least 8 characters.').isLength({min: 8})
			
        ];

        return validation;
		
    }
	
}

module.exports = validation;

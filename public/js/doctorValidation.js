$(document).ready(function() {
    $('#nurseForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	temparature: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The Temparature is required and can\'t be empty'
                    },
                    numeric: {
                        message: 'The value is not an numeric'
                        
                    }
                }
            },
            heartBeat: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The heartBeat is required and can\'t be empty'
                    },
                    numeric: {
                        message: 'The value is not an numeric'
                        
                    }
                }
            },
            bloodpressure: {
                message: 'The bloodpressure is not valid',
                validators: {
                    notEmpty: {
                        message: 'The bloodpressure is required and can\'t be empty'
                    },
                    numeric: {
                        message: 'The value is not an numeric'
                        
                    }
                }
            },
            height: {
                message: 'The height is not valid',
                validators: {
                    notEmpty: {
                        message: 'The height is required and can\'t be empty'
                    },
                    numeric: {
                        message: 'The value is not an numeric'
                        
                    }
                }
            },
            weight: {
                message: 'The weight is not valid',
                validators: {
                    notEmpty: {
                        message: 'The weight is required and can\'t be empty'
                    },
                    numeric: {
                        message: 'The value is not an numeric'
                        
                    }
                }
            }
            
            
        }
    });
});
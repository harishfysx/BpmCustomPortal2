$('#dob').datetimepicker({
    format: 'YYYY-MM-DD'
}).on('dp.change dp.show', function(e) {
    // Validate the date when user change it
    $('#frontDeskForm').data('bootstrapValidator').revalidateField('dob');
    // You also can call it as following:
    // $('#defaultForm').bootstrapValidator('revalidateField', 'datetimePicker');
});;

$('#insExpDate').datetimepicker({
    format: 'YYYY-MM-DD'
}).on('dp.change dp.show', function(e) {
    // Validate the date when user change it
    $('#frontDeskForm').data('bootstrapValidator').revalidateField('insExpDate');
    // You also can call it as following:
    // $('#defaultForm').bootstrapValidator('revalidateField', 'datetimePicker');
});;

$(document).ready(function() {
    $('#frontDeskForm')
        .bootstrapValidator({
            excluded: [':disabled'],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	firstName: {
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        }
                    }
                },
                lastName: {
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {}
                    }
                },
                dob: {
                    validators: {
                        notEmpty: {
                            message: 'The date is required and cannot be empty'
                        },
                        date: {
                            format: 'YYYY-MM-DD'
                        }
                    }
                },
                
                address1: {
                    validators: {
                        notEmpty: {
                            message: 'The address  is required'
                        }
                    }
                },
                state: {
                    validators: {
                        notEmpty: {
                            message: 'The State  is required'
                        }
                    }
                },
                city: {
                    validators: {
                        notEmpty: {
                            message: 'The City is required'
                        }
                    }
                },
                country: {
                    validators: {
                        notEmpty: {
                            message: 'The Country is required'
                        }
                    }
                },
                zip: {
                    validators: {
                        notEmpty: {
                            message: 'The Zip is required'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'The Phone is required'
                        }
                    }
                },
                memberId: {
                    validators: {
                        notEmpty: {
                            message: 'The Phone is required'
                        }
                    }
                },
                organization: {
                    validators: {
                        notEmpty: {
                            message: 'The Phone is required'
                        }
                    }
                },
                insExpDate: {
                    validators: {
                        notEmpty: {
                            message: 'The date is required and cannot be empty'
                        },
                        date: {
                            format: 'YYYY-MM-DD'
                        }
                    }
                }
                
                
            }
        })
        .on('status.field.bv', function(e, data) {
        	
            var $form     = $(e.target),
                validator = data.bv,
                $tabPane  = data.element.parents('.tab-pane'),
                tabId     = $tabPane.attr('id');
           
            if (tabId) {
                var $icon = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent().find('i');

                // Add custom class to tab containing the field
                if (data.status == validator.STATUS_INVALID) {
                    $icon.removeClass('fa-check').addClass('fa-times');
                } else if (data.status == validator.STATUS_VALID) {
                    var isValidTab = validator.isValidContainer($tabPane);
                    $icon.removeClass('fa-check fa-times')
                         .addClass(isValidTab ? 'fa-check' : 'fa-times');
                }
            }
        });
});
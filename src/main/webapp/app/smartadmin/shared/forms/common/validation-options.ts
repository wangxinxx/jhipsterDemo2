declare var $: any;

export const VALIDATION_OPTIONS = {
  errorElement: 'em',
  errorClass: 'invalid',
  highlight(element, errorClass, validClass) {
    $(element).addClass(errorClass).removeClass(validClass);
    $(element).parent().addClass('state-error').removeClass('state-success');

  },
  unhighlight(element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);
    $(element).parent().removeClass('state-error').addClass('state-success');
  },
  errorPlacement(error, element) {
    error.insertAfter(element.parent());
  }
};

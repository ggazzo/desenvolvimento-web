import './login.html'
Template.login.events({
  'submit .form-signin': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $emailInput = $form.find('[name=user]').eq(0);
    var $passwordInput = $form.find('[name=pass]').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');
    //
    // if (!isValidEmail || !isValidPassword) {
    //   if (!isValidEmail) {
    //     sAlert.error('Invalid email address');
    //   }
    //   if (!isValidPassword) {
    //     sAlert.error('Your password must be at least 8 characters long');
    //   }
    // } else {
      Meteor.loginWithPassword(emailAddress, password, function (error) {
        if (error) {
          sAlert.error('Account login failed for unknown reasons :(');
        } else {
          Router.go('loggedInHome');
        }
      });
    }
  // }
});

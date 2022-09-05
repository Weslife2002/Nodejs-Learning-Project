window.onload = function()
{
    // Get the modal
    var loginModal = document.getElementById('login-modal');
    var loginButton = document.getElementById('login-button');
    var signUpModal = document.getElementById('sign-up-modal')
    var signUpButton = document.getElementById('sign-up-button');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == loginButton) {
            loginModal.style.display = "flex";
        }
        if (event.target == signUpButton) {
            signUpModal.style.display = "flex";
        }
        if (event.target == signUpModal) {
            signUpModal.style.display = "none";
        }
    }
};

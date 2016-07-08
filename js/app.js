/**
 * Created by Jules on 7/7/2016.
 */

Parse.initialize("r12GtnpusAeOqIbPL4lIVkwsMyomzgMmz21nF7Na");
Parse.serverURL = 'https://desolate-depths-20357.herokuapp.com/parse/'

//Variable declarations
var mSubmitButton = document.getElementById("submit_button");
var mForm = document.getElementById("form");

//SnackBar things
var snackbarContainer = document.querySelector('#demo-snackbar-example');
var handler = function (event) {
    event.preventDefault();
};

var data = {
    timeout: 2000,
    actionHandler: handler,
    actionText: '\n'
};

var PokeAdvocate = Parse.Object.extend("Advocates");
var pokeAdvocate = new PokeAdvocate();

var downloadRadio, usernameRadio;

//Check if the checkboxes are checked
var checkDownloadOptions = function () {
    downloadRadio = mForm.elements["download_options"];

    if (downloadRadio.value !== "yes" && downloadRadio.value !== "no") {
        data.message = "Fields marked with '*' are required." +
            "\nPlease review your submission and try again.";
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else {
        data.message = "download: " + /*mForm.elements["download_options"]*/downloadRadio.value;
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        checkUsernameOptions();
    }
};

var checkUsernameOptions = function () {
    usernameRadio = mForm.elements["username_options"];

    if (usernameRadio.value !== "yes" && usernameRadio.value !== "no") {
        data.message = "Fields marked with '*' are required." +
            "\nPlease review your submission and try again.";
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else {
        data.message = "username: " + usernameRadio.value;
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        checkEmail();
    }
};

var checkEmail = function () {
    var emailBox = document.getElementById("email");

    if (emailBox.value !== "") {
        data.message = "Email is not empty, we will check to see if it is valid";
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        if (correctEmail(emailBox.value)) {
            data.message = "Email is good";
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            pokeAdvocate.save(
                {
                    willDownload: downloadRadio.value,
                    wantUsername: usernameRadio.value,
                    usePokeFor: document.getElementById("poke_usage").value,
                    email: emailBox.value
                })
                .then(function(object) {
                    alert("Submitted Successfully!");
                });
        }
        else {
            data.message = "Email is bad";
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }
    else {
        pokeAdvocate.save(
            {
                willDownload: downloadRadio.value,
                wantUsername: usernameRadio.value,
                usePokeFor: document.getElementById("poke_usage").value,
                email: null
            })
            .then(function(object) {
            alert("Submitted Successfully!");
        });
    }
};

var correctEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

mSubmitButton.onclick = checkDownloadOptions;
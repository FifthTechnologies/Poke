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

var downloadRadio, usernameRadio, emailBox;

//Check if the checkboxes are checked
var checkDownloadOptions = function () {
    downloadRadio = mForm.elements["download_options"];

    if (downloadRadio.value !== "yes" && downloadRadio.value !== "no") {
        data.message = "Fields marked with '*' are required." +
            "\nPlease review your submission and try again.";
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else {
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
        checkEmail();
    }
};

var checkEmail = function () {
    emailBox = document.getElementById("email");

    if (emailBox.value !== "") {
        if (correctEmail(emailBox.value)) {
            pokeAdvocate.save(
                {
                    willDownload: downloadRadio.value,
                    wantUsername: usernameRadio.value,
                    usePokeFor: document.getElementById("poke_usage").value,
                    email: emailBox.value
                })
                .then(function (object) {
                    data.message = "Thanks for your response, it has been submitted successfully!";
                    data.timeout = 400;
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                });
        }
        else {
            data.message = "Please input a valid email address";
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
            .then(function (object) {
                data.message = "Thanks for your response, it has been submitted successfully!";
                data.timeout = 400;
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
    }
};

var correctEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

mSubmitButton.onclick = checkDownloadOptions;
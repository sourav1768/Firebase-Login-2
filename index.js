$('.details-enter-cover').hide();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        $('.details-enter-cover').hide();

        var dialog = document.querySelector('.login-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.close();

        dialog = document.querySelector('.signup-dialog');

        dialog.close();

        while (user.displayName === null) {
            var dialog = document.querySelector('.username-dialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.showModal();

            $('.usernameProgress').hide();


        }

        $('.login-cover').hide();



        /* USERNAME DISPLAY*/
        var inc = 0;
        var out = 0;
        var str = `Hello ${user.displayName}`;
        var chars = 'abcdefghijkmnopqrstuvwxyz1234567890';
        var t;
        if (firebase.auth().currentUser.displayName !== null) {

            var anim = function () {
                inc++;
                if (inc % 7 === 0 && out < str.length) {
                    document.getElementById('anim').appendChild(document.createTextNode(str[out]));
                    out++;
                } else if (out >= str.length) {
                    document.getElementById('shuffle').innerHTML = '';
                    removeInterval(t);
                }
                document.getElementById('shuffle').innerHTML =
                    chars[Math.floor(Math.random() * chars.length)];
            };
            t = setInterval(anim, 50);
            document.getElementById('anim').innerHTML = '';
        }

        console.log(user);
    } else {
        // No user is signed in.

        $('.login-cover').show();
        var dialog = document.querySelector('.login-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        $('.loginButton').show();
    }
});

$('.usernameButton').click(
    function () {
        var username = $('#username').val();

        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: username,
            photoURL: ""
        }).then(function () {
            var dialog = document.querySelector('.username-dialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.close();

            $('.login-cover').hide();
            return;

        }).catch(function (error) {
            alert(error);
        });


    }

)

$('.loginButton').click(
    function () {
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();


        if (email != "" && password != "") {
            $('.loginProgress').show();
            $('.loginButton').hide();

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                $('.loginError').show().text(error.message);

                $('.loginProgress').hide();
                $('.loginButton').show();
                // ...
            });


        }


    }
)

// LOGOUT PROCESS 

$('.signOutButton').click(
    function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            $('.loginProgress').hide();
            $('.signupProgress').hide();
        }).catch(function (error) {

            alert(error.message);
            // An error happened.
        });
    }
)

$('.signupButton').click(
    function () {
        var email = $('#signupEmail').val();
        var password = $('#signupPassword').val();
        var username = $('#signupUsername').val();

        if (email != "" && password != "") {
            $('.signupProgress').show();
            $('.signupButton').hide();

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                $('.signupError').show().text(error.message);
                // ...

                $('.signupProgress').hide();
                $('.signupButton').show();
            });


        }
    }
)

$('.backToLogin').click(
    function () {
        $('.logincover').show();

        document.querySelector('.login-dialog').showModal();
        var dialog = document.querySelector('.signup-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.close();



        dialog = document.querySelector('.login-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        $('.loginButton').show();
        $('.signupButton').show();
    }
)

$('.newAcc').click(
    function () {
        $('.logincover').show();

        document.querySelector('.login-dialog').close();
        var dialog = document.querySelector('.signup-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        $('.signupButton').show();
    }
)


$('.button-addContent').click(
    function () {
        $('.details-enter-cover').show();

        var user = firebase.auth().currentUser;

        var dialog = document.querySelector('#details-dialog');
        dialog.showModal();

        document.querySelector('.details-showUsername').textContent = user.displayName;

    }
)

$('.token-dialog-close-icon').click(
    function () {
        $('.details-enter-cover').hide();
        var dialog = document.querySelector('#details-dialog');
        dialog.close();
    }
)

$('.token-dialog-actions').click(
    function () {
        const user = firebase.auth().currentUser;
        // alert(user.displayName);

        const commentToUse = $('#details').val();
        // alert(commentToUse);
        addComment(commentToUse, user.displayName, user.photoURL);

    }
)

const func = (id) => {
    
    console.log(`ID for like button: ${id}`);

    document.getElementById(id).innerHTML = 'favorite';
    document.getElementById(id).style.transtion = '0.5s';
    document.getElementById(id).style.color = 'red';

    addLike(id);
}





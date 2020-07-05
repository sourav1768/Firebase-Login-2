/* TOKEN FORMAT

    username: "John",
    profile-url: "--",
    details: "--",
    like-icon: 0 or 1,
    like-stats: 4
*/

db.collection("users").onSnapshot(snapshot => {

    var getBookedComments = localStorage.getItem('comments');
    var bookedLikes = JSON.parse(getBookedComments);


    snapshot.docChanges().forEach(element => {

        const commentBox = `<div class="cardCustom">
        <div class="card-custom-content">
            <div class="card-custom-details">
                ${element.doc.data().comment}
            </div>
            <div class="card-custom-headline">
                ${element.doc.data().username}
            </div>
            <div class="card-custom-remarks">
                <span class="material-icons card-custom-icons" id="${element.doc.id}" onClick="func('${element.doc.id}')">favorite_border</span>
                <span class="card-custom-stats" id="1${element.doc.id}">${element.doc.data().like_stats}</span>
                <!-- MDL Spinner Component with Single Color -->
                <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active comment-spinner" id="comment-spinner-${element.doc.id}"style="display: none"></div>
            </div>
            
    </div>`;

        console.log(element.doc.data().stats);

        if (idIsNotPresent(element.doc.id)) {
            document.getElementById('FSBackground').innerHTML += commentBox;
        }

    });

    updateWithLocalStorage(JSON.parse(localStorage.getItem("booked-comments")));

    console.log(JSON.parse(localStorage.getItem('booked-comments')))
});

const addComment = (commentToUse, usernameToUse, profile_urlToUse) => {
    const element = {
        username: usernameToUse,
        comment: commentToUse,
        like_stats: 1,
        stats_array: [usernameToUse]
    }

    db.collection("users").add(element).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('.details-enter-cover').hide();
        var dialog = document.querySelector('#details-dialog');
        dialog.close();


    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        document.querySelector('.card-custom-details-1').textContent = doc.data().details;
        document.querySelector('.card-custom-headline-1').textContent = doc.data().username;


    });
});

const addLike = (id) => {

    // UPDATING LOCAL STORAGE + CHECK IF LIKE IS ALREADY THERE
    
    try {
        let getBookedLikes = localStorage.getItem('booked-comments');

        if (getBookedLikes) {
            let bookedLikes = JSON.parse(getBookedLikes);
            if (idIsPresentInLocalStorage(bookedLikes, id)) {
                alert('Looks like you have already liked it.')
                return;
            }
        }

        let bookedLikes = JSON.parse(getBookedLikes);

        bookedLikes += `${id} `;

        localStorage.setItem('booked-comments', JSON.stringify(bookedLikes));
        //LOCAL STORAGE UPDATED
    }
    catch (err) {
        console.log(`Error in updating like in LOCAL STORAGE: ${err}`);
    }

    const data = db.collection("users").doc(id)

    document.getElementById(`comment-spinner-${id}`).style.display = "inline";
    
    data.update({

        like_stats: firebase.firestore.FieldValue.increment(1)
    })
        .then(() => {
            console.log('Stats successfully added');
            data.get().then(doc => {
                document.getElementById(`1${id}`).innerHTML = doc.data().like_stats;
                document.getElementById(`comment-spinner-${id}`).style.display = "none";
            })
        })
        .catch((err) => console.log(err))

        
};

let updateWithLocalStorage = (str) => {
    let s = "";

    if (str == null) {
        return;
    }

    console.log(str);
    for (i = 4; i < str.length; i++) {
        if (str[i] === ' ') {
            console.log('ok');
            console.log(s);
            document.getElementById(s).innerHTML = 'favorite';
            document.getElementById(s).style.transtion = '0.5s';
            document.getElementById(s).style.color = 'red';


            s = ""
        }
        else {
            s += str[i];
        }
    }
}

let idIsNotPresent = (id) => {

    var data = document.getElementById(id);
    if (data == null) {
        return true;
    }
    return false;
};

let idIsPresentInLocalStorage = (str, id) => {
    let s = "";

    if (str == null) {
        return true;
    }

    console.log(str);
    for (i = 4; i < str.length; i++) {
        if (str[i] === ' ') {
            console.log('ok');
            console.log(s);
            if (s == id) {
                return true;
            }

            s = ""
        }
        else {
            s += str[i];
        }
    }
    return false;
}
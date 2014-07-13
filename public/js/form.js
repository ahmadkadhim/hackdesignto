// Capture form input and push it to Firebase

homeRef = new Firebase('https://glowing-fire-60.firebaseIO.com/');

// If no users object, initialize it with Ahmad's info
if(homeRef.on('value', function(snapshot) {
    return !!snapshot.val().users; // get true/false, not object
})) {homeRef.set({
        users: [{
            firstName: 'Ahmad',
            lastName: 'Kadhim',
            email: 'akadhim13@gmail.com',
            id: 0
        }]
    });
}

var usersRef = new Firebase('https://glowing-fire-60.firebaseIO.com/users');

var usersLength;
usersRef.on('value', function(snapshot) { // async reading of firebase db
    usersLength = Object.keys(snapshot.val()).length;
});

// TODO: any potential problem with getting usersLength if two users simultaneously register?

$.fn.addId = function(o) {
    var id = usersLength;
    o.id = id; // no return because its a reference to the obj
};

$.fn.serializeObject = function() // return array of objects as single obj
{
    var obj = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (obj[this.name] !== undefined) {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || '');
        } else {
            obj[this.name] = this.value || '';
        }
    });
    return obj;
};

var formSubmitted = function() {
    console.log('#signup');
    $('#user-signup').addClass('form-success');
};

$('#form-signup').submit(function(event) {
    var formData = $(this).serializeObject();
    $(formData).addId(formData);
    usersRef.push(formData, function(error) {
        if (error) {
            alert('Data could not be saved.' + error);
        } else {
            console.log('Data saved successfully.');
            formSubmitted();
        }
    });
    event.preventDefault();
});




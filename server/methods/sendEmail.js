// In your server code: define a method that the client can call

Meteor.methods({
    sendEmailMethod: function (data) {
        check([data.contactName, data.contactEmail, data.contactMsg], [String]);

        console.log(data);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        try {
            var emailSent = sendEmail(data);
            console.log('Email successfully sent');
            return data;
        } catch (e) {
            console.log('Something bad happened!');
        }
    }
});

// on the server
sendEmail = function(data) {
    Email.send({
        from: 'pierre.gallet@hotmail.fr',
        to: data.contactEmail,
        subject: 'Welcome to sendit.ai, ' + data.contactName,
        text: data.contactMsg
    });
};

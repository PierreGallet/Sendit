Meteor.startup(function () {
    smtp = {
      username: 'pierre.gallet@hotmail.fr',   // eg: server@gentlenode.com
      password: 'Wonderbra!',   // eg: 3eeP1gtizk5eziohfervU
      server: 'smtp.live.com',  // eg: mail.gandi.net
      port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    if (Prospects.find().count() === 0) {
      var prospects = [
        {
            'company': 'Zara',
            'fristname': 'John',
            'lastname': 'Doe',
            'email': 'john@doe.gmail.com'
        }
      ];

      for (var j = 0; j < prospects.length; j++) {
        Prospects.insert(prospects[j]);
      }
    }
});

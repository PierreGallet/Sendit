(function() {

  return {
      
    events: {
        'app.activated': 'sayHello', // lance la fonction au démarrage de l'application
        'click .post': 'postRequest',  // lance la fonction quand on clique sur le bouton de classe post
        'click .com1': 'insertAnswer1', // ajoute la proposition 1 dans l'interface de dialogue
        'click .com2': 'insertAnswer2', // ajoute la proposition 2 dans l'interface de dialogue
        'click .com3': 'insertAnswer3' // ajoute la proposition 3 dans l'interface de dialogue
    },
      
    requests: {
        post: function(json) {
            return {
            url: 'http://c9b8a567.ngrok.io/api/v1/tickets', // url du serveur node /!\ A CHANGER
            type: 'POST',
            contentType: "application/json", // objet envoyé au serveur
            data: JSON.stringify(json) // ajoute les guillemets ou il faut
            };
        },
        get: {
            url: 'http://c9b8a567.ngrok.io/api/v1', // url du serveur node
            type: 'GET',
            dataType: 'html' // objet attendu par l'application
        }
    },
      
    sayHello: function() {
        var ticket = {
            text: "opérateur"
        };
        this.switchTo('hello', ticket); // affiche la vue hello, qui aura accès aux datas de l'objet ticket
    },
      
    postRequest: function() {
        
        // json de test
        var idNumeral = this.ticket().id();
        
        var json = {
            id: idNumeral,
            coucou: "c'moi"
        };
        
        // Effectue la requête post et envoie le json, change de vue vers object
        this.ajax('post', json)
            .done(function(data) {
            var YOLOFUCKINGBITE = {resultat: data, text: ', request processed'};
            this.switchTo('object', YOLOFUCKINGBITE);
            console.log(data);
            this.yolobite = YOLOFUCKINGBITE;
            });
    },
    // Les fonctions d'insertion de la réponse choisie par l'opérateur dans le champ d'écriture.
    insertAnswer1: function() {
        console.log(this.yolobite);
        this.comment().text(this.yolobite.resultat.Comment1);
    },
    insertAnswer2: function() {
        console.log(this.yolobite);
        this.comment().text(this.yolobite.resultat.Comment2);
    },
    insertAnswer3: function() {
        console.log(this.yolobite);
        this.comment().text(this.yolobite.resultat.Comment3);
    },

  };

}());

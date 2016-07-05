/**
 * Created by badouralix on 29/06/16.
 */

var https = require('https');

/**
 * Cette fonction prend en argument le json recu de l'API Call et déjà transformé en objet javascript par JSON.parse()
 * Elle renvoie les textes contenus dedans sous forme d'objet javascript de la forme : 
 * {
 *  Comment1: "commentaire",      
 *  Comment2: "commentaire",
 *  ...
 * }
 */
var getListComments = function(json) {
    var i = 1;
    var text = "";
    var obj = {};
        json.comments.forEach(function(e){
            if (e.type == "Comment") {
                obj["Comment"+i]= e.body;
                i++;
            }
        });
    return obj;
};


/**
 * Cette fonction fait l'api Call et s'occupe de renvoyer la réponse formatée au front via resp.send().
 * Ces deux actions seront à séparer comme l'algorithme de deep learning se casera entre les deux.
 */
var getComments = function (id, resp) {
    var options = {
        host: 'djou.zendesk.com', // A remplacer par l'url de l'host voulu
        port: 443,
        path: '/api/v2/tickets/' + id + '/comments.json',
        auth: 'email@email.email/token:$TOKEN'
        // authentification, l'email et le token sont à remplacer par ceux du compte dont on veut récupérer les données
    };

    var data = https.get(options, function (res) {
        var json = "";
        res.on('data', function (chunk) {
            json+=chunk;
        });
        res.on('end', function() {
            json = JSON.parse(json);
            var text = getListComments(json);
            console.log(text);
            resp.send(text);
        });
    });
};

// Rend la fonction accessible depuis app.js

exports.newTicket = function (req, res) {
    getComments(req.body.id, res);
};

# Intégration à Zendesk : fonctionnement des deux applications

Sommaire 

* Intégration à Zendesk

* Un serveur en node

* Interraction entre les deux


## Intégration à Zendesk

Pour pouvoir exploiter les informations de l'interface de gestion de tickets de Zendesk on a la possibilité de développer nous-même notre application, qui apparaitra dans notre interface Zendesk et qui nous permettra de récupérer les informations de la discussion avec le client et qui affichera les propositions de réponses processées par nos algortihmes.


Le lien [suivant](https://developer.zendesk.com/apps/docs/agent/introduction) explique comment mettre en place son environnement de développement d'une app Zendesk ainsi que le fonctionnement de certaines fonctionnalités.

Il s'est avéré impossible de récupérer les messages clients directement via l'app, il est nécessaire de passer par l'api (limitée à 10 requêtes/minute), nous allons donc uniquement récupérer l'ID du ticket via l'app, et demander au serveur node de récupérer le texte lui-même. Le travail du serveur node est de nous retourner les trois propositions de réponses avec leur degré de 'sûreté'. L'app récupère donc ces trois réponses, les proposes à l'opérateur qui fait son choix et elle l'écrit directement dans l'interface de réponse, l'opérateur n'ayant alors qu'à envoyer.

### Compréhsension du code

Il y a deux vues en plus de la vue principale (layout.hdbs) : 

* hello.hdbs : s'affiche à l'ouverture de l'app (au rafraichissement de la page). Affiche les boutons de demande de process.

* object.hdbs : l'interace où s'affichent les propositions de réponses.

L'opérateur demande une analyse, l'app effectue une requete post vers le serveur node, donnant l'ID du ticket, elle reçoit en réponse les trois propositions de réponse, change de vue et les affiche.

> Encore en cours de rédaction

# Hello World Sample App

This very simple sample app shows you the very basics of our Apps framework and how easy it is to build an App for Zendesk. It is intended for demonstration purposes or for training purposes.

### The following information is displayed:

* 1 template with the name of the current logged in Agent.
* The app.activated event.

Please submit bug reports to [Zendesk Support](https://support.zendesk.com/hc). Pull requests are welcome.

### Screenshot(s):

![](http://f.cl.ly/items/1Z3q3a1n0N1f2o2p2k0U/Screen%20Shot%202014-03-25%20at%206.09.52%20PM.png)

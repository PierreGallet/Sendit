// TO RUN IN TERMINAL
// meteor remove blaze-html-templates
// meteor remove ecmascript
// meteor npm install --save angular angular-meteor
// meteor add angular-templates pbastowski:angular-babel
// meteor remove autopublish
// meteor add accounts-facebook accounts-twitter
// meteor add dotansimha:accounts-ui-angular
// meteor add accounts-password
// meteor remove insecure
// meteor add angularui:angular-ui-router
// meteor remove blaze-html-templates
// meteor remove ecmascript
// meteor add-platform ios
// meteor add-platform android

// import angular from 'angular';
// import angularMeteor from 'angular-meteor';

// to instantiate the app module
angular.module('sendit', [
    'angular-meteor',
    'ui.router',
    'accounts.ui',
    'angularUtils.directives.dirPagination',
    'ngMaterial',
    'smoothScroll'
]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('white')
        .accentPalette('red');
    // Extend the red theme with a few different colors
    var neonRedMap = $mdThemingProvider.extendPalette('red', {
      '500': 'fe6161'
    });
    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonRed', neonRedMap);
    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
      .primaryPalette('neonRed')
      .accentPalette('blue');
});




// to remove ng-app and do cross plateforms
function onReady() {
    angular.bootstrap(document, ['sendit'], {
        strictDi: true
    });
}
if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);

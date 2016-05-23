// to use ui router config
angular.module('sendit')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true); // for the url to look like a regular one

      $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        });
        // .state('partyDetails', {
        //     url: '/parties/:partyId',
        //     template: '<party-details></party-details>',
        //     resolve: {
        //         currentUser: ($q) => {
        //             if (Meteor.userId() == null) {
        //                 return $q.reject('AUTH_REQUIRED');
        //             }
        //             else {
        //                 return $q.resolve();
        //             }
        //         }
        //     }
        // });

      $urlRouterProvider.otherwise("/"); // redirection when url not in our routes
    })
    .run(function ($rootScope, $state) { // redirection to home if not logged
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        });
    });

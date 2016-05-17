var app = angular.module('sendit');

// with ng-annotate, not need for [$scope, $window, $otherdependency] in the dependency injection.
app.controller('home', function($scope, $window, $reactive, $location, $anchorScroll, $timeout, $mdDialog, $mdToast, $mdSidenav, $log){
        $reactive(this).attach($scope);

        $scope.facebookSendit = 'https://www.facebook.com/youjustsendit/?fref=ts';
        $scope.twitterSendit = '';
        $scope.linkedinSentit = '';
        $scope.twitterP = 'https://twitter.com/PierreGallet';
        $scope.twitterM = 'https://twitter.com/maxime_ledantec';
        $scope.githubP = 'https://github.com/PierreGallet';
        $scope.linkedinP = 'https://fr.linkedin.com/in/pierregallet';
        $scope.linkedinM = 'https://fr.linkedin.com/in/maxime-le-dantec-44009986/en';
        $scope.boolChangeClass = false;

        // to send an email to a prospect
        this.sendMail = function () {
            var data = ({
                contactName : this.newProspect.FirstName+' '+this.newProspect.LastName,
                contactEmail : this.newProspect.Email,
                contactMsg : 'Dear '+this.newProspect.FirstName+' '+this.newProspect.LastName+',\n\nWe are very happy that you are interested in our technology.\n\nDo not hesitate to contact us if you need more informations.\n\nRespectfully,\nThe Sentit.ai Team'
            });

            Meteor.call('sendEmailMethod', data,
                function(err, result) {
                    console.log(data);
                    if (err) {
                        console.log(err);
                    } else {
                        // this callback will be called asynchronously
                        // when the response is available

                        $mdToast.show(
                            $mdToast.simple()
                                .content('We have sent you an email of confirmation!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                    }
            });
        };

        // to add prospect to database
        this.subscribe('prospects');
        this.newProspect = {};
        this.addProspect = function(){
            console.log('adding prospect');
            Prospects.insert(this.newProspect);
            this.sendMail();
            this.newProspect = {};
        };

        // to notify we got the contact
        this.showAlert = function() {
            console.log('alert');
            console.log(this.newProspect);
            alert = $mdDialog.alert({
                title: 'Welcome',
                textContent: 'Thank you for you interest '+this.newProspect.FirstName + ' ' + this.newProspect.LastName+', we will contact you soon!',
                ok: 'Close'
              })
              .clickOutsideToClose(true);
            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
              });
         };

        this.showSimpleToast = function() {
            console.log('toast');
            $mdToast.show(
              $mdToast.simple()
                .textContent('Thank you for you interest '+this.newProspect.FirstName + ' ' + this.newProspect.LastName+', we will contact you soon!')
                .position('top right')
                .hideDelay(3000)
            );
        };

        // for sidenav in mobile screen
        $scope.toggleRight = function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right')
              .toggle()
              .then(function () {
                $log.debug("toggle right is done");
              });
        };
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        $scope.close = function () {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav('right').close()
            .then(function () {
              $log.debug("close right is done");
            });
        };
});


// to show header background when scrolling
app.directive("scroll", function () {
        return function($scope, $element, $attrs) {
            angular.element("md-content").bind("scroll", function() { // $window is not scrollable so we use md-content instead!
                 if (angular.element("md-content")[0].scrollTop > 0) {
                     $scope.boolChangeClass = true;
                 } else {
                     $scope.boolChangeClass = false;
                 }
                $scope.$apply();
            });
        };
});

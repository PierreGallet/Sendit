// making directive or component let us not call ng-controller everywhere (with templateUrl, it is already linked)

angular.module('sendit').directive('partiesList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/parties-list/parties-list.html',
        controllerAs: 'partiesList',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.newParty = {};
            this.perPage = 3;
            this.page = 1;
            this.sort = {
              name: 1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                parties: () => {
                    return Parties.find({}, { sort : this.getReactively('sort') }); // to make sure it is sorted on the client side
                },
                partiesCount() {
                    return Counts.get('numberOfParties');
                }
            });

            this.updateSort = () => {
                this.sort = {
                    name: parseInt(this.orderProperty)
                };
            };

            this.subscribe('parties', () => {
              return [
                {
                  limit: parseInt(this.perPage),
                  skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                  sort: this.getReactively('sort') // with getTeactively, every change on this.page and this.sort will affect immediatly the subscription.
                },
                this.getReactively('searchText')
              ]
            });

            this.addParty = () => {
                this.newParty.owner = Meteor.user()._id;
                Parties.insert(this.newParty);
                this.newParty = {};
            };

            this.removeParty = (party) => {
                Parties.remove({_id: party._id});
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };
        }
    }
});

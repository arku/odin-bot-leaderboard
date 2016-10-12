(function() {
  'use strict';

  angular.module('OdinLeaderboard', [])
    .service('LeaderboardService', LeaderboardService)
    .controller('LeaderboardController', LeaderboardController);

  LeaderboardController.$inject = ['LeaderboardService'];
  function LeaderboardController(leaderboardService) {
    var ctrl = this;
    ctrl.isLoading = true;
    leaderboardService.getLeaderboard()
      .then(function(response) {
        ctrl.users = response.data;
        ctrl.isLoading = false;
      })
      .catch(function() {
        ctrl.isLoading = false;
        ctrl.errorMessage = 'Oops... Looks like a network issue. Connect to the internet and try again';
      })
  }
  
  LeaderboardService.$inject = ['$http'];
  function LeaderboardService($http) {
    var service = this;
    
    service.getLeaderboard = function() {
      return $http({
        url: 'https://odin-points-bot.herokuapp.com/users.json'
      })
    }
  }
}());
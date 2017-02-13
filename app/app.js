var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);

//myNinjaApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
myNinjaApp.config(['$routeProvider',function($routeProvider){

    //$locationProvider.html5Mode(true);


    $routeProvider
        .when('/home',{
            templateUrl: 'views/home.html',
            controller: 'ninjaController'
        })
        .when('/contact',{
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })
        .when('/contact-success',{
            templateUrl: 'views/contact-success.html',
            controller: 'contactController'
        })
        .when('/directory',{
            templateUrl: 'views/directory.html',
            controller:'ninjaController'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);

myNinjaApp.directive('randomNinja',[function(){
//we take data from the controller scope in the home view and map into this scope
    return{
        restrict:'E',
        scope: {
              ninjas: '=',
              title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace:true,
        controller:function ($scope) {
            $scope.random = Math.floor(Math.random()*4);
        }
    };

}]);


myNinjaApp.controller('ninjaController',['$scope','$http',function($scope,$http) {

//REMOVING A NINJA FROM THE LIST
    $scope.ninjaRemove = function(ninja){
    var indexNinja     = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(indexNinja,1);
};

//ADDING A NINJA TO THE LIST
    $scope.addNinja = function(){
        $scope.ninjas.push({
            name:$scope.newninja.name,
            avg:parseInt($scope.newninja.avg),
            earnings:$scope.newninja.earnings,
            available:true,
            car:$scope.newninja.car
        });
//CLEARING THE FORM AFTER HITTING SUBMIT BUTTON
    $scope.newninja.name="";
    $scope.newninja.avg="";
    $scope.newninja.earnings="";
    $scope.newninja.car="";
    };

    $scope.removeAll = function(){
        $scope.ninjas = [];
    };

//GETTING DATA FROM JSON FILE
$http.get('data/ninjas.json').then(function(data){
    $scope.ninjas=data.data;
});

}]);

myNinjaApp.controller('contactController',['$scope','$location',function($scope,$location){
    $scope.sendMessage = function(){
        $location.path('/contact-success');
    };
}]);

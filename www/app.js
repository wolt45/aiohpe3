var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'roottpl/partial-home.html'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'roottpl/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        .state('today', {
            url: '/today',
            templateUrl: 'atoday/today.html'
            }
        )

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'roottpl/partial-about.html' },
                'columnOne@about': { template: '<h3>The People behind The Project</h3>' },
                'columnTwo@about': { 
                    templateUrl: 'roottpl/table-data.html',
                    controller: 'scotchController'
                }
            }
        });
        
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.rbgTeam = [
        {
            name: "Ramon B. Gustilo, MD",
            foto: "r",
            describe: ''
        },
        {
            name: 'Walter Frederick S. Seballos',
            foto: '',
            describe: ''
        },
        {
            name: 'Ene Bauden',
            foto: '',
            describe: 'Gustilo Clinic and Ambulatory Surgery Center'
        },
        {
            name: 'Ara',
            foto: '',
            describe: 'Gustilo Clinic and Ambulatory Surgery Center'
        }
    ];
    
});
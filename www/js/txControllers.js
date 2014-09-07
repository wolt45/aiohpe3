//var IOHPControllers = angular.module('txControllers', []);
/*
IOHPEApp.controller('PXListCtrl', function ($scope){

  // request for transactions from the server via REST

  // let say we have this sample transactions
  $scope.px_data = [];

  // $scope.ShowData = function(){
    // alert("hey");
    var promise = $ipadrbg.context.px_data.filter(function (px) { return px.ClinixRID > 0}).toArray();
    
    promise.then(renderResultCallback);

    function renderResultCallback(pxresult) {
      $scope.px_data = pxresult;
      $scope.$digest();
    }
  // };
});*/


IOHPEApp.controller('PXListCtrl', function ($scope, $http){
  //$http.get('http://192.168.0.100/atoday/api/apiSQLi.px_data.html').success(function(data) {
  $http.get('http://192.168.0.100/RBGsrvr_todayset/srvr_clinix.php').success(function(data) {  
    $scope.px_data = data;
  });
});



IOHPEApp.controller('PXDetailCtrl', function ($scope, $routeParams, $http){
  $scope.ClinixRID = $routeParams.p_clinixrid;

	//  alert ($scope.ClinixRID);

  $scope.CHIEFCformData = {};

  $http.get('http://192.168.0.100/RBGsrvr_todayset/srvr_clinix.php').success(function(data) {
    $scope.px_data = data.filter(function(entry){
    	//return entry.pxname === $scope.pxname;
    	return  Number($scope.ClinixRID) === Number(entry.ClinixRID);  
    })[0];
  });


  $scope.submitTheForm = function() {
    //var x = JSON.stringify($scope.CHIEFCformData);
    var x = JSON.stringify($scope.PxRID);
    alert("Submitting form! " + x);
  };



});

// CHIEF COMPLAIN CONTROLLERS








// IOHPEApp.service('dataService', function($http) {
// delete $http.defaults.headers.common['X-Requested-With'];
// this.getData = function(callbackFunc) {
//     $http({
//         method: 'GET',
//         //url: 'http://localhost/atoday/api/apiSQLi.px_data.html',
//         url: 'http://192.168.0.100/atodayset/srvr_px_data.php',
//         params: 'limit=10, sort_by=pxname:desc',
//         headers: 'Content-Type: application/json'
//      }).success(function(data){
//         // With the data succesfully returned, call our callback
        
//         callbackFunc(data);
//     }).error(function(){
//         alert("Error connecting to server!");
//     });
//  }
// });

// IOHPEApp.controller('PXListCtrl', function($scope, dataService) {
//     //$scope.data = null;
//     dataService.getData(function(dataResponse) {
//         //alert("success!!!");
//         $scope.px_APIlist = dataResponse;
//     });
// });


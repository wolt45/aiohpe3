IOHPEApp.controller('PXListCtrl', function ($scope){
  // request for transactions from the server via REST

  // let say we have this sample transactions
  $scope.px_data = [];

  $scope.ShowData = function(){
    var promise = $ipadrbg.context.px_data.filter(function (px) { return px.ClinixRID > this.id},{id:0}).toLiveArray();
    
    promise.then(function(pxresult) {
      // for(key in pxresult){
      // row = {
      //     ClinixRID   : pxresult[key].ClinixRID,
      //     PxRID       : pxresult[key].PxRID,
      //     pxname      : pxresult[key].pxname,
      //     Address     : pxresult[key].Address,
      //     pxstatus    : pxresult[key].pxstatus,
      //     pxregdate   : pxresult[key].pxregdate,
      //     Foto        : pxresult[key].Foto
      //   };
      //   $scope.px_data.push(row); 
      // }
      $scope.px_data = pxresult;
      $scope.$apply();
    });
  };

  if($ipadrbg.context._isOK){
    $scope.ShowData();
  }
});


// IOHPEApp.controller('PXListCtrl', function ($scope, $http){
//   //$http.get('http://192.168.0.100/atoday/api/apiSQLi.px_data.html').success(function(data) {
//   $http.get('http://localhost/RBGsrvr_todayset/srvr_clinix.php').success(function(data) {  
//     $scope.px_data = data;
//   });
// });



IOHPEApp.controller('PXDetailCtrl', function ($scope, $routeParams, $http){
  $scope.px_data = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  var promise = $ipadrbg.context.px_data.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.px_data = pxresult[0];
      $scope.$apply();
    });
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


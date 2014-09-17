IOHPEApp.controller('PXListCtrl', function ($scope){
  // request for transactions from the server via REST

  // let say we have this sample transactions
  $scope.clinix = [];

  $scope.ShowData = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { return px.ClinixRID > this.id},{id:0}).toLiveArray();
    
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
      $scope.clinix = pxresult;
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
  $scope.clinix = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  var promise = $ipadrbg.context.clinix.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.clinix = pxresult[0];
      $scope.$apply();
    });
});

// IOHPEApp.controller('myBone', function ($scope) {
//   $scope.myBone = [
//   { 0 : "(undefined)"},
//   { 1 : "HIP"},
//   { 2 : "KNEE"},
//   { 3 : "ANKLE and FOOT"},
//   { 4 : "SHOULDER-ARM"},
//   { 5 : "ELBOW"},
//   { 6 : "WRIST and HAND"},
//   { 7 : "THIGH"}
// ]}
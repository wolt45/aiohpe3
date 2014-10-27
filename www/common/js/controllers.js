IOHPEApp.controller('PXListCtrl', function ($scope){
  // request for transactions from the server via REST

  // let say we have this sample transactions
  $scope.clinix = [];

  $scope.ShowData = function(){

    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID > this.id}
      , {id:0}).order('TranStatus', 'AppDateSet', 'ClinixRID').toLiveArray();
    
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


  //Populate TRAN STATUS
  // $scope.lkup_TranStatus = [];
  // var promise = $ipadrbg.context.lkup_TranStatus.filter(function (px) { 
  //   return px.TrnSttsRID >= this.id }  
  //   , {id : 0}).order('TrnStts').toLiveArray();
  // promise.then(function(pxresult) {
  //   $scope.$apply( function () {
  //     $scope.lkup_TranStatus = pxresult;
  //   });
  // });
  // populate Tariff Object - end
  //TRAN STATUS - end

});

// tpl_pe/today_list_pe.html, app.js
// Controller established for PE module purposely for the use of TranStatus = 10, for the IOHPE status but wait and see if needed
IOHPEApp.controller('PXListPECtrl', function ($scope){
  $scope.clinix = [];
  $scope.ShowData = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      // return px.ClinixRID > this.id && px.TranStatus >= this.trnSts }  
      // , {id : 0, trnSts : 0 }).order('TranStatus' , 'AppDateSet', 'ClinixRID').toLiveArray();

      return px.ClinixRID > this.id }  
        , {id : 0}).order('TranStatus' , 'AppDateSet', 'ClinixRID').toLiveArray();

    // Tasks.filter(" it.Completed == p1 && it.Priority > p2 ",{p1: true, p2: 100}).toArray(…) from http://jaydata.org/blog/simplified-filter-syntax-for-simple-tasks
    promise.then(function(pxresult) {
      $scope.clinix = pxresult;
      $scope.$apply();
    });
  };

  if($ipadrbg.context._isOK){
    $scope.ShowData();
  }
});




IOHPEApp.controller('PXDetailCtrl', function ($scope, $routeParams, $http){
  $scope.clinix = [];
  
  $scope.ClinixRID = $routeParams.p_clinixrid;

  var promise = $ipadrbg.context.clinix.filter(function (px) { 
    return px.ClinixRID == this.id},
    { id : $scope.ClinixRID}).toLiveArray();
  promise.then(function(pxresult) {
    $scope.clinix = pxresult[0];
    $scope.$apply();
  });
});
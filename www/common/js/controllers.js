IOHPEApp.controller('PXListCtrl', function ($scope){
  // request for transactions from the server via REST

  // let say we have this sample transactions
  $scope.clinix = [];

  $scope.ShowData = function(){

    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      
      return px.ClinixRID > this.id }
      , { id : 0 }).order('TranStatus', 'AppDateSet', 'ClinixRID').toLiveArray();
    
    promise.then(function(pxresult) {

      // 141105 Just Update the TranStatusDisp, reconstruct this maybe using Filter!!!
      $scope.clinix = [];
      for(key in pxresult) {

        for (var i = 0; i < $scope.lkup_TranStatus.length; i++) {
          if ($scope.lkup_TranStatus[i]['TrnSttsRID'] == pxresult[key].TranStatus ) {
            pxresult[key].TranStatusDisp = $scope.lkup_TranStatus[i]['TrnStts'];
            break;
          } 
        }

        row = {
            ClinixRID       : pxresult[key].ClinixRID,
            PxRID           : pxresult[key].PxRID,
            AppDateSet      : pxresult[key].AppDateSet,
            TranStatus      : pxresult[key].TranStatus,

            TranStatusDisp  : pxresult[key].TranStatusDisp,

            pxname          : pxresult[key].pxname,
            pxAddress       : pxresult[key].pxAddress,
            pxstatus        : pxresult[key].pxstatus,
            pxregdate       : pxresult[key].pxregdate,
            pxFoto          : pxresult[key].pxFoto
          };

        $scope.clinix.push(row);
      }

      // this could have used the jaydata object directly, but TranStatusDisp has to be configured
      // $scope.clinix = pxresult;
      $scope.$apply();
    });
  };

  if($ipadrbg.context._isOK){
    $scope.ShowData();
  }


  $scope.lkup_TranStatus = [
      {TrnSttsRID :  0, TrnStts : "OPEN"}
    , {TrnSttsRID :  2, TrnStts : "UNPAID"}
    , {TrnSttsRID : 10, TrnStts : "FOR INTERVIEW"}
    , {TrnSttsRID : 20, TrnStts : "FOR PE"}
    , {TrnSttsRID : 30, TrnStts : "CLOSED PE"}
    , {TrnSttsRID : 91, TrnStts : "NO SHOW"}
    , {TrnSttsRID : 96, TrnStts : "INTERVIEW CANCELLED"}
    , {TrnSttsRID : 98, TrnStts : "CANCELLED APPOINMENT"}
    , {TrnSttsRID : 99, TrnStts : "COMPLETED"}
  ];

  // app.filter('tranStatusFilter', function() {
  //   return function(StatusID) {
  //     var results = "";
      
  //     for (var i = 0; i < TranStatus.length; i++) {
  //       if (TranStatus[i]['id'] == StatusID) {
  //         results = TranStatus[i]['Status'];
  //         break;
  //       } 
  //     }
  //     return results;
  //   }
  // })


  //Populate TRAN STATUS
  // $scope.lkup_TranStatus = [];
  // var promise = $ipadrbg.context.lkup_TranStatus.filter(function (TranStatus) { 
  //   return TranStatus.TrnSttsRID >= this.id }  
  //   , { id : 0 }).order('TrnSttsRID').toLiveArray();
  // promise.then(function( result ) {
  //   $scope.$apply( function () {
  //     $scope.lkup_TranStatus = result;
  //   });
  // });
  //Populate TRAN STATUS - end

});

// tpl_pe/today_list_pe.html, app.js
// Controller established for PE module purposely for the use of TranStatus = 10, for the IOHPE status but wait and see if needed
IOHPEApp.controller('PXListPECtrl', function ($scope){
  $scope.clinix = [];
  $scope.ShowData = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      // NOTE: Extract list that have completed Initial Interview status
      return px.ClinixRID > this.id && px.TranStatus >= this.trnSts }
      , {id : 0, trnSts : 20 }).order('TranStatus' , 'AppDateSet', 'ClinixRID').toLiveArray();

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


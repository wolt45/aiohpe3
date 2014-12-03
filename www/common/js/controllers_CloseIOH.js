IOHPEApp.controller('CloseIOHCtrl', function ($scope, $routeParams, $http){
  $scope.clinix = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadIOHClinix = function () {
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},
      { id : $scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.clinix = pxresult[0];
      $scope.$apply();
    });
  }

  /////////////////////////////////////////////////////////////
  // Close IOHPE send all IOHPE BACK to server
  // if slows Doctor interaction, move to PUSH button Main Menu
  /////////////////////////////////////////////////////////////

  $scope.CloseIOH = function (clinix) {
    if (confirm('Are you sure to Close this Interview: Appt: #' + $scope.ClinixRID + ' ?')) {
      clinix.TranStatus = 20;
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 800000);
        db.transaction(function (tx) {
            tx.executeSql("UPDATE clinix SET TranStatus = 20, TranStatusDisp = 'FOR PE' WHERE ClinixRID = " + $scope.ClinixRID );
      });

      $scope.clinix_JSON = '[{"ClinixRID" : ' + $scope.ClinixRID + ', "TranStatus" : ' + clinix.TranStatus + '}]';
      $scope.notifyServer();

      // //Push Chief Complaint, this Clinix PE only
      // $scope.clinix_chiefcomp = [];
      // var promise = $ipadrbg.context.clinix_chiefcomp.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_chiefcomp = pxresult;
      //   });
      //   $scope.clinix_AmbuStatus_JSON = JSON.stringify($scope.clinix_chiefcomp);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://192.168.254.99/RBGsrvr_todayset/srvr_back_AmbuStatus.php?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_AmbuStatus_JSON
      //     , cache : false
      //   });
      // });


      // PUSH BACK - FLOOR
      
      $scope.LoadIOHClinix();

      alert("Appoinment # " + $scope.ClinixRID + " Initital Interview Successfully Closed!");
    }
  }

  // cancel PE button 
  $scope.CancelIOH = function (clinix) {
    if (confirm('Are you sure to CANCEL this Interview: ' + $scope.ClinixRID + ' ?')) {
      clinix.TranStatus = 96;
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 800000);
        db.transaction(function (tx) {
            tx.executeSql("UPDATE clinix SET TranStatus = 96 WHERE ClinixRID = " + $scope.ClinixRID );
      });

      $scope.clinix_JSON = '[{"ClinixRID" : ' + $scope.ClinixRID + ', "TranStatus" : ' + clinix.TranStatus + '}]';
      $scope.notifyServer();
      
      $scope.LoadIOHClinix();

      db.close(); 
      alert("Appoinment # " + $scope.ClinixRID + " Initital Interview was Cancelled!");
    }
  }

  //from 
  //file://localhost/Users/cerquit/Desktop/WFS%20Desktop/SPECIALS/jquery%20-%20HTML5%20WebSQL%20%20how%20to%20know%20when%20a%20db%20transaction%20finishes%20%20-%20Stack%20Overflow.html
  // function databaseSync() {

  //   $.when( tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=one"),
  //           tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=two"), 
  //           tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=three"))
  //       .then(function(){
  //           console.log( 'All processing complete' );
  //       });
  // }

  //update server TranStatus after, PE close pushback  
  $scope.notifyServer = function () {
    // Set TranStatus
    $http({
      method: 'POST'
      , url : 'http://192.168.254.99/RBGsrvr_todayset/srvr_back_clinixTrnStts.php?clinixJsonIzed=' + $scope.clinix_JSON
      , contentType : 'application/json'
      , data : $scope.clinix_JSON
      , cache : false
    });

    alert("Appoinment # " + $scope.ClinixRID + " SERVER was Notified!");
  }

});

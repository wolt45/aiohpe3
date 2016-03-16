IOHPEApp.controller('PT3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PT3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadPT3 = function(){
    var promise = $ipadrbg.context.jdata_PT3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_PT3 = pxresult;
      });

          $scope.PT3 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,CutaneousIntact : pxresult[0]['CutaneousIntact']
          ,CutaneousImpaired : pxresult[0]['CutaneousImpaired']
          ,CutaneousComments : pxresult[0]['CutaneousComments']
          ,ProprioceptionIntact : pxresult[0]['ProprioceptionIntact']
          ,ProprioceptionImpaired : pxresult[0]['ProprioceptionImpaired']
          ,ProprioceptionComments : pxresult[0]['ProprioceptionComments']
        
       }

    });
  }; 

   $scope.LoadPT3();

  $scope.addNew_PT3 = function (frmPT3) {
    
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_PT3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,CutaneousIntact : frmPT3.CutaneousIntact
      ,CutaneousImpaired : frmPT3.CutaneousImpaired
      ,CutaneousComments : frmPT3.CutaneousComments
      ,ProprioceptionIntact : frmPT3.ProprioceptionIntact
      ,ProprioceptionImpaired : frmPT3.ProprioceptionImpaired
      ,ProprioceptionComments : frmPT3.ProprioceptionComments

    }
    $ipadrbg.context.jdata_PT3.add(newrecord);
    $ipadrbg.context.jdata_PT3.saveChanges();

    alert("PT Initial Interview Data Saved!");

    $scope.LoadPT3();      
  }

  $scope.removePT3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PT3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.PT3 = [];
    }
  }

});
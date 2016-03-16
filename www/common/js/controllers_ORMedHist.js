IOHPEApp.controller('ORMedHist_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORMedHist = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORMedHist = function(){
    var promise = $ipadrbg.context.jdata_ORMedHist.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORMedHist = pxresult;
      });

    $scope.ORmedhist = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,IVStarted : pxresult[0]['IVStarted']
    ,SolutionUsed : pxresult[0]['SolutionUsed']
  
  }

    });
  }; 

   $scope.LoadORMedHist();

  $scope.addNew_ORmedHist = function (frmORMedHis) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORMedHist' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,IVStarted : frmORMedHis.IVStarted
      ,SolutionUsed : frmORMedHis.SolutionUsed

    }
    $ipadrbg.context.jdata_ORMedHist.add(newrecord);
    $ipadrbg.context.jdata_ORMedHist.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORMedHist();    
  }

  $scope.removeORmedHist = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORMedHist' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORmedhist = [];
    }
  }

});
IOHPEApp.controller('PTHistory_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PTHist = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;


$scope.LoadPTHistory = function(){
    var promise = $ipadrbg.context.jdata_PTHist.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
        $scope.jdata_PTHist = pxresult;

        $scope.PTHist = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,PTHistory : pxresult[0]['PTHistory']
        }
      });
    });
  };

  $scope.LoadPTHistory();

  

  $scope.addNew_PTHistory = function (frmPTHistory) {
    
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_PTHist' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PTHistory : frmPTHistory.PTHistory

    }
    $ipadrbg.context.jdata_PTHist.add(newrecord);
    $ipadrbg.context.jdata_PTHist.saveChanges();

    alert("PT Data Saved!");

    $scope.LoadPTHistory();      
  }

  $scope.removePT = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PTHist' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.PTHist = [];
    }
  }

});
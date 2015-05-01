IOHPEApp.controller('StructuredLABSCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredLABS = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.labCategories = [
      { id : 0,  dropname : ""}
    , { id : 1,  dropname : "WBC"}
    , { id : 2,  dropname : "HgB"}
    , { id : 3,  dropname : "HEMATOCRIT"}
  ]

  $scope.LoadDiagsSchedSurg = function(){
    var promise = $ipadrbg.context.clinix_StructuredLABS.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredLABS = pxresult;
      });
    });
  };

  $scope.LoadDiagsSchedSurg();

  $scope.addNew = function ( formArrObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM 'clinix_StructuredLABS' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,labDate      : formArrObj.labDate
      ,labSource    : formArrObj.labSource
      ,WBC    : formArrObj.WBC
      ,HgB    : formArrObj.HgB
      ,Hematocrit    : formArrObj.Hematocrit

    }
    $ipadrbg.context.clinix_StructuredLABS.add(newrecord);
    $ipadrbg.context.clinix_StructuredLABS.saveChanges();

    formArrObj.labDate = null;
    formArrObj.labSource = "";
    formArrObj.WBC = "";
    formArrObj.HgB = "";
    formArrObj.Hematocrit = "";

    $scope.LoadDiagsSchedSurg();
  }

  $scope.removeItem = function (formArrObj) {
    formArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredLABS;
         diagol.splice(diagol.indexOf(formArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
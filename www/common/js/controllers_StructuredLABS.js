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
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,labCategory  : formArrObj.labCategory
      ,labDate      : formArrObj.labDate
      ,labSource    : formArrObj.labSource
      ,labReport    : formArrObj.labReport
    }
    $ipadrbg.context.clinix_StructuredLABS.add(newrecord);
    $ipadrbg.context.clinix_StructuredLABS.saveChanges();

    formArrObj.labDate = null;
    formArrObj.labSource = "";
    formArrObj.labReport = "";

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
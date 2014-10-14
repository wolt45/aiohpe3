IOHPEApp.controller('DiagsDispositionCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagsDisposition = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsDisposition = function(){
    var promise = $ipadrbg.context.clinix_DiagsDisposition.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsDisposition = pxresult;
      });
    });
  };

  $scope.LoadDiagsDisposition(); 

  $scope.addNew = function (daignosisObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Disposition : daignosisObj.Disposition
      ,DispoValue  : daignosisObj.DispoValue
      ,FollowUpDate: daignosisObj.FollowUpDate
    }
    $ipadrbg.context.clinix_DiagsDisposition.add(newrecord);
    $ipadrbg.context.clinix_DiagsDisposition.saveChanges();

    daignosisObj.Disposition = "Follow Up Date";
    daignosisObj.DispoValue = "";
    daignosisObj.FollowUpDate = null;

    $scope.LoadDiagsDisposition();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsDisposition;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
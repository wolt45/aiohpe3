IOHPEApp.controller('DiagsNotesCtrl', function ($scope, $routeParams, $http){

  $scope.clinix_DiagsNotes = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsNotes = function(){
    var promise = $ipadrbg.context.clinix_DiagsNotes.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsNotes = pxresult;
      });
    });
  };

  $scope.LoadDiagsNotes();

  $scope.addNew = function (daignosisObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Notes     : daignosisObj.DiagTnyMce
    }
    $ipadrbg.context.clinix_DiagsNotes.add(newrecord);
    $ipadrbg.context.clinix_DiagsNotes.saveChanges();

    daignosisObj.DiagTnyMce = "";
    $scope.LoadDiagsNotes();
  }

  $scope.removeItem = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsNotes;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
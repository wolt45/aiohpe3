IOHPEApp.controller('StructuredDispositionCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredDisposition = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.dispositions = [
      { id : 0,  dropname : "HOME"}
    , { id : 1,  dropname : "NURSING HOME"}
    , { id : 2,  dropname : "AMBULANCE"}
    , { id : 3,  dropname : "CAR"}
  ]

  $scope.ambulatories = [
      { id : 0,  dropname : "CRUTCHES"}
    , { id : 1,  dropname : "WALKER"}
    , { id : 2,  dropname : "CANE"}
    , { id : 3,  dropname : "WHEELCHAIR"}
  ]

  $scope.LoadStrucDispo = function(){
    var promise = $ipadrbg.context.clinix_StructuredDisposition.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDisposition = pxresult;

        
      });
    });
  };

  $scope.LoadStrucDispo();

  $scope.addNew = function (formArrObj) {
    if (formArrObj.Disposition) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Disposition        : 'Disposition'
        ,DispoValue  : formArrObj.Disposition
      }
      $ipadrbg.context.clinix_StructuredDisposition.add(newrecord);
    }
    if (formArrObj.Ambulatory) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Disposition        : 'Ambulatory Aid'
        ,DispoValue  : formArrObj.Ambulatory
      }
      $ipadrbg.context.clinix_StructuredDisposition.add(newrecord);
    }

    $ipadrbg.context.clinix_StructuredDisposition.saveChanges();

    formArrObj.Disposition = "";
    formArrObj.Ambulatory = "";

    $scope.LoadStrucDispo();
  }

  $scope.removeItem = function (formArrObj) {
    formArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredDisposition;
         diagol.splice(diagol.indexOf(formArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
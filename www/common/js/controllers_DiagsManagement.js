IOHPEApp.controller('DiagsManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagsManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsMgmt = function(){
    var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsManagement = pxresult;
      });
    });
  };

  $scope.LoadDiagsMgmt();

  $scope.addNew = function (daignosisObj) {

    if (daignosisObj.ManagementDetail1 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management1
        ,ManagementDetail  : daignosisObj.ManagementDetail1
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }
    if (daignosisObj.ManagementDetail2 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management2
        ,ManagementDetail  : daignosisObj.ManagementDetail2
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }
    if (daignosisObj.ManagementDetail3 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management3
        ,ManagementDetail  : daignosisObj.ManagementDetail3
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }
    if (daignosisObj.ManagementDetail4 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management4
        ,ManagementDetail  : daignosisObj.ManagementDetail4
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }

    $ipadrbg.context.clinix_DiagsManagement.saveChanges();

    daignosisObj.Management1z = "";
    daignosisObj.ManagementDetail1 = "";
    daignosisObj.Management2z = "";
    daignosisObj.ManagementDetail2 = "";
    daignosisObj.Management3z = "";
    daignosisObj.ManagementDetail3 = "";
    daignosisObj.Management4z = "";
    daignosisObj.ManagementDetail4 = "";

    $scope.LoadDiagsMgmt();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsManagement;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
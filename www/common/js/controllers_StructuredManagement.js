IOHPEApp.controller('StructuredManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadStructuredMgmt = function(){
    var promise = $ipadrbg.context.clinix_StructuredManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredManagement = pxresult;
      });
    });
  };

  $scope.LoadStructuredMgmt(); 

  $scope.addNew = function (formArrObj) {

    if (formArrObj.ManagementDetail1 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management1
        ,ManagementDetail  : formArrObj.ManagementDetail1
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.ManagementDetail2 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management2
        ,ManagementDetail  : formArrObj.ManagementDetail2
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.ManagementDetail3 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management3
        ,ManagementDetail  : formArrObj.ManagementDetail3
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.ManagementDetail4 ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management4
        ,ManagementDetail  : formArrObj.ManagementDetail4
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.Shower ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Shower"
        ,ManagementDetail  : formArrObj.Shower
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.Notes ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Instructions/Notes"
        ,ManagementDetail  : formArrObj.Notes
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }
    if (formArrObj.Follow ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Follow - up"
        ,ManagementDetail  : formArrObj.Follow
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    $ipadrbg.context.clinix_StructuredManagement.saveChanges();

    formArrObj.Management1z = "";
    formArrObj.ManagementDetail1 = "";
    formArrObj.Management2z = "";
    formArrObj.ManagementDetail2 = "";
    formArrObj.Management3z = "";
    formArrObj.ManagementDetail3 = "";
    formArrObj.Management4z = "";
    formArrObj.ManagementDetail4 = "";

    $scope.LoadStructuredMgmt();
  }

  $scope.removeItem = function (formArrObj) {
    formArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredManagement;
         diagol.splice(diagol.indexOf(formArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
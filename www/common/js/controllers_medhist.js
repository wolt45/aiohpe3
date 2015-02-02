IOHPEApp.controller('MedHistCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_MedHist = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadMedHist = function(){
    var promise = $ipadrbg.context.clinix_MedHist.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_MedHist = pxresult;
      });
    });
  }

  $scope.LoadMedHist();

  $scope.addMedHist = function (grpMedHist) {
    if (grpMedHist.HeartMedYN) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Heart Medication"
        ,MedHistYN       : grpMedHist.HeartMedYN
        ,MedHistDetails  : grpMedHist.HeartMedDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.HeartSurgeryYN) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Heart Surgery"
        ,MedHistYN       : grpMedHist.HeartSurgeryYN
        ,MedHistDetails  : grpMedHist.HeartSurgeryDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Hypertension) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Hypertension"
        ,MedHistYN       : grpMedHist.Hypertension
        ,MedHistDetails  : grpMedHist.HypertensionDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Diabetes) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Diabetes"
        ,MedHistYN       : grpMedHist.Diabetes
        ,MedHistDetails  : grpMedHist.DiabetesDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Kidney) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Kidney"
        ,MedHistYN       : grpMedHist.Kidney
        ,MedHistDetails  : grpMedHist.KidneyDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.GI) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "GI (ulcer, etc.)"
        ,MedHistYN       : grpMedHist.GI
        ,MedHistDetails  : grpMedHist.GIDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Allergies) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Allergies"
        ,MedHistYN       : grpMedHist.Allergies
        ,MedHistDetails  : grpMedHist.AllergiesDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Infection) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "History of Infection"
        ,MedHistYN       : grpMedHist.Infection
        ,MedHistDetails  : grpMedHist.InfectionDetails
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Lungs) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Lungs"
        ,MedHistYN       : grpMedHist.Lungs
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Trauma) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Trauma"
        ,MedHistYN       : grpMedHist.Trauma
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.CNS) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "CNS"
        ,MedHistYN       : grpMedHist.CNS
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    if (grpMedHist.Others) {
      newrecord = {
        ClinixRID        : $scope.clinix.ClinixRID
        ,PxRID           : $scope.clinix.PxRID

        ,MedHist         : "Others"
        ,MedHistDetails  : grpMedHist.Others
      }
      $ipadrbg.context.clinix_MedHist.add(newrecord);
    }

    $ipadrbg.context.clinix_MedHist.saveChanges();

    grpMedHist.MedHistDetails = "";

    //alert("HEY!");

    $scope.LoadMedHist();
  }

  $scope.removeMedHist = function (grpMedHist) {
    grpMedHist.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_MedHist;
         comps.splice(comps.indexOf(grpMedHist), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});
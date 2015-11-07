IOHPEApp.controller('EtiologyCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_etiology = [];
  $scope.clinix_HXetiology = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.PxRID = 0;

  $scope.LoadEtiology = function(){
    var promise = $ipadrbg.context.clinix_etiology.filter(function (px) 
      { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_etiology = pxresult;

        // WFS HACKS: pick-up Chart Number Here
        $scope.PxRID = pxresult[0]['PxRID'];
        // alert($scope.PxRID);
        $scope.LoadHXEtiology();
      });
    })
  }
  $scope.LoadEtiology();

  $scope.LoadHXEtiology = function(){
    var promise = $ipadrbg.context.clinix_etiology.filter(function (px) 
      { return px.PxRID == this.id },{ id: $scope.PxRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HXetiology = pxresult;
      });
    })
  }


  $scope.addEtiology = function (grpEtiology) {
    if ( grpEtiology.Injury
          && grpEtiology.DateEtio
          && grpEtiology.WorkRelated
          && grpEtiology.OnsetAccuteGradual
          && grpEtiology.Duration
          && grpEtiology.DurationUnit
          && grpEtiology.Severity
          && grpEtiology.AmbulatoryAid
      ) { 
      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,Injury           : grpEtiology.Injury
        ,DateEtio         : grpEtiology.DateEtio
        ,WorkRelated      : grpEtiology.WorkRelated
        ,WorkRelatedDetails : grpEtiology.WorkRelatedDetails
        ,OnsetAccuteGradual : grpEtiology.OnsetAccuteGradual
        ,Duration         : grpEtiology.Duration
        ,DurationUnit     : grpEtiology.DurationUnit
        ,Severity         : grpEtiology.Severity
        ,AmbulatoryAid    : grpEtiology.AmbulatoryAid
      }

      $ipadrbg.context.clinix_etiology.add(newrecord);
      $ipadrbg.context.clinix_etiology.saveChanges();
    }
    else {
      alert("Incomplete information, please go back!")
    }

    $scope.LoadEtiology();
  }

  $scope.removeEtiology = function (grpEtiology) {
    grpEtiology.remove()
    .then(function() {
      $scope.$apply(function() {
        var comps = $scope.clinix_etiology;
        comps.splice(comps.indexOf(grpEtiology), 1);
      });
    })
   .fail(function(err) {
      alert("Error deleting item!");
   });
  }

});

// IOHPEApp.controller('myBone', function ($scope) {
//   $scope.myBone = [
//   { 0 : "(undefined)"},
//   { 1 : "HIP"},
//   { 2 : "KNEE"},
//   { 3 : "ANKLE and FOOT"},
//   { 4 : "SHOULDER-ARM"},
//   { 5 : "ELBOW"},
//   { 6 : "WRIST and HAND"},
//   { 7 : "THIGH"}
// ]}
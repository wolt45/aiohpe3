IOHPEApp.controller('LABSCtrl', function ($scope, $routeParams, $http) {
  $scope.clinix_LABS = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadLABS = function(){
    var promise = $ipadrbg.context.clinix_LABS.filter(function (px) { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_LABS = pxresult;
      });
    })
  }

  $scope.LoadLABS();

  $scope.addLABS_xrays = function (grpLABS) {

    alert("HIT!");

    if (grpLABS.labDateXRays == "none" || grpLABS.labDateXRays == "") {
      grpLABS.labDateXRays = "none";
      grpLABS.labSourceXRays = "none";
      grpLABS.labReportXRays = "none"
    }
    
    if ( grpLABS.labDateXRays && grpLABS.labSourceXRays && grpLABS.labReportXRays ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'X-Rays'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "X-Rays"
        ,labDate          : grpLABS.labDateXRays
        ,labSource        : grpLABS.labSourceXRays
        ,labReport        : grpLABS.labReportXRays
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();
    }
    else {
      alert ("Incomplete XRay details, please go back!");
    }
  }
  // ====================================================


  $scope.removeLABS = function (grpLABS) {
    grpLABS.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_LABS;
         comps.splice(comps.indexOf(grpLABS), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});
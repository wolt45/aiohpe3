IOHPEApp.controller('LABSCtrl', function ($scope, $routeParams, $http){
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

  $scope.addLABS = function (grpLABS) {
    if ( grpLABS.labDateXRays || grpLABS.labSourceXRays || grpLABS.labReportXRays ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "X-Rays"
        ,labDate          : grpLABS.labDateXRays
        ,labSource        : grpLABS.labSourceXRays
        ,labReport        : grpLABS.labReportXRays
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    if ( grpLABS.labDateMRI || grpLABS.labSourceMRI || grpLABS.labReportMRI ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "MRI"
        ,labDate          : grpLABS.labDateMRI
        ,labSource        : grpLABS.labSourceMRI
        ,labReport        : grpLABS.labReportMRI
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    if ( grpLABS.labDateCTSCAN || grpLABS.labSourceCTSCAN || grpLABS.labReportCTSCAN ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "CT-SCAN"
        ,labDate          : grpLABS.labDateCTSCAN
        ,labSource        : grpLABS.labSourceCTSCAN
        ,labReport        : grpLABS.labReportCTSCAN
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    if ( grpLABS.labDateCBC || grpLABS.labSourceCBC || grpLABS.labReportCBC ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-CBC"
        ,labDate          : grpLABS.labDateCBC
        ,labSource        : grpLABS.labSourceCBC
        ,labReport        : grpLABS.labReportCBC
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    if ( grpLABS.labDateESR || grpLABS.labSourceESR || grpLABS.labReportESR ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-ESR"
        ,labDate          : grpLABS.labDateESR
        ,labSource        : grpLABS.labSourceESR
        ,labReport        : grpLABS.labReportESR
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    if ( grpLABS.labDateCRP || grpLABS.labSourceCRP || grpLABS.labReportCRP ) {
        newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-CRP"
        ,labDate          : grpLABS.labDateCRP
        ,labSource        : grpLABS.labSourceCRP
        ,labReport        : grpLABS.labReportCRP
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
    }

    $ipadrbg.context.clinix_LABS.saveChanges();

    grpLABS.labDateXRays    = "";
    grpLABS.labSourceXRays  = "";
    grpLABS.labReportXRays  = "";

    grpLABS.labDateMRI      = "";
    grpLABS.labSourceMRI    = "";
    grpLABS.labReportMRI    = "";

    grpLABS.labDateCTSCAN   = "";
    grpLABS.labSourceCTSCAN = "";
    grpLABS.labReportCTSCAN = "";

    grpLABS.labDateCBC   = "";
    grpLABS.labSourceCBC = "";
    grpLABS.labReportCBC = "";

    grpLABS.labDateESR   = "";
    grpLABS.labSourceESR = "";
    grpLABS.labReportESR = "";

    grpLABS.labDateCRP   = "";
    grpLABS.labSourceCRP = "";
    grpLABS.labReportCRP = "";

    $scope.LoadLABS();
  }

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
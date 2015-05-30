IOHPEApp.controller('LABSCtrl', function ($scope, $routeParams, $http) {
  $scope.clinix_LABS = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.LABSPrevLabs = [];

  $scope.LoadLABS = function(){
    var promise = $ipadrbg.context.clinix_LABS.filter(function (px) 
      { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_LABS = pxresult;
        
        // WFS HACKS: pick-up Chart Number Here
        $scope.PxRID = pxresult[0]['PxRID'];
        // alert($scope.PxRID);
        $scope.LoadLABSPrevLabs();

      });
    })
  }

  $scope.LoadLABS();

  // LABS, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadLABSPrevLabs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && labs.HangRID == this.hangRID} , {id:$scope.PxRID, hangRID: 3}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.LABSPrevLabs = pxresult;
        // 
        alert($scope.PxRID);
      });
    });
  }

  $scope.addLABS_xrays = function (grpLABS) {
    var xTest = grpLABS.labDateXRays.toUpperCase();
    
    if (xTest == "NONE") {
      grpLABS.labDateXRays = "NONE";
      grpLABS.labSourceXRays = "NONE";
      grpLABS.labReportXRays = "NONE"
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

      grpLABS.labDateXRays    = "";
      grpLABS.labSourceXRays  = "";
      grpLABS.labReportXRays  = "";
    }
    else {
      alert ("Incomplete XRay details, please go back!");
    }
  }
  // ====================================================

  $scope.addLABS_mri = function (grpLABS) {
    var xTest = grpLABS.labDateMRI.toUpperCase();

    if (xTest == "NONE") {
      grpLABS.labDateMRI = "NONE";
      grpLABS.labSourceMRI = "NONE";
      grpLABS.labReportMRI = "NONE";
    }
    if ( grpLABS.labDateMRI && grpLABS.labSourceMRI && grpLABS.labReportMRI ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'MRI'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "MRI"
        ,labDate          : grpLABS.labDateMRI
        ,labSource        : grpLABS.labSourceMRI
        ,labReport        : grpLABS.labReportMRI
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();

      grpLABS.labDateMRI      = "";
      grpLABS.labSourceMRI    = "";
      grpLABS.labReportMRI    = "";
    }
    else {
      alert ("Incomplete MRI details, please go back!");
    }
  }    
  // ====================================================

  $scope.addLABS_ctscan = function (grpLABS) {
    var xTest = grpLABS.labDateCTSCAN.toUpperCase();

    if (xTest == "NONE") {
      grpLABS.labDateCTSCAN = "NONE";
      grpLABS.labSourceCTSCAN = "NONE";
      grpLABS.labReportCTSCAN = "NONE";
    }
    if ( grpLABS.labDateCTSCAN && grpLABS.labSourceCTSCAN && grpLABS.labReportCTSCAN ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'CT-SCAN'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "CT-SCAN"
        ,labDate          : grpLABS.labDateCTSCAN
        ,labSource        : grpLABS.labSourceCTSCAN
        ,labReport        : grpLABS.labReportCTSCAN
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();

      grpLABS.labDateCTSCAN   = "";
      grpLABS.labSourceCTSCAN = "";
      grpLABS.labReportCTSCAN = "";

    }
    else {
      alert ("Incomplete CT-SCAN details, please go back!");
    }
  }
  // ====================================================

  $scope.addLABS_cbc = function (grpLABS) {
    var xTest = grpLABS.labDateCBC.toUpperCase();

    if (xTest == "NONE") {
      grpLABS.labDateCBC = "NONE";
      grpLABS.labSourceCBC = "NONE";
      grpLABS.labReportCBC = "NONE";
    }
    if ( grpLABS.labDateCBC && grpLABS.labSourceCBC && grpLABS.labReportCBC ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'BLOOD-CBC'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-CBC"
        ,labDate          : grpLABS.labDateCBC
        ,labSource        : grpLABS.labSourceCBC
        ,labReport        : grpLABS.labReportCBC
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();

      grpLABS.labDateCBC   = "";
      grpLABS.labSourceCBC = "";
      grpLABS.labReportCBC = "";
    }
    else {
      alert ("Incomplete BLOOD-CBC details, please go back!");
    }
  }
  // ====================================================

  $scope.addLABS_esr = function (grpLABS) {
    var xTest = grpLABS.labDateESR.toUpperCase();

    if (xTest == "NONE") {
      grpLABS.labDateESR = "NONE";
      grpLABS.labSourceESR = "NONE";
      grpLABS.labReportESR = "NONE";
    }

    if ( grpLABS.labDateESR && grpLABS.labSourceESR && grpLABS.labReportESR ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'BLOOD-ESR'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-ESR"
        ,labDate          : grpLABS.labDateESR
        ,labSource        : grpLABS.labSourceESR
        ,labReport        : grpLABS.labReportESR
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();

      grpLABS.labDateESR   = "";
      grpLABS.labSourceESR = "";
      grpLABS.labReportESR = "";
    }
    else {
      alert ("Incomplete BLOOD-ESR details, please go back!");
    }
  }
  // ====================================================

  $scope.addLABS_crp = function (grpLABS) {
    var xTest = grpLABS.labDateCRP.toUpperCase();

    if (xTest == "NONE") {
      grpLABS.labDateCRP = "NONE";
      grpLABS.labSourceCRP = "NONE";
      grpLABS.labReportCRP = "NONE";
    }

    if ( grpLABS.labDateCRP && grpLABS.labSourceCRP && grpLABS.labReportCRP ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_LABS' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND labCategory = 'BLOOD-CRP'"
            );
      });

      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,labCategory      : "BLOOD-CRP"
        ,labDate          : grpLABS.labDateCRP
        ,labSource        : grpLABS.labSourceCRP
        ,labReport        : grpLABS.labReportCRP
      }
      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();
      $scope.LoadLABS();

      grpLABS.labDateCRP   = "";
      grpLABS.labSourceCRP = "";
      grpLABS.labReportCRP = "";
    }
    else {
      alert ("Incomplete BLOOD-CRP details, please go back!");
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
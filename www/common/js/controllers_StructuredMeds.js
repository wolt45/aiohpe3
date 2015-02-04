IOHPEApp.controller('StructuredMedsCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredMedication = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.drugDozage = [
      { id : 0,  dropname : "",       factor:  0, doze : ""}
    , { id : 2,  dropname : "b.i.d.", factor:  2, doze : "2 times a day"}
    , { id : 3,  dropname : "t.i.d.", factor:  3, doze : "3 times a day"}
    , { id : 4,  dropname : "q.i.d.", factor:  4, doze : "4 times a day"}
    , { id : 5,  dropname : "q3h",    factor:  8, doze : "every three hours"}
    , { id : 6,  dropname : "q.4h",   factor:  6, doze : "every four hours"}
    , { id : 7,  dropname : "q.5h",   factor:  5, doze : "every five hours"}
    , { id : 8,  dropname : "q.6h",   factor:  4, doze : "every six hours"}
    , { id : 9,  dropname : "q.8h",   factor:  3, doze : "every 8 hours"}
    , { id : 10, dropname : "q.d.",   factor:  1, doze : "every day"}
    , { id : 11, dropname : "a.c.",   factor:  0, doze : ""}
    , { id : 12, dropname : "p.c.",   factor:  0, doze : ""}
    , { id : 13, dropname : "a.m.",   factor:  5, doze : ""}
    , { id : 14, dropname : "p.m.",   factor:  1, doze : "at bedtime"}
    , { id : 15, dropname : "ante",   factor:  0, doze : ""}
    , { id : 16, dropname : "h",      factor:  0, doze : ""}
    , { id : 17, dropname : "h.s.",   factor:  1, doze : "bedtime"}
    , { id : 18, dropname : "p.r.n.", factor:  1, doze : "as needed"}
    , { id : 34, dropname : "O.D.",   factor:  1, doze : "once a day"}
    , { id : 35, dropname : "O.D. 30", factor: 1, doze : "30 minutes before breakast"}
    , { id : 36, dropname : "6x",     factor:  1, doze : "6 times daily"}
    , { id : 37, dropname : "EOD",    factor:  1, doze : "EVERY OTHER DAY"}
  ];

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_StructuredMedication.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredMedication = pxresult;
      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew = function (frmArrObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      , PxRID    : $scope.clinix.PxRID
 
      , GenericName : frmArrObj.GenericName
      , Brand       : frmArrObj.Brand
      , Qty         : frmArrObj.Qty
      , DropName    : frmArrObj.Dose
      , Dose        : frmArrObj.Dose
    }
    $ipadrbg.context.clinix_StructuredMedication.add(newrecord);
    $ipadrbg.context.clinix_StructuredMedication.saveChanges();

    frmArrObj.GenericName = "";
    frmArrObj.Brand = "";
    frmArrObj.Qty = "";
    frmArrObj.Dose = "";

    $scope.LoadDiagnosis();
  }

  $scope.removeItem = function (frmArrObj) {
    frmArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredMedication;
         diagol.splice(diagol.indexOf(frmArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


  // SYNCH service
  $scope.SynchME = function(clinixrid) {
    if (confirm('PROCEED with STRUCTURED DISCHARGE Synch-Push BACK Process?')) {

      $scope.Push_StructuredDiagnosis();
      $scope.Push_StructuredSchedSurgery();
      $scope.Push_StructuredHospitalization();
      $scope.Push_StructuredLABS();
      $scope.Push_StructuredDisposition();
      $scope.Push_StructuredManagement();
      $scope.Push_StructuredMedication();

      alert("EXPORT Structure Discharge Summary to Server Successful!");
    }
  }

  $scope.Push_StructuredDiagnosis = function() {
    $scope.clinix_StructuredDiagnosis = [];
    var promise = $ipadrbg.context.clinix_StructuredDiagnosis.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDiagnosis = pxresult;
      });
      $scope.clinix_StructuredDiagnosis_JSON = JSON.stringify($scope.clinix_StructuredDiagnosis);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredDiagnosis.php?clinixJsonIzed=' + $scope.clinix_StructuredDiagnosis_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredDiagnosis_JSON
        , cache : false
      });
    });
  } // 0.99


  $scope.Push_StructuredSchedSurgery = function() {
    $scope.clinix_StructuredSchedSurgery = [];
    var promise = $ipadrbg.context.clinix_StructuredSchedSurgery.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredSchedSurgery = pxresult;
      });
      $scope.clinix_StructuredSchedSurgery_JSON = JSON.stringify($scope.clinix_StructuredSchedSurgery);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredSchedSurgery.php?clinixJsonIzed=' + $scope.clinix_StructuredSchedSurgery_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredSchedSurgery_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredHospitalization = function() {
    $scope.clinix_StructuredHospitalization = [];
    var promise = $ipadrbg.context.clinix_StructuredHospitalization.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredHospitalization = pxresult;
      });
      $scope.clinix_StructuredHospitalization_JSON = JSON.stringify($scope.clinix_StructuredHospitalization);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredHospitalization.php?clinixJsonIzed=' + $scope.clinix_StructuredHospitalization_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredHospitalization_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredLABS = function() {
    $scope.clinix_StructuredLABS = [];
    var promise = $ipadrbg.context.clinix_StructuredLABS.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredLABS = pxresult;
      });
      $scope.clinix_StructuredLABS_JSON = JSON.stringify($scope.clinix_StructuredLABS);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredDischargeLabs.php?clinixJsonIzed=' + $scope.clinix_StructuredLABS_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredLABS_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredDisposition = function() {
    $scope.clinix_StructuredDisposition = [];
    var promise = $ipadrbg.context.clinix_StructuredDisposition.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDisposition = pxresult;
      });
      $scope.clinix_StructuredDisposition_JSON = JSON.stringify($scope.clinix_StructuredDisposition);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredDisposition.php?clinixJsonIzed=' + $scope.clinix_StructuredDisposition_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredDisposition_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredManagement = function() {
    $scope.clinix_StructuredManagement = [];
    var promise = $ipadrbg.context.clinix_StructuredManagement.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredManagement = pxresult;
      });
      $scope.clinix_StructuredManagement_JSON = JSON.stringify($scope.clinix_StructuredManagement);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredManagement.php?clinixJsonIzed=' + $scope.clinix_StructuredManagement_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredManagement_JSON
        , cache : false
      });
    });
  }

  $scope.Push_StructuredMedication = function() {
    $scope.clinix_StructuredMedication = [];
    var promise = $ipadrbg.context.clinix_StructuredMedication.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredMedication = pxresult;
      });
      $scope.clinix_StructuredMedication_JSON = JSON.stringify($scope.clinix_StructuredMedication);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_StructuredMedication.php?clinixJsonIzed=' + $scope.clinix_StructuredMedication_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredMedication_JSON
        , cache : false
      });
    });
  }
  // SYNCH service - floor

});
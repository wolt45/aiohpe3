IOHPEApp.controller('OPKNEE_5Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_5 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_5 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_5.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_5 = pxresult;

        $scope.opknee5 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,SupineLength : pxresult[0]['SupineLength']
          ,LR : pxresult[0]['LR']
          ,AbsentNormal : pxresult[0]['AbsentNormal']
          ,Others : pxresult[0]['Others']



          , BloodLoss : pxresult[0]['SupineLength']
          , Closure   : pxresult[0]['SupineLength']
          , CompressionDressings : pxresult[0]['SupineLength']
          , OperativeCourse : pxresult[0]['SupineLength']
          , Findings : pxresult[0]['SupineLength']
          , Diagnosis : pxresult[0]['SupineLength']
          
          , OpDuration : pxresult[0]['SupineLength']
          , TEDS : pxresult[0]['SupineLength']
          , XRays : pxresult[0]['SupineLength']
          , Others : pxresult[0]['SupineLength']

        }

      });
    });
  };

  $scope.LoadOPKNEE_5();

  $scope.addNew = function (frmObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_OPKNEE_5' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Operative Blood Loass'");
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,BloodLoss : frmObj.BloodLoss
      ,Closure : frmObj.Closure
      ,CompressionDressings : frmObj.CompressionDressings
      ,OperativeCourse : frmObj.OperativeCourse
      ,OperativeCourse : frmObj.OperativeCourse
      ,Findings : frmObj.Findings
      ,Diagnosis : frmObj.Diagnosis
      ,OpDuration : frmObj.OpDuration
      ,TEDS : frmObj.TEDS
      ,XRays : frmObj.XRays
      ,Others : frmObj.Others
    }
    $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_5.saveChanges();

    alert("Data Saved!");

    $scope.LoadOPKNEE_5();
  }

  $scope.removeItem = function (frmObj) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPKNEE_5' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.opknee5 = [];
    }
  }

});
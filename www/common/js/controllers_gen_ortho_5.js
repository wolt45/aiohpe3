IOHPEApp.controller('gen_orth5_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_5 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho5 = function(){
    var promise = $ipadrbg.context.jdata_genotho_5.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_5 = pxresult;
      });

    $scope.genortho5 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,XrayDate : pxresult[0]['XrayDate']
    ,XrayReport : pxresult[0]['XrayReport']
    ,MRIDate : pxresult[0]['MRIDate']
    ,MRIReport : pxresult[0]['MRIReport']
    ,CTSCANDate : pxresult[0]['CTSCANDate']
    ,CTSCANReport : pxresult[0]['CTSCANReport']
    ,BloodExams : pxresult[0]['BloodExams']
    ,BloodExamsWhere : pxresult[0]['BloodExamsWhere']
    ,BloodReports : pxresult[0]['BloodReports']
  
  }

    });
  }; 

   $scope.Loadgenortho5();

  $scope.addNew_genortho5 = function (frmgenortho5) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_5' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,XrayDate : frmgenortho5.XrayDate
      ,XrayReport : frmgenortho5.XrayReport
      ,MRIDate : frmgenortho5.MRIDate
      ,MRIReport : frmgenortho5.MRIReport
      ,CTSCANDate : frmgenortho5.CTSCANDate
      ,CTSCANReport : frmgenortho5.CTSCANReport
      ,BloodExams : frmgenortho5.BloodExams
      ,BloodExamsWhere : frmgenortho5.BloodExamsWhere
      ,BloodReports : frmgenortho5.BloodReports

    }
    $ipadrbg.context.jdata_genotho_5.add(newrecord);
    $ipadrbg.context.jdata_genotho_5.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadgenortho5();    
  }

  $scope.removegenortho5 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_5' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho5 = [];
    }
  }

});
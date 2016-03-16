IOHPEApp.controller('PT2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PT2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadPT2 = function(){
    var promise = $ipadrbg.context.jdata_PT2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_PT2 = pxresult;
      });

          $scope.PT2 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,VisualAnalog : pxresult[0]['VisualAnalog']
          ,PainChar : pxresult[0]['PainChar']
          ,WhatDece : pxresult[0]['WhatDece']
          ,Medication : pxresult[0]['Medication']
          ,PainFreq : pxresult[0]['PainFreq']
          ,IsPain : pxresult[0]['IsPain']
        
       }

    });
  }; 

   $scope.LoadPT2();

  $scope.addNew_PT2 = function (frmPT2) {
    
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_PT2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,VisualAnalog : frmPT2.VisualAnalog
      ,PainChar : frmPT2.PainChar
      ,WhatDece : frmPT2.WhatDece
      ,Medication : frmPT2.Medication
      ,PainFreq : frmPT2.PainFreq
      ,IsPain : frmPT2.IsPain

    }
    $ipadrbg.context.jdata_PT2.add(newrecord);
    $ipadrbg.context.jdata_PT2.saveChanges();

    alert("PT Initial Interview Data Saved!");

    $scope.LoadPT2();      
  }

  $scope.removePT2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PT2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.PT2 = [];
    }
  }

});
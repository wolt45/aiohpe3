IOHPEApp.controller('ITF_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ITF = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadITF = function(){
    var promise = $ipadrbg.context.jdata_ITF.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ITF = pxresult;
      });

    $scope.ITF = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Hospital : pxresult[0]['Hospital']
    ,RefHosp : pxresult[0]['RefHosp']
    ,PreOpBP : pxresult[0]['PreOpBP']
    ,RecPhy : pxresult[0]['RecPhy']
    ,TimeRef : pxresult[0]['TimeRef']
    ,BrifHist : pxresult[0]['BrifHist']
    ,T : pxresult[0]['T']
    ,O2sat : pxresult[0]['O2sat']
    ,Width : pxresult[0]['Width']
    ,Height : pxresult[0]['Height']
    ,Lab : pxresult[0]['Lab']
    ,MedGiven : pxresult[0]['MedGiven']
    ,Diagnosis : pxresult[0]['Diagnosis']
    ,MedTansfer : pxresult[0]['MedTansfer']
  
  }

    });
  }; 

   $scope.LoadITF();

  $scope.addNew_ITF = function (frmITF) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ITF' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Hospital : frmITF.Hospital
      ,RefHosp : frmITF.RefHosp
      ,PreOpBP : frmITF.PreOpBP
      ,RecPhy : frmITF.RecPhy
      ,TimeRef : frmITF.TimeRef
      ,BrifHist : frmITF.BrifHist
      ,T : frmITF.T
      ,O2sat : frmITF.O2sat
      ,Width : frmITF.Width
      ,Height : frmITF.Height
      ,Lab : frmITF.Lab
      ,MedGiven : frmITF.MedGiven
      ,Diagnosis : frmITF.Diagnosis
      ,MedTansfer : frmITF.MedTansfer

    }
    $ipadrbg.context.jdata_ITF.add(newrecord);
    $ipadrbg.context.jdata_ITF.saveChanges();

    alert("ITF Data Saved!");

    $scope.LoadITF();    
  }

  $scope.removeITF = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ITF' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ITF = [];
    }
  }

});
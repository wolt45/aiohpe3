IOHPEApp.controller('ORSocHab_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORSocHab = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORSocHab = function(){
    var promise = $ipadrbg.context.jdata_ORSocHab.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORSocHab = pxresult;
      });

    $scope.ORsocialHabits = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,PatientUsed : pxresult[0]['PatientUsed']
    ,Transportation : pxresult[0]['Transportation']
    ,TransSel : pxresult[0]['TransSel']
    ,NameRef : pxresult[0]['NameRef']
    ,PhoneRef : pxresult[0]['PhoneRef']
    ,Allergies : pxresult[0]['Allergies']
    ,MedicationAll : pxresult[0]['MedicationAll']
    ,FoodAll : pxresult[0]['FoodAll']
  
  }

    });
  }; 

   $scope.LoadORSocHab();

  $scope.addNew_ORSocHab = function (frmORMedHis) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORSocHab' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PatientUsed : frmORMedHis.PatientUsed
      ,Transportation : frmORMedHis.Transportation
      ,TransSel : frmORMedHis.TransSel
      ,NameRef : frmORMedHis.NameRef
      ,PhoneRef : frmORMedHis.PhoneRef
      ,Allergies : frmORMedHis.Allergies
      ,MedicationAll : frmORMedHis.MedicationAll
      ,FoodAll : frmORMedHis.FoodAll

    }
    $ipadrbg.context.jdata_ORSocHab.add(newrecord);
    $ipadrbg.context.jdata_ORSocHab.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORSocHab();    
  }

  $scope.removeORSocHab = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORSocHab' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORsocialHabits = [];
    }
  }

});
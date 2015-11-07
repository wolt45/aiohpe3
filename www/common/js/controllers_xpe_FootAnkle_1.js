IOHPEApp.controller('footAnkle_1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle1 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_1 = pxresult;
      });

      $scope.FootAnkle1 = {
      ClinixRID  : $scope.clinix.ClinixRID
      ,PxRID     : $scope.clinix.PxRID

      ,DOI : pxresult[0]['DOI']
      ,TOI : pxresult[0]['TOI']
      ,MOI : pxresult[0]['MOI']
      ,POI : pxresult[0]['POI']
      ,HistoryOfIllness : pxresult[0]['HistoryOfIllness']

      ,MedHistHypertension : pxresult[0]['MedHistHypertension']
      ,MedHistCardiac : pxresult[0]['MedHistCardiac']
      ,MedHistGenital : pxresult[0]['MedHistGenital']
      ,MedHistDiabetes : pxresult[0]['MedHistDiabetes']
      ,MedHistPulmo : pxresult[0]['MedHistPulmo']
      ,MedHistHepatitis : pxresult[0]['MedHistHepatitis']
      ,MedHistAsthma : pxresult[0]['MedHistAsthma']
      ,MedHistKidney : pxresult[0]['MedHistKidney']
      ,MedHistBleeding : pxresult[0]['MedHistBleeding']
      ,MedHistThyroid : pxresult[0]['MedHistThyroid']
      ,MedHistGI : pxresult[0]['MedHistGI']
      ,MedHistOthers : pxresult[0]['MedHistOthers']
      ,MedHistAllergies : pxresult[0]['MedHistAllergies']
      ,MedHistPrevOp : pxresult[0]['MedHistPrevOp']
      ,MedHistCurrentMedication : pxresult[0]['MedHistCurrentMedication']
      
      ,ReviewSystemFever : pxresult[0]['ReviewSystemFever']
      ,ReviewSystemAbdominalPain : pxresult[0]['ReviewSystemAbdominalPain']
      ,ReviewSystemVomiting : pxresult[0]['ReviewSystemVomiting']
      ,ReviewSystemDysuria : pxresult[0]['ReviewSystemDysuria']
      ,ReviewSystemCough : pxresult[0]['ReviewSystemCough']
      ,ReviewSystemDOB : pxresult[0]['ReviewSystemDOB']
      ,ReviewSystemDiarrhea : pxresult[0]['ReviewSystemDiarrhea']
      ,ReviewSystemlowbackpain : pxresult[0]['ReviewSystemlowbackpain']
      }

       
    });
  }; 

   $scope.LoadFootAnkle1();

  $scope.addNew_FootAnkle1 = function (frmFootAnkle1) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_AnkleFoot_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,DOI : frmFootAnkle1.DOI
      ,TOI : frmFootAnkle1.TOI
      ,MOI : frmFootAnkle1.MOI
      ,POI : frmFootAnkle1.POI
      ,HistoryOfIllness : frmFootAnkle1.HistoryOfIllness

      ,MedHistHypertension : frmFootAnkle1.MedHistHypertension
      ,MedHistCardiac : frmFootAnkle1.MedHistCardiac
      ,MedHistGenital : frmFootAnkle1.MedHistGenital
      ,MedHistDiabetes : frmFootAnkle1.MedHistDiabetes
      ,MedHistPulmo : frmFootAnkle1.MedHistPulmo
      ,MedHistHepatitis : frmFootAnkle1.MedHistHepatitis
      ,MedHistAsthma : frmFootAnkle1.MedHistAsthma
      ,MedHistKidney : frmFootAnkle1.MedHistKidney
      ,MedHistBleeding : frmFootAnkle1.MedHistBleeding
      ,MedHistThyroid : frmFootAnkle1.MedHistThyroid
      ,MedHistGI : frmFootAnkle1.MedHistGI
      ,MedHistOthers : frmFootAnkle1.MedHistOthers
      ,MedHistAllergies : frmFootAnkle1.MedHistAllergies
      ,MedHistPrevOp : frmFootAnkle1.MedHistPrevOp
      ,MedHistCurrentMedication : frmFootAnkle1.MedHistCurrentMedication
      
      ,ReviewSystemFever : frmFootAnkle1.ReviewSystemFever
      ,ReviewSystemAbdominalPain : frmFootAnkle1.ReviewSystemAbdominalPain
      ,ReviewSystemVomiting : frmFootAnkle1.ReviewSystemVomiting
      ,ReviewSystemDysuria : frmFootAnkle1.ReviewSystemDysuria
      ,ReviewSystemCough : frmFootAnkle1.ReviewSystemCough
      ,ReviewSystemDOB : frmFootAnkle1.ReviewSystemDOB
      ,ReviewSystemDiarrhea : frmFootAnkle1.ReviewSystemDiarrhea
      ,ReviewSystemlowbackpain : frmFootAnkle1.ReviewSystemlowbackpain

    }
    $ipadrbg.context.jdata_FootAnkle_1.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_1.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle1();
  }

  $scope.removeFootAnkle1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle1 = [];
    }
  }

});
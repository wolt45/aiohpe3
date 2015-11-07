IOHPEApp.controller('shoulder_1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder1 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_1 = pxresult;
      });

    $scope.Sportsholder1 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,DOI : pxresult[0]['DOI']
    ,TOI : pxresult[0]['TOI']
    ,MOI : pxresult[0]['MOI']
    ,POI : pxresult[0]['POI']
  
    ,HistoryOfPresentIllnessDescrip : pxresult[0]['HistoryOfPresentIllnessDescrip']
    ,Hypertension : pxresult[0]['Hypertension']
    ,Cardiac : pxresult[0]['Cardiac']
    ,Genital : pxresult[0]['Genital']
    ,Diabetes : pxresult[0]['Diabetes']
    ,Pulmo : pxresult[0]['Pulmo']
    ,Hepatitis : pxresult[0]['Hepatitis']
    ,Asthma : pxresult[0]['Asthma']
    ,Kidney : pxresult[0]['Kidney']
    ,Bleeding : pxresult[0]['Bleeding']
    ,Thyroid : pxresult[0]['Thyroid']
    ,GI : pxresult[0]['GI']
    ,Others : pxresult[0]['Others']
    ,Allergies : pxresult[0]['Allergies']
    ,AllergiesDescrip : pxresult[0]['AllergiesDescrip']
    ,PreviousOperation : pxresult[0]['PreviousOperation']
    ,PreviousOperationDescrip : pxresult[0]['PreviousOperationDescrip']
    ,Currentmedication : pxresult[0]['Currentmedication']
    ,CurrentmedicationDescrip : pxresult[0]['CurrentmedicationDescrip']
    ,ReviewOfSystemsFever : pxresult[0]['ReviewOfSystemsFever']
    ,ReviewOfSystemsAbdominalPain : pxresult[0]['ReviewOfSystemsAbdominalPain']
    ,ReviewOfSystemsVomiting : pxresult[0]['ReviewOfSystemsVomiting']
    ,ReviewOfSystemsDysuria : pxresult[0]['ReviewOfSystemsDysuria']
    ,ReviewOfSystemsCough : pxresult[0]['ReviewOfSystemsCough']
    ,ReviewOfSystemsDOB : pxresult[0]['ReviewOfSystemsDOB']
    ,ReviewOfSystemsDiarrhea : pxresult[0]['ReviewOfSystemsDiarrhea']
    ,ReviewOfSystemslowback : pxresult[0]['ReviewOfSystemslowback']
  
  }

    });
  }; 

   $scope.Loadshoulder1();

  $scope.addNew_shoulder1 = function (frmshoulder1) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,DOI : frmshoulder1.DOI
      ,TOI : frmshoulder1.TOI
      ,MOI : frmshoulder1.MOI
      ,POI : frmshoulder1.POI
      ,HistoryOfPresentIllnessDescrip : frmshoulder1.HistoryOfPresentIllnessDescrip
      ,Hypertension : frmshoulder1.Hypertension
      ,Cardiac : frmshoulder1.Cardiac
      ,Genital : frmshoulder1.Genital
      ,Diabetes : frmshoulder1.Diabetes
      ,Pulmo : frmshoulder1.Pulmo
      ,Hepatitis : frmshoulder1.Hepatitis
      ,Asthma : frmshoulder1.Asthma
      ,Kidney : frmshoulder1.Kidney
      ,Bleeding : frmshoulder1.Bleeding
      ,Thyroid : frmshoulder1.Thyroid
      ,GI : frmshoulder1.GI
      ,Others : frmshoulder1.Others
      ,Allergies : frmshoulder1.Allergies
      ,AllergiesDescrip : frmshoulder1.AllergiesDescrip
      ,PreviousOperation : frmshoulder1.PreviousOperation
      ,PreviousOperationDescrip : frmshoulder1.PreviousOperationDescrip
      ,Currentmedication : frmshoulder1.Currentmedication
      ,CurrentmedicationDescrip : frmshoulder1.CurrentmedicationDescrip
      ,ReviewOfSystemsFever : frmshoulder1.ReviewOfSystemsFever
      ,ReviewOfSystemsAbdominalPain : frmshoulder1.ReviewOfSystemsAbdominalPain
      ,ReviewOfSystemsVomiting : frmshoulder1.ReviewOfSystemsVomiting
      ,ReviewOfSystemsDysuria : frmshoulder1.ReviewOfSystemsDysuria
      ,ReviewOfSystemsCough : frmshoulder1.ReviewOfSystemsCough
      ,ReviewOfSystemsDOB : frmshoulder1.ReviewOfSystemsDOB
      ,ReviewOfSystemsDiarrhea : frmshoulder1.ReviewOfSystemsDiarrhea
      ,ReviewOfSystemslowback : frmshoulder1.ReviewOfSystemslowback

    }
    $ipadrbg.context.jdata_shoulder_1.add(newrecord);
    $ipadrbg.context.jdata_shoulder_1.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadshoulder1();    
  }

  $scope.removeshoulder1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportsholder1 = [];
    }
  }

});
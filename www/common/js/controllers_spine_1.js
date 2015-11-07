IOHPEApp.controller('spine_1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_spine_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadspine1 = function(){
    var promise = $ipadrbg.context.jdata_spine_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_spine_1 = pxresult;
      });

      $scope.spine1 = {
      ClinixRID  : $scope.clinix.ClinixRID
      ,PxRID     : $scope.clinix.PxRID

      ,DominantHand : pxresult[0]['DominantHand']
      ,CC : pxresult[0]['CC']
      ,problemsymptoms : pxresult[0]['problemsymptoms']
      ,symptoms : pxresult[0]['symptoms']
      ,priorepisodes : pxresult[0]['priorepisodes']
      ,JobInjury : pxresult[0]['JobInjury']
      ,injurydate : pxresult[0]['injurydate']

      }

       
    });
  }; 

   $scope.Loadspine1();

  $scope.addNew_Spine1 = function (frmSpine1) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_spine_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,DominantHand : frmSpine1.DominantHand
      ,CC : frmSpine1.CC
      ,problemsymptoms : frmSpine1.problemsymptoms
      ,symptoms : frmSpine1.symptoms
      ,priorepisodes : frmSpine1.priorepisodes
      ,JobInjury : frmSpine1.JobInjury
      ,injurydate : frmSpine1.injurydate
    }
    $ipadrbg.context.jdata_spine_1.add(newrecord);
    $ipadrbg.context.jdata_spine_1.saveChanges();

    alert("Spine Data Saved!");

    $scope.Loadspine1();
  }

  $scope.removespine1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_spine_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.spine1 = [];
    }
  }

});
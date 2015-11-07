IOHPEApp.controller('DiagsDispositionCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagsDisposition = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsDisposition = function(){
    var promise = $ipadrbg.context.clinix_DiagsDisposition.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsDisposition = pxresult;
      });
    });
  };

  $scope.LoadDiagsDisposition(); 

  $scope.addNew = function (daignosisObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_DiagsDisposition' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      , DispoCardioClearance  : daignosisObj.DispoCardioClearance
      , DispoHome             : daignosisObj.DispoHome
      , DispoHospital         : daignosisObj.DispoHospital
      , DispoAccompanying     : daignosisObj.DispoAccompanying
    }
    $ipadrbg.context.clinix_DiagsDisposition.add(newrecord);
    

    
    if (daignosisObj.FollowUp) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Disposition : daignosisObj.FollowUp
        ,FollowUpDate: daignosisObj.FollowUpDate
      }
      $ipadrbg.context.clinix_DiagsDisposition.add(newrecord);
    }

    $ipadrbg.context.clinix_DiagsDisposition.saveChanges();


    daignosisObj.DispoCardioClearance = "";
    daignosisObj.DispoHome          = "";
    daignosisObj.DispoHospital      = "";
    daignosisObj.DispoAccompanying  = "";

    $scope.LoadDiagsDisposition();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsDisposition;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
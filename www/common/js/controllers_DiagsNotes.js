IOHPEApp.controller('DiagsNotesCtrl', function ($scope, $routeParams, $http){

  $scope.clinix_DiagsNotes = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsNotes = function(){
    var promise = $ipadrbg.context.clinix_DiagsNotes.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsNotes = pxresult;
      });
    });
  };

  $scope.LoadDiagsNotes();

  $scope.addNewFUP = function (daignosisObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_DiagsNotes' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND NoteItem = 'Follow Up'" );
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,NoteItem : "Follow Up"
      ,NoteValue : daignosisObj.FollowUpDate
    }
    $ipadrbg.context.clinix_DiagsNotes.add(newrecord);
    $ipadrbg.context.clinix_DiagsNotes.saveChanges();
    $scope.LoadDiagsNotes();
    daignosisObj.FollowUpDate = "";
  }

  $scope.addNew = function (daignosisObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_DiagsNotes' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND NoteItem = 'Discussions'" );
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,NoteItem : "Discussions"
      ,NoteValue : daignosisObj.DiagTnyMce
    }
    $ipadrbg.context.clinix_DiagsNotes.add(newrecord);
    $ipadrbg.context.clinix_DiagsNotes.saveChanges();
    $scope.LoadDiagsNotes();
    daignosisObj.DiagTnyMce = "";
  }

  $scope.removeItem = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsNotes;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
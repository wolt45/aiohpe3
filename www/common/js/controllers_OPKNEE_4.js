IOHPEApp.controller('OPKNEE_4Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_4 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_4 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_4.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_4 = pxresult;

        $scope.opknee4 = {
          ClinixRID : $scope.clinix.ClinixRID
          ,PxRID    : $scope.clinix.PxRID

          ,Tourniquet  : pxresult[0]['Tourniquet'] 
          ,TourniquetNotes  : pxresult[0]['TourniquetNotes'] 
          ,ReleaseB4C  : pxresult[0]['ReleaseB4C'] 
          ,ReleaseB4Notes  : pxresult[0]['ReleaseB4Notes'] 
          ,Approach  : pxresult[0]['Approach'] 
          
          ,Subvastus  : pxresult[0]['Subvastus'] 
          ,SubvastusNotes  : pxresult[0]['SubvastusNotes'] 
          ,SurgicalIncision  : pxresult[0]['SurgicalIncision'] 
          ,SurgicalIncisionNotes  : pxresult[0]['SurgicalIncisionNotes'] 
          ,BonePreparation  : pxresult[0]['BonePreparation'] 
          ,CementingComponents  : pxresult[0]['CementingComponents'] 
          ,LateralRelease  : pxresult[0]['LateralRelease'] 
          ,LateralReleaseNotes  : pxresult[0]['LateralReleaseNotes'] 
          ,HemovacUsed  : pxresult[0]['HemovacUsed'] 
        }
      });
    });
  };

  $scope.LoadOPKNEE_4();

  $scope.addNew = function (frmObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPKNEE_4' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID
      
      ,Tourniquet  : frmObj.Tourniquet
      ,TourniquetNotes  : frmObj.TourniquetNotes
      ,ReleaseB4C : frmObj.ReleaseB4C
      ,ReleaseB4Notes : frmObj.ReleaseB4Notes

      ,Approach : frmObj.Approach

      ,Subvastus : frmObj.Subvastus
      ,SubvastusNotes : frmObj.SubvastusNotes

      ,SurgicalIncision : frmObj.SurgicalIncision
      ,SurgicalIncisionNotes : frmObj.SurgicalIncisionNotes

      ,BonePreparation : frmObj.BonePreparation

      ,CementingComponents : frmObj.CementingComponents
      ,LateralRelease : frmObj.LateralRelease
      ,LateralReleaseNotes : frmObj.LateralReleaseNotes

      ,HemovacUsed : frmObj.HemovacUsed
    }
    $ipadrbg.context.jdata_OPKNEE_4.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_4.saveChanges();

    alert("Surgical Technique Data Saved!");

    $scope.LoadOPKNEE_4();
  }

  $scope.removeItem = function (frmObj) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPKNEE_4' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.opknee4 = [];
    }
  }
});
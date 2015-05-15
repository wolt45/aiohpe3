IOHPEApp.controller('StructuredManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadStructuredMgmt = function(){
    var promise = $ipadrbg.context.clinix_StructuredManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredManagement = pxresult;

        $scope.StructMgmt = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,PhysicalTherapy : pxresult[0]['PhysicalTherapy']

          ,ExProg_FootAnkle : pxresult[0]['ExProg_FootAnkle']
          ,ExProg_QuadsHams : pxresult[0]['ExProg_QuadsHams']
          ,ExProg_FullWeight : pxresult[0]['ExProg_FullWeight']
          ,ExProg_SLR : pxresult[0]['ExProg_SLR']

          ,AmbulatoryAid : pxresult[0]['AmbulatoryAid']
          ,TEDS : pxresult[0]['TEDS']
          ,Shower : pxresult[0]['Shower']
          ,Notes : pxresult[0]['Notes']
          ,FollowUp : pxresult[0]['FollowUp']
        }
      });
    });
  };

  $scope.LoadStructuredMgmt(); 

  $scope.addNew = function (formArrObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PhysicalTherapy        : formArrObj.PhysicalTherapy
      ,ExProg_FootAnkle  : formArrObj.ExProg_FootAnkle
      ,ExProg_QuadsHams  : formArrObj.ExProg_QuadsHams
      ,ExProg_FullWeight  : formArrObj.ExProg_FullWeight
      ,ExProg_SLR  : formArrObj.ExProg_SLR
      
      ,AmbulatoryAid  : formArrObj.AmbulatoryAid
      ,TEDS  : formArrObj.TEDS
      ,Shower  : formArrObj.Shower
      ,Notes  : formArrObj.Notes
      ,FollowUp  : formArrObj.FollowUp

    }
    $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    $ipadrbg.context.clinix_StructuredManagement.saveChanges();

    alert("Management Data Saved Successfuly!");

    $scope.LoadStructuredMgmt();
  }

  $scope.removeItem = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.StructMgmt = [];
    }
  }
});
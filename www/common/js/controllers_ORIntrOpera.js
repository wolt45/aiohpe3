IOHPEApp.controller('ORIntraOp_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORIntraOp = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORIntraOp = function(){
    var promise = $ipadrbg.context.jdata_ORIntraOp.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORIntraOp = pxresult;
      });

    $scope.ORIntraOp = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,MentStats : pxresult[0]['MentStats']
    ,Equipment : pxresult[0]['Equipment']
    ,Site1 : pxresult[0]['Site1']
    ,Site1Set : pxresult[0]['Site1Set']
    ,Site2 : pxresult[0]['Site2']
    ,Site2Set : pxresult[0]['Site2Set']
    ,AntiEm : pxresult[0]['AntiEm']
    ,NurseScrub : pxresult[0]['NurseScrub']
    ,NurseCircu : pxresult[0]['NurseCircu']
    ,Position : pxresult[0]['Position']
  
  }

    });
  }; 

   $scope.LoadORIntraOp();

  $scope.addNew_ORIntraOp = function (frmORIntraOp) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORIntraOp' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,MentStats : frmORIntraOp.MentStats
      ,Equipment : frmORIntraOp.Equipment
      ,Site1 : frmORIntraOp.Site1
      ,Site1Set : frmORIntraOp.Site1Set
      ,Site2 : frmORIntraOp.Site2
      ,Site2Set : frmORIntraOp.Site2Set
      ,AntiEm : frmORIntraOp.AntiEm
      ,NurseScrub : frmORIntraOp.NurseScrub
      ,NurseCircu : frmORIntraOp.NurseCircu
      ,Position : frmORIntraOp.Position

    }
    $ipadrbg.context.jdata_ORIntraOp.add(newrecord);
    $ipadrbg.context.jdata_ORIntraOp.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORIntraOp();    
  }

  $scope.removeORIntraOp = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORIntraOp' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORIntraOp = [];
    }
  }

});
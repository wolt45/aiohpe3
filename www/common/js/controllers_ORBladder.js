IOHPEApp.controller('ORBladder_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORBladder = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORBladder = function(){
    var promise = $ipadrbg.context.jdata_ORBladder.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORBladder = pxresult;
      });

    $scope.ORBladder = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,FoleyBall : pxresult[0]['FoleyBall']
    ,CloseWound : pxresult[0]['CloseWound']
    ,PackingType : pxresult[0]['PackingType']
    ,AceWrap : pxresult[0]['AceWrap']
    
  }

    });
  }; 

   $scope.LoadORBladder();

  $scope.addNew_ORBladder = function (frmORMedHis) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORBladder' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,FoleyBall : frmORMedHis.FoleyBall
      ,CloseWound : frmORMedHis.CloseWound
      ,PackingType : frmORMedHis.PackingType
      ,AceWrap : frmORMedHis.AceWrap
      
    }
    $ipadrbg.context.jdata_ORBladder.add(newrecord);
    $ipadrbg.context.jdata_ORBladder.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORBladder();    
  }

  $scope.removeORBladder = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORBladder' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORsocialHabits = [];
    }
  }

});
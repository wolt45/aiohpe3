IOHPEApp.controller('ORSkinPrep_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORSkinPrep = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORSkinPrep = function(){
    var promise = $ipadrbg.context.jdata_ORSkinPrep.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORSkinPrep = pxresult;
      });

    $scope.ORSkinPrep = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SiteDef : pxresult[0]['SiteDef']
    ,Site : pxresult[0]['Site']
    ,NurstimeStart : pxresult[0]['NurstimeStart']
    ,NurstimeEnd : pxresult[0]['NurstimeEnd']
    ,CountOff : pxresult[0]['CountOff']
    ,CountOffCor : pxresult[0]['CountOffCor']
  
  }

    });
  }; 

   $scope.LoadORSkinPrep();

  $scope.addNew_ORSkinPrep = function (frmORSkinPrep) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORSkinPrep' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SiteDef : frmORSkinPrep.SiteDef
      ,Site : frmORSkinPrep.Site
      ,NurstimeStart : frmORSkinPrep.NurstimeStart
      ,NurstimeEnd : frmORSkinPrep.NurstimeEnd
      ,CountOff : frmORSkinPrep.CountOff
      ,CountOffCor : frmORSkinPrep.CountOffCor

    }
    $ipadrbg.context.jdata_ORSkinPrep.add(newrecord);
    $ipadrbg.context.jdata_ORSkinPrep.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORSkinPrep();    
  }

  $scope.removeORSkinPrep = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORSkinPrep' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORSkinPrep = [];
    }
  }

});
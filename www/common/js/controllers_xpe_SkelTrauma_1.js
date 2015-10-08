IOHPEApp.controller('SkelTrauma_1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SkelTrauma_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;



  $scope.LoadSkelTrauma1 = function(){
    var promise = $ipadrbg.context.jdata_SkelTrauma_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SkelTrauma_1 = pxresult;
      });

      $scope.SkelTrauma1 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,AppearanceNormal : pxresult[0]['AppearanceNormal']
        ,Deformity : pxresult[0]['Deformity']
        ,Skin : pxresult[0]['Skin']
        ,PainActiveMotion : pxresult[0]['PainActiveMotion']
        ,PainPassiveMotion : pxresult[0]['PainPassiveMotion']
        ,NeurologicStatus : pxresult[0]['NeurologicStatus']
        ,VascularStatus : pxresult[0]['VascularStatus']
        ,NeurologicVascularDes : pxresult[0]['NeurologicVascularDes']
      }
       

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadSkelTrauma1();

  $scope.addNew_SkelTrauma1 = function (frmObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_SkelTrauma_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,AppearanceNormal : frmObj.AppearanceNormal
      ,Deformity : frmObj.Deformity
      ,Skin : frmObj.Skin
      ,PainActiveMotion : frmObj.PainActiveMotion
      ,PainPassiveMotion : frmObj.PainPassiveMotion
      ,NeurologicStatus : frmObj.NeurologicStatus
      ,VascularStatus : frmObj.VascularStatus
      ,NeurologicVascularDes : frmObj.NeurologicVascularDes

    }
    $ipadrbg.context.jdata_SkelTrauma_1.add(newrecord);
    $ipadrbg.context.jdata_SkelTrauma_1.saveChanges();

    alert("Skeletal Trauma Data Saved!");

    $scope.LoadSkelTrauma1();
  }

  $scope.removeSkelTrauma1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SkelTrauma_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SkelTrauma = [];
    }
  }

});
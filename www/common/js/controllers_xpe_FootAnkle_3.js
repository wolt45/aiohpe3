IOHPEApp.controller('footAnkle_3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle3 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_3 = pxresult;
      });

    $scope.FootAnkle3 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Inspection : pxresult[0]['Inspection']
    ,RangeMotion : pxresult[0]['RangeMotion']
    ,RangeMotionDescript : pxresult[0]['RangeMotionDescript']
    ,MMT : pxresult[0]['MMT']
    ,MMTDescript : pxresult[0]['MMTDescript']
    ,Sensory : pxresult[0]['Sensory']
    ,SensoryDescript : pxresult[0]['SensoryDescript']
    ,Vascular : pxresult[0]['Vascular']
    ,VascularDescript : pxresult[0]['VascularDescript']
    ,AbsentPulseDescript : pxresult[0]['AbsentPulseDescript']
    ,VascularCapil : pxresult[0]['VascularCapil']

  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle3();

  $scope.addNew_FootAnkle3 = function (frmFootAnkle3) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_AnkleFoot_3'3WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Inspection : frmFootAnkle3.Inspection
      ,RangeMotion : frmFootAnkle3.RangeMotion
      ,RangeMotionDescript : frmFootAnkle3.RangeMotionDescript
      ,MMT : frmFootAnkle3.MMT
      ,MMTDescript : frmFootAnkle3.MMTDescript
      ,Sensory : frmFootAnkle3.Sensory
      ,SensoryDescript : frmFootAnkle3.SensoryDescript
      ,Vascular : frmFootAnkle3.Vascular
      ,VascularDescript : frmFootAnkle3.VascularDescript
      ,AbsentPulseDescript : frmFootAnkle3.AbsentPulseDescript
      ,VascularCapil : frmFootAnkle3.VascularCapil
  
    }
    $ipadrbg.context.jdata_FootAnkle_3.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_3.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle3();
  }

  $scope.removeFootAnkle3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle3 = [];
    }
  }

});
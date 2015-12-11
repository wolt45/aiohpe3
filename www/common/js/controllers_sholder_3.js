IOHPEApp.controller('shoulder_3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder3 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_3 = pxresult;
      });

    $scope.Sportsholder3 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Inspection : pxresult[0]['Inspection']
    ,RangeofMotion : pxresult[0]['RangeofMotion']
    ,RangeofMotionDescrip : pxresult[0]['RangeofMotionDescrip']
    ,MMT : pxresult[0]['MMT']
    ,MMTDescrip : pxresult[0]['MMTDescrip']
    ,Sensory : pxresult[0]['Sensory']
    ,SensoryDescrip : pxresult[0]['SensoryDescrip']
    ,Vascular : pxresult[0]['Vascular']
    ,VascularWeakPulseDescrip : pxresult[0]['VascularWeakPulseDescrip']
    ,VascularAbsentPulseDescrip : pxresult[0]['VascularAbsentPulseDescrip']
    ,VascularDescrip : pxresult[0]['VascularDescrip']
    ,VascularGoodPoor : pxresult[0]['VascularGoodPoor']

  }

    });
  }; 

   $scope.Loadshoulder3();

  $scope.addNew_shoulder3 = function (frmshoulder3) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Inspection : frmshoulder3.Inspection
      ,RangeofMotion : frmshoulder3.RangeofMotion
      ,RangeofMotionDescrip : frmshoulder3.RangeofMotionDescrip
      ,MMT : frmshoulder3.MMT
      ,MMTDescrip : frmshoulder3.MMTDescrip
      ,Sensory : frmshoulder3.Sensory
      ,SensoryDescrip : frmshoulder3.SensoryDescrip
      ,Vascular : frmshoulder3.Vascular
      ,VascularWeakPulseDescrip : frmshoulder3.VascularWeakPulseDescrip
      ,VascularAbsentPulseDescrip : frmshoulder3.VascularAbsentPulseDescrip
      ,VascularGoodPoor : frmshoulder3.VascularGoodPoor

    }
    $ipadrbg.context.jdata_shoulder_3.add(newrecord);
    $ipadrbg.context.jdata_shoulder_3.saveChanges();

    alert("Shoulder Data Saved!");

    $scope.Loadshoulder3();    
  }

  $scope.removeshoulder3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportsholder3 = [];
    }
  }

});
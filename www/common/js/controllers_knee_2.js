IOHPEApp.controller('knee_2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee2 = function(){
    var promise = $ipadrbg.context.jdata_Knee_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_2 = pxresult;
      });

    $scope.SportsKnee2 = {
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
    ,VascularWeakDescrip : pxresult[0]['VascularWeakDescrip']
    ,VascularAbsentDescrip : pxresult[0]['VascularAbsentDescrip']
    ,VascularGoodPoor : pxresult[0]['VascularGoodPoor']
  
  }

    });
  }; 

  $scope.LoadKnee2();

  $scope.addNew_Knee2 = function (frmknee2) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Inspection : frmknee2.Inspection
      ,RangeofMotion : frmknee2.RangeofMotion
      ,RangeofMotionDescrip : frmknee2.RangeofMotionDescrip
      ,MMT : frmknee2.MMT
      ,MMTDescrip : frmknee2.MMTDescrip
      ,Sensory : frmknee2.Sensory
      ,SensoryDescrip : frmknee2.SensoryDescrip
      ,Vascular : frmknee2.Vascular
      ,VascularWeakDescrip : frmknee2.VascularWeakDescrip
      ,VascularAbsentDescrip : frmknee2.VascularAbsentDescrip
      ,VascularGoodPoor : frmknee2.VascularGoodPoor

    }
    $ipadrbg.context.jdata_Knee_2.add(newrecord);
    $ipadrbg.context.jdata_Knee_2.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee2();    
  }

  $scope.removeKnee2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee2 = [];
    }
  }

});
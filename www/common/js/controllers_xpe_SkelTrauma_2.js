IOHPEApp.controller('SkelTrauma_2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SkelTrauma_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadSkelTrauma2 = function(){
    var promise = $ipadrbg.context.jdata_SkelTrauma_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SkelTrauma_2 = pxresult;
      });

      $scope.SkelTrauma2 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,ApproXraysOrderedSpine : pxresult[0]['ApproXraysOrderedSpine']
        ,ApproXraysOrderedHumerus : pxresult[0]['ApproXraysOrderedHumerus']
        ,ApproXraysOrderedRadiusUlna : pxresult[0]['ApproXraysOrderedRadiusUlna']
        ,ApproXraysOrderedShoulder : pxresult[0]['ApproXraysOrderedShoulder']
        ,ApproXraysOrderedElbows : pxresult[0]['ApproXraysOrderedElbows']
        ,ApproXraysOrderedWrist : pxresult[0]['ApproXraysOrderedWrist']
        ,ApproXraysOrderedHand : pxresult[0]['ApproXraysOrderedHand']
        ,ApproXraysOrderedPelvis : pxresult[0]['ApproXraysOrderedPelvis']
        ,ApproXraysOrderedHip : pxresult[0]['ApproXraysOrderedHip']
        ,ApproXraysOrderedKnee : pxresult[0]['ApproXraysOrderedKnee']
        ,ApproXraysOrderedTibia : pxresult[0]['ApproXraysOrderedTibia']
        ,ApproXraysOrderedAnkle : pxresult[0]['ApproXraysOrderedAnkle']
        ,ApproXraysOrderedFoot : pxresult[0]['ApproXraysOrderedFoot']
        ,XrayFindDate : pxresult[0]['XrayFindDate']
        ,NormalAbnormal : pxresult[0]['NormalAbnormal']
        ,Fracture : pxresult[0]['Fracture']
        ,SiteShaft : pxresult[0]['SiteShaft']
        ,Dislocation : pxresult[0]['Dislocation']
      }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadSkelTrauma2();

  $scope.addNew_SkelTrauma2 = function (frmSkelTrauma2) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_SkelTrauma_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,ApproXraysOrderedSpine : frmSkelTrauma2.ApproXraysOrderedSpine
      ,ApproXraysOrderedHumerus : frmSkelTrauma2.ApproXraysOrderedHumerus
      ,ApproXraysOrderedRadiusUlna : frmSkelTrauma2.ApproXraysOrderedRadiusUlna
      ,ApproXraysOrderedShoulder : frmSkelTrauma2.ApproXraysOrderedShoulder
      ,ApproXraysOrderedElbows : frmSkelTrauma2.ApproXraysOrderedElbows
      ,ApproXraysOrderedWrist : frmSkelTrauma2.ApproXraysOrderedWrist
      ,ApproXraysOrderedHand : frmSkelTrauma2.ApproXraysOrderedHand
      ,ApproXraysOrderedPelvis : frmSkelTrauma2.ApproXraysOrderedPelvis
      ,ApproXraysOrderedHip : frmSkelTrauma2.ApproXraysOrderedHip
      ,ApproXraysOrderedKnee : frmSkelTrauma2.ApproXraysOrderedKnee
      ,ApproXraysOrderedTibia : frmSkelTrauma2.ApproXraysOrderedTibia
      ,ApproXraysOrderedAnkle : frmSkelTrauma2.ApproXraysOrderedAnkle
      ,ApproXraysOrderedFoot : frmSkelTrauma2.ApproXraysOrderedFoot
      ,XrayFindDate : frmSkelTrauma2.XrayFindDate
      ,NormalAbnormal : frmSkelTrauma2.NormalAbnormal
      ,Fracture : frmSkelTrauma2.Fracture
      ,SiteShaft : frmSkelTrauma2.SiteShaft
      ,Dislocation : frmSkelTrauma2.Dislocation
    }
    $ipadrbg.context.jdata_SkelTrauma_2.add(newrecord);
    $ipadrbg.context.jdata_SkelTrauma_2.saveChanges();

    alert("Skeletal Trauma Data Saved!");

    $scope.LoadSkelTrauma2();
  }

  $scope.removeSkelTrauma2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SkelTrauma_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SkelTrauma2 = [];
    }
  }

});
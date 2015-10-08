IOHPEApp.controller('gen_orth2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho2 = function(){
    var promise = $ipadrbg.context.jdata_genotho_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_2 = pxresult;
      });

    $scope.genortho2 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Hip : pxresult[0]['Hip']
    ,Knee : pxresult[0]['Knee']
    ,LeftHand : pxresult[0]['LeftHand']
    ,RightHand : pxresult[0]['RightHand']
    ,ShoulLeft : pxresult[0]['ShoulLeft']
    ,ShoulRight : pxresult[0]['ShoulRight']
    ,ElbowLeft : pxresult[0]['ElbowLeft']
    ,ElbowRight : pxresult[0]['ElbowRight']
    ,AnkleLeft : pxresult[0]['AnkleLeft']
    ,AnkleRight : pxresult[0]['AnkleRight']
    ,WristLeft : pxresult[0]['WristLeft']
    ,WristRight : pxresult[0]['WristRight']
    ,FootLeft : pxresult[0]['FootLeft']
    ,FootRight : pxresult[0]['FootRight']
    ,Spine : pxresult[0]['Spine']
    ,Pelvis : pxresult[0]['Pelvis']
    ,Humerus : pxresult[0]['Humerus']
    ,RadiusUlna : pxresult[0]['RadiusUlna']
    ,Tibia : pxresult[0]['Tibia']
    ,Ferum : pxresult[0]['Ferum']

  
  }

    });
  }; 

   $scope.Loadgenortho2();

  $scope.addNew_genortho2 = function (frmgenortho2) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Hip : frmgenortho2.Hip
      ,Knee : frmgenortho2.Knee
      ,LeftHand : frmgenortho2.LeftHand
      ,RightHand : frmgenortho2.RightHand
      ,ShoulLeft : frmgenortho2.ShoulLeft
      ,ShoulRight : frmgenortho2.ShoulRight
      ,ElbowLeft : frmgenortho2.ElbowLeft
      ,ElbowRight : frmgenortho2.ElbowRight
      ,AnkleLeft : frmgenortho2.AnkleLeft
      ,AnkleRight : frmgenortho2.AnkleRight
      ,WristLeft : frmgenortho2.WristLeft
      ,WristRight : frmgenortho2.WristRight
      ,FootLeft : frmgenortho2.FootLeft
      ,FootRight : frmgenortho2.FootRight
      ,Spine : frmgenortho2.Spine
      ,Pelvis : frmgenortho2.Pelvis
      ,Humerus : frmgenortho2.Humerus
      ,RadiusUlna : frmgenortho2.RadiusUlna
      ,Tibia : frmgenortho2.Tibia
      ,Ferum : frmgenortho2.Ferum

    }
    $ipadrbg.context.jdata_genotho_2.add(newrecord);
    $ipadrbg.context.jdata_genotho_2.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadgenortho2();    
  }

  $scope.removegenortho2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho2 = [];
    }
  }

});
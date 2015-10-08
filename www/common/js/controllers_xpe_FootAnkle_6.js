IOHPEApp.controller('footAnkle_6_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_6 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle6 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_6.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_6 = pxresult;
      });

    $scope.FootAnkle6 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,DorsalisPedisArtery : pxresult[0]['DorsalisPedisArtery']
    ,DorsalisPedisArteryDescrip : pxresult[0]['DorsalisPedisArteryDescrip']
    
    ,PosteriorPedisArteryDescrip : pxresult[0]['PosteriorPedisArteryDescrip']
    ,PosteriorPedisArtery : pxresult[0]['PosteriorPedisArtery']
    
    ,Color : pxresult[0]['Color']
    ,SpecialTestNormal : pxresult[0]['SpecialTestNormal']
    
    ,Tinel : pxresult[0]['Tinel']
    ,TinelDescrip : pxresult[0]['TinelDescrip']
    
    ,AnteriorDrawer : pxresult[0]['AnteriorDrawer']
    ,AnteriorDrawerDescript : pxresult[0]['AnteriorDrawerDescript']
    
    ,PosteriorDrawer : pxresult[0]['PosteriorDrawer']
    ,PosteriorDrawerDescrip : pxresult[0]['PosteriorDrawerDescrip']

    ,InversionStress : pxresult[0]['InversionStress']
    ,InversionStressDescrip : pxresult[0]['InversionStressDescrip']

    ,ERS : pxresult[0]['ERS']
    ,ERSDescript : pxresult[0]['ERSDescript']

    ,Thompson : pxresult[0]['Thompson']
    ,ThompsonDescrip : pxresult[0]['ThompsonDescrip']

    ,Homan : pxresult[0]['Homan']
    ,HomanDescrip : pxresult[0]['HomanDescrip']

    ,Squeeze : pxresult[0]['Squeeze']
    ,SqueezeDescrip : pxresult[0]['SqueezeDescrip']

    ,ToeLegStance : pxresult[0]['ToeLegStance']
    ,ToeLegStanceDescrip : pxresult[0]['ToeLegStanceDescrip']

    ,STLStance : pxresult[0]['STLStance']
    ,STLStanceDescrip : pxresult[0]['STLStanceDescrip']

    ,SpecialTestOthersDescrip : pxresult[0]['SpecialTestOthersDescrip']

  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle6();

  $scope.addNew_FootAnkle6 = function (frmFootAnkle6) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_6' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,DorsalisPedisArtery : frmFootAnkle6.DorsalisPedisArtery
      ,DorsalisPedisArteryDescrip : frmFootAnkle6.DorsalisPedisArteryDescrip

      ,PosteriorPedisArtery : frmFootAnkle6.PosteriorPedisArtery
      ,PosteriorPedisArteryDescrip : frmFootAnkle6.PosteriorPedisArteryDescrip

      ,Color : frmFootAnkle6.Color
      
      ,SpecialTestNormal : frmFootAnkle6.SpecialTestNormal

      ,Tinel : frmFootAnkle6.Tinel
      ,TinelDescrip : frmFootAnkle6.TinelDescrip

      ,AnteriorDrawer : frmFootAnkle6.AnteriorDrawer
      ,AnteriorDrawerDescript : frmFootAnkle6.AnteriorDrawerDescript

      ,PosteriorDrawer : frmFootAnkle6.PosteriorDrawer
      ,PosteriorDrawerDescrip : frmFootAnkle6.PosteriorDrawerDescrip

      ,InversionStress : frmFootAnkle6.InversionStress
      ,InversionStressDescrip : frmFootAnkle6.InversionStressDescrip

      ,ERS : frmFootAnkle6.ERS
      ,ERSDescript : frmFootAnkle6.ERSDescript

      ,Thompson : frmFootAnkle6.Thompson
      ,ThompsonDescrip : frmFootAnkle6.ThompsonDescrip

      ,Homan : frmFootAnkle6.Homan
      ,HomanDescrip : frmFootAnkle6.HomanDescrip

      ,Squeeze : frmFootAnkle6.Squeeze
      ,SqueezeDescrip : frmFootAnkle6.SqueezeDescrip

      ,ToeLegStance : frmFootAnkle6.ToeLegStance
      ,ToeLegStanceDescrip : frmFootAnkle6.ToeLegStanceDescrip

      ,STLStance : frmFootAnkle6.STLStance
      ,STLStanceDescrip : frmFootAnkle6.STLStanceDescrip

      ,SpecialTestOthersDescrip : frmFootAnkle6.SpecialTestOthersDescrip

    }
    $ipadrbg.context.jdata_FootAnkle_6.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_6.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle6();
  }

  $scope.removeFootAnkle6 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_6' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle6 = [];
    }
  }

});
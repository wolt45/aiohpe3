IOHPEApp.controller('footAnkle_5_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_5 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle5 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_5.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_5 = pxresult;
      });

    $scope.FootAnkle5 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,FootAnkle : pxresult[0]['FootAnkle']

    ,DorsiflexionMotion : pxresult[0]['DorsiflexionMotion']
    ,DorsiflexionPassive : pxresult[0]['DorsiflexionPassive']
    ,DorsiflexionPain : pxresult[0]['DorsiflexionPain']
    ,DorsiflexionCrepitation : pxresult[0]['DorsiflexionCrepitation']
    ,DorsiflexionMMT : pxresult[0]['DorsiflexionMMT']

    ,PlantarflexionMotion : pxresult[0]['PlantarflexionMotion']
    ,PlantarflexionPassive : pxresult[0]['PlantarflexionPassive']
    ,PlantarflexionPain : pxresult[0]['PlantarflexionPain']
    ,PlantarflexionCrepitation : pxresult[0]['PlantarflexionCrepitation']
    ,PlantarflexionMMT : pxresult[0]['PlantarflexionMMT']

    ,InversionMotion : pxresult[0]['InversionMotion']
    ,InversionPassive : pxresult[0]['InversionPassive']
    ,InversionPain : pxresult[0]['InversionPain']
    ,InversionCrepitation : pxresult[0]['InversionCrepitation']
    ,InversionMMT : pxresult[0]['InversionMMT']

    ,EversionMotion : pxresult[0]['EversionMotion']
    ,EversionPassive : pxresult[0]['EversionPassive']
    ,EversionPain : pxresult[0]['EversionPain']
    ,EversionCrepitation : pxresult[0]['EversionCrepitation']
    ,EversionMMT : pxresult[0]['EversionMMT']

    ,ToeFlexionMotion : pxresult[0]['ToeFlexionMotion']
    ,ToeFlexionPassive : pxresult[0]['ToeFlexionPassive']
    ,ToeFlexionPain : pxresult[0]['ToeFlexionPain']
    ,ToeFlexionCrepitation : pxresult[0]['ToeFlexionCrepitation']
    ,ToeFlexionMMT : pxresult[0]['ToeFlexionMMT']

    ,ToeExtensionMotion : pxresult[0]['ToeFlexionMotion']
    ,ToeExtensionPassive : pxresult[0]['ToeFlexionPassive']
    ,ToeExtensionPain : pxresult[0]['ToeExtensionPain']
    ,ToeExtensionCrepitation : pxresult[0]['ToeExtensionCrepitation']
    ,ToeExtensionMMT : pxresult[0]['ToeFlexionMMT']

  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle5();

  $scope.addNew_FootAnkle5 = function (frmFootAnkle5) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_5' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,FootAnkle : frmFootAnkle5.FootAnkle

      ,DorsiflexionMotion : frmFootAnkle5.DorsiflexionMotion
      ,DorsiflexionPassive : frmFootAnkle5.DorsiflexionPassive
      ,DorsiflexionPain : frmFootAnkle5.DorsiflexionPain
      ,DorsiflexionCrepitation : frmFootAnkle5.DorsiflexionCrepitation
      ,DorsiflexionMMT : frmFootAnkle5.DorsiflexionMMT

      ,PlantarflexionMotion : frmFootAnkle5.PlantarflexionMotion
      ,PlantarflexionPassive : frmFootAnkle5.PlantarflexionPassive
      ,PlantarflexionPain : frmFootAnkle5.PlantarflexionPain
      ,PlantarflexionCrepitation : frmFootAnkle5.PlantarflexionCrepitation
      ,PlantarflexionMMT : frmFootAnkle5.PlantarflexionMMT

      ,InversionMotion : frmFootAnkle5.InversionMotion
      ,InversionPassive : frmFootAnkle5.InversionPassive
      ,InversionPain : frmFootAnkle5.InversionPain
      ,InversionCrepitation : frmFootAnkle5.InversionCrepitation
      ,InversionMMT : frmFootAnkle5.InversionMMT

      ,EversionMotion : frmFootAnkle5.EversionMotion
      ,EversionPassive : frmFootAnkle5.EversionPassive
      ,EversionPain : frmFootAnkle5.EversionPain
      ,EversionCrepitation : frmFootAnkle5.EversionCrepitation
      ,EversionMMT : frmFootAnkle5.EversionMMT

      ,ToeFlexionMotion : frmFootAnkle5.ToeFlexionMotion
      ,ToeFlexionPassive : frmFootAnkle5.ToeFlexionPassive
      ,ToeFlexionPain : frmFootAnkle5.ToeFlexionPain
      ,ToeFlexionCrepitation : frmFootAnkle5.ToeFlexionCrepitation
      ,ToeFlexionMMT : frmFootAnkle5.ToeFlexionMMT

      ,ToeExtensionMotion : frmFootAnkle5.ToeExtensionMotion
      ,ToeExtensionPassive : frmFootAnkle5.ToeExtensionPassive
      ,ToeExtensionPain : frmFootAnkle5.ToeExtensionPain
      ,ToeExtensionCrepitation : frmFootAnkle5.ToeExtensionCrepitation
      ,ToeExtensionMMT : frmFootAnkle5.ToeExtensionMMT

    }
    $ipadrbg.context.jdata_FootAnkle_5.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_5.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle5();
  }

  $scope.removeFootAnkle5 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_5' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle5 = [];
    }
  }

});
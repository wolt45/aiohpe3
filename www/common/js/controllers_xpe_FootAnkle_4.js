IOHPEApp.controller('footAnkle_4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_4 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle4 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_4 = pxresult;
      });

    $scope.FootAnkle4 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,FootAnkle : pxresult[0]['FootAnkle']
    ,LeftRight : pxresult[0]['LeftRight']
    ,Deformity : pxresult[0]['Deformity']
    ,DeforDetails : pxresult[0]['DeforDetails']
    ,Erythema : pxresult[0]['Erythema']
    ,ErythemaDetails : pxresult[0]['ErythemaDetails']
    ,OpenWound : pxresult[0]['OpenWound']
    ,OpenWoundDetails : pxresult[0]['OpenWoundDetails']
    ,Swelling : pxresult[0]['Swelling']
    ,SwellingDetails : pxresult[0]['SwellingDetails']
    ,Hematoma : pxresult[0]['Hematoma']
    ,HematomaDetails : pxresult[0]['HematomaDetails']
    ,MuscleAtrophy : pxresult[0]['MuscleAtrophy']
    ,MuscleAtrophyDetails : pxresult[0]['MuscleAtrophyDetails']
    ,Mass : pxresult[0]['Mass']
    ,MassTender : pxresult[0]['MassTender']
    ,MassNontender : pxresult[0]['MassNontender']
    ,MassMoveable : pxresult[0]['MassMoveable']
    ,MassFixed : pxresult[0]['MassFixed']
    ,MassRegular : pxresult[0]['MassRegular']
    ,MassIrregular : pxresult[0]['MassIrregular']
    ,Masslymphadenopathy : pxresult[0]['Masslymphadenopathy']
    ,MassSize : pxresult[0]['MassSize']
    ,MassLocation : pxresult[0]['MassLocation']
    ,MassConsistency : pxresult[0]['MassConsistency']
    ,Deformities : pxresult[0]['Deformities']
    ,Palpitation : pxresult[0]['Palpitation']
    ,PalpitationDescrip : pxresult[0]['PalpitationDescrip']
    ,SensoryNormal : pxresult[0]['SensoryNormal']
    ,L4 : pxresult[0]['L4']
    ,L5 : pxresult[0]['L5']
    ,S1 : pxresult[0]['S1']
    ,Lateralplantarnerve : pxresult[0]['Lateralplantarnerve']
    ,LateralplantarnerveDetails : pxresult[0]['LateralplantarnerveDetails']
    ,Medialplantarnerve : pxresult[0]['Medialplantarnerve']
    ,MedialplantarnerveDetails : pxresult[0]['MedialplantarnerveDetails']
    ,Peronealnerve : pxresult[0]['Peronealnerve']
    ,PeronealnerveDetails : pxresult[0]['PeronealnerveDetails']
    ,Tibialnerve : pxresult[0]['Tibialnerve']
    ,TibialnerveDetails : pxresult[0]['TibialnerveDetails']

  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle4();

  $scope.addNew_FootAnkle4 = function (frmFootAnkle4) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_4' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,FootAnkle : frmFootAnkle4.FootAnkle
      ,LeftRight : frmFootAnkle4.LeftRight
      ,Deformity : frmFootAnkle4.Deformity
      ,DeforDetails : frmFootAnkle4.DeforDetails
      ,Erythema : frmFootAnkle4.Erythema
      ,ErythemaDetails : frmFootAnkle4.ErythemaDetails
      ,OpenWound : frmFootAnkle4.OpenWound
      ,OpenWoundDetails : frmFootAnkle4.OpenWoundDetails
      ,Swelling : frmFootAnkle4.Swelling
      ,SwellingDetails : frmFootAnkle4.SwellingDetails
      ,Hematoma : frmFootAnkle4.Hematoma
      ,HematomaDetails : frmFootAnkle4.HematomaDetails
      ,MuscleAtrophy : frmFootAnkle4.MuscleAtrophy
      ,MuscleAtrophyDetails : frmFootAnkle4.MuscleAtrophyDetails
      ,Mass : frmFootAnkle4.Mass
      ,MassTender : frmFootAnkle4.MassTender
      ,MassNontender : frmFootAnkle4.MassNontender
      ,MassMoveable : frmFootAnkle4.MassMoveable
      ,MassFixed : frmFootAnkle4.MassFixed
      ,MassRegular : frmFootAnkle4.MassRegular
      ,MassIrregular : frmFootAnkle4.MassIrregular
      ,Masslymphadenopathy : frmFootAnkle4.Masslymphadenopathy
      ,MassSize : frmFootAnkle4.MassSize
      ,MassLocation : frmFootAnkle4.MassLocation
      ,Masslymphadenopathy : frmFootAnkle4.Masslymphadenopathy
      ,MassConsistency : frmFootAnkle4.MassConsistency
      ,Deformities : frmFootAnkle4.Deformities
      ,Palpitation : frmFootAnkle4.Palpitation
      ,PalpitationDescrip : frmFootAnkle4.PalpitationDescrip
      ,SensoryNormal : frmFootAnkle4.SensoryNormal
      ,L4 : frmFootAnkle4.L4
      ,L5 : frmFootAnkle4.L5
      ,S1 : frmFootAnkle4.L5
      ,Lateralplantarnerve : frmFootAnkle4.Lateralplantarnerve
      ,LateralplantarnerveDetails : frmFootAnkle4.LateralplantarnerveDetails
      ,Medialplantarnerve : frmFootAnkle4.Medialplantarnerve
      ,MedialplantarnerveDetails : frmFootAnkle4.MedialplantarnerveDetails
      ,Peronealnerve : frmFootAnkle4.Peronealnerve
      ,PeronealnerveDetails : frmFootAnkle4.PeronealnerveDetails
      ,Tibialnerve : frmFootAnkle4.Tibialnerve
      ,TibialnerveDetails : frmFootAnkle4.TibialnerveDetails

    }
    $ipadrbg.context.jdata_FootAnkle_4.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_4.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle4();
  }

  $scope.removeFootAnkle4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle4 = [];
    }
  }

});
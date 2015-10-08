IOHPEApp.controller('knee_3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee3 = function(){
    var promise = $ipadrbg.context.jdata_Knee_3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_3 = pxresult;
      });

    $scope.SportsKnee3= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SensoryLeftRight : pxresult[0]['SensoryLeftRight']
    ,Deformity : pxresult[0]['Deformity']
    ,DeformitySel : pxresult[0]['DeformitySel']
    ,DeformityDefinition : pxresult[0]['DeformityDefinition']
    ,Sensory : pxresult[0]['Sensory']
    ,SensoryDescrip : pxresult[0]['SensoryDescrip']
    ,Erythema : pxresult[0]['Erythema']
    ,ErythemaSel : pxresult[0]['ErythemaSel']
    ,ErythemaDescrip : pxresult[0]['ErythemaDescrip']
    ,OpenWound : pxresult[0]['OpenWound']
    ,OpenWoundSel : pxresult[0]['OpenWoundSel']
    ,OpenWoundDescrip : pxresult[0]['OpenWoundDescrip']
    ,Swelling : pxresult[0]['Swelling']
    ,SwellingSel : pxresult[0]['SwellingSel']
    ,SwellingDescrip : pxresult[0]['SwellingDescrip']
    ,Hematoma : pxresult[0]['Hematoma']
    ,HematomaSel : pxresult[0]['HematomaSel']
    ,HematomaDescrip : pxresult[0]['HematomaDescrip']
    ,MuscleAtropy : pxresult[0]['MuscleAtropy']
    ,MuscleAtropySel : pxresult[0]['MuscleAtropySel']
    ,MuscleAtropyDescrip : pxresult[0]['MuscleAtropyDescrip']
    ,Mass : pxresult[0]['Mass']
    ,MassSel : pxresult[0]['MassSel']
    ,MuscleAtropyDescrip : pxresult[0]['MuscleAtropyDescrip']
    ,Masstender : pxresult[0]['Masstender']
    ,Massmoveable : pxresult[0]['Massmoveable']
    ,Massfixed : pxresult[0]['Massfixed']
    ,Massregular : pxresult[0]['Massregular']
    ,Masslymphadenopathy : pxresult[0]['Masslymphadenopathy']
    ,MassSize : pxresult[0]['MassSize']
    ,MassLocation : pxresult[0]['MassLocation']
    ,MassConsistency : pxresult[0]['MassConsistency']
    ,Deformities : pxresult[0]['Deformities']
    ,Palpitation : pxresult[0]['Palpitation']
    ,SensoryNormal : pxresult[0]['SensoryNormal']
    ,L3Normal : pxresult[0]['L3Normal']
    ,L3Hypoaesthesia : pxresult[0]['L3Hypoaesthesia']
    ,L3Hyperaesthesia : pxresult[0]['L3Hyperaesthesia']
    ,L3Paresthesia : pxresult[0]['L3Paresthesia']
    ,L4Normal : pxresult[0]['L4Normal']
    ,L4Hypoaesthesia : pxresult[0]['L4Hypoaesthesia']
    ,L4Hyperaesthesia : pxresult[0]['L4Hyperaesthesia']
    ,L4Paresthesia : pxresult[0]['L4Paresthesia']
    ,L5Normal : pxresult[0]['L5Normal']
    ,L5Hypoaesthesia : pxresult[0]['L5Hypoaesthesia']
    ,L5Hyperaesthesia : pxresult[0]['L5Hyperaesthesia']
    ,L5Paresthesia : pxresult[0]['L5Paresthesia']
    ,S1Normal : pxresult[0]['S1Normal']
    ,S1Hypoaesthesia : pxresult[0]['S1Hypoaesthesia']
    ,S1Hyperaesthesia : pxresult[0]['S1Hyperaesthesia']
    ,S1Paresthesia : pxresult[0]['S1Paresthesia']
    ,Superficialperoncaln : pxresult[0]['Superficialperoncaln']
    ,SuperficialperoncalnDescrip : pxresult[0]['SuperficialperoncalnDescrip']
    ,Deepperonealn : pxresult[0]['Deepperonealn']
    ,DeepperonealnDescrip : pxresult[0]['DeepperonealnDescrip']
    ,Tibialnerve : pxresult[0]['Tibialnerve']
    ,TibialnerveDescrip : pxresult[0]['TibialnerveDescrip']

    }

    });
  }; 

   $scope.LoadKnee3();

  $scope.addNew_Knee3 = function (frmknee3) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SensoryLeftRight : frmknee3.SensoryLeftRight
      ,Deformity : frmknee3.Deformity
      ,DeformitySel : frmknee3.DeformitySel
      ,DeformityDefinition : frmknee3.DeformityDefinition
      ,Sensory : frmknee3.Sensory
      ,SensoryDescrip : frmknee3.SensoryDescrip
      ,Erythema : frmknee3.Erythema
      ,ErythemaSel : frmknee3.ErythemaSel
      ,ErythemaDescrip : frmknee3.ErythemaDescrip
      ,OpenWound : frmknee3.OpenWound
      ,OpenWoundSel : frmknee3.OpenWoundSel
      ,OpenWoundDescrip : frmknee3.OpenWoundDescrip
      ,Swelling : frmknee3.Swelling
      ,SwellingSel : frmknee3.SwellingSel
      ,SwellingDescrip : frmknee3.SwellingDescrip
      ,Hematoma : frmknee3.Hematoma
      ,HematomaSel : frmknee3.HematomaSel
      ,HematomaDescrip : frmknee3.HematomaDescrip
      ,MuscleAtropy : frmknee3.MuscleAtropy
      ,MuscleAtropySel : frmknee3.MuscleAtropySel
      ,MuscleAtropyDescrip : frmknee3.MuscleAtropyDescrip
      ,Mass : frmknee3.Mass
      ,MassSel : frmknee3.MassSel
      ,MuscleAtropyDescrip : frmknee3.MuscleAtropyDescrip
      ,Masstender : frmknee3.Masstender
      ,Massmoveable : frmknee3.Massmoveable
      ,Massfixed : frmknee3.Massfixed
      ,Massregular : frmknee3.Massregular
      ,Masslymphadenopathy : frmknee3.Masslymphadenopathy
      ,MassSize : frmknee3.MassSize
      ,MassLocation : frmknee3.MassLocation
      ,MassConsistency : frmknee3.MassConsistency
      ,Deformities : frmknee3.Deformities
      ,Palpitation : frmknee3.Palpitation
      ,SensoryNormal : frmknee3.SensoryNormal
      ,L3Normal : frmknee3.L3Normal
      ,L3Hypoaesthesia : frmknee3.L3Hypoaesthesia
      ,L3Hyperaesthesia : frmknee3.L3Hyperaesthesia
      ,L3Paresthesia : frmknee3.L3Paresthesia
      ,L4Normal : frmknee3.L4Normal
      ,L4Hypoaesthesia : frmknee3.L4Hypoaesthesia
      ,L4Hyperaesthesia : frmknee3.L4Hyperaesthesia
      ,L4Paresthesia : frmknee3.L4Paresthesia
      ,L5Normal : frmknee3.L5Normal
      ,L5Hypoaesthesia : frmknee3.L5Hypoaesthesia
      ,L5Hyperaesthesia : frmknee3.L5Hyperaesthesia
      ,L5Paresthesia : frmknee3.L5Paresthesia
      ,S1Normal : frmknee3.S1Normal
      ,S1Hypoaesthesia : frmknee3.S1Hypoaesthesia
      ,S1Hyperaesthesia : frmknee3.S1Hyperaesthesia
      ,S1Paresthesia : frmknee3.S1Paresthesia
      ,Superficialperoncaln : frmknee3.Superficialperoncaln
      ,SuperficialperoncalnDescrip : frmknee3.SuperficialperoncalnDescrip
      ,Deepperonealn : frmknee3.Deepperonealn
      ,DeepperonealnDescrip : frmknee3.DeepperonealnDescrip
      ,Tibialnerve : frmknee3.Tibialnerve
      ,TibialnerveDescrip : frmknee3.TibialnerveDescrip

    }
    $ipadrbg.context.jdata_Knee_3.add(newrecord);
    $ipadrbg.context.jdata_Knee_3.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee3();    
  }

  $scope.removeKnee3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee3 = [];
    }
  }

});
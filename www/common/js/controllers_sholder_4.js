IOHPEApp.controller('shoulder_4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_4 = [];
  
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder4 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_4 = pxresult;
      });

    $scope.Sportsholder4 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SensoryRightLeft : pxresult[0]['SensoryRightLeft']
    ,Deformity : pxresult[0]['Deformity']
    ,DeformityValue : pxresult[0]['DeformityValue']
    ,DeformityDescrip : pxresult[0]['DeformityDescrip']
    ,Erythema : pxresult[0]['Erythema']
    ,ErythemaValue : pxresult[0]['ErythemaValue']
    ,ErythemaValueDescrip : pxresult[0]['ErythemaValueDescrip']
    ,OpenWound : pxresult[0]['OpenWound']
    ,OpenWoundValue : pxresult[0]['OpenWoundValue']
    ,OpenWoundDescrip : pxresult[0]['OpenWoundDescrip']
    ,Swelling : pxresult[0]['Swelling']
    ,SwellingValue : pxresult[0]['SwellingValue']
    ,SwellingDescrip : pxresult[0]['SwellingDescrip']
    ,Hematoma : pxresult[0]['Hematoma']
    ,HematomaValue : pxresult[0]['HematomaValue']
    ,HematomaDescrip : pxresult[0]['HematomaDescrip']
    ,Muscleatropy : pxresult[0]['Muscleatropy']
    ,MuscleatropyValue : pxresult[0]['MuscleatropyValue']
    ,MuscleatropyDescrip : pxresult[0]['MuscleatropyDescrip']
    ,Mass : pxresult[0]['Mass']
    ,MassValue : pxresult[0]['MassValue']
    ,Masstender : pxresult[0]['Masstender']
    ,Massnontender : pxresult[0]['Massnontender']
    ,Massmoveable : pxresult[0]['Massmoveable']
    ,Massfixed : pxresult[0]['Massfixed']
    ,Massregular : pxresult[0]['Massregular']
    ,Massirregular : pxresult[0]['Massirregular']
    ,Masslymphadenopathy : pxresult[0]['Masslymphadenopathy']
    ,MassSize : pxresult[0]['MassSize']
    ,MassLocation : pxresult[0]['MassLocation']
    ,MassConsistency : pxresult[0]['MassConsistency']
    ,Palpitation : pxresult[0]['Palpitation']
    ,SensoryNormal : pxresult[0]['SensoryNormal']
    ,C5 : pxresult[0]['C5']
    ,C6 : pxresult[0]['C6']
    ,C7 : pxresult[0]['C7']
    ,C8 : pxresult[0]['C8']
    ,T1 : pxresult[0]['T1']
    ,Ulnarnervevalue : pxresult[0]['Ulnarnervevalue']
    ,UlnarnervevalueDescrip : pxresult[0]['UlnarnervevalueDescrip']
    ,MedialnerveValue : pxresult[0]['MedialnerveValue']
    ,MedialnerveDescrip : pxresult[0]['MedialnerveDescrip']
    ,RadialnerveValue : pxresult[0]['RadialnerveValue']
    ,RadialnerveDescrip : pxresult[0]['RadialnerveDescrip']
    ,MusculocutaneousnValue : pxresult[0]['MusculocutaneousnValue']
    ,MusculocutaneousDescrip : pxresult[0]['MusculocutaneousDescrip']
    ,AxillaryNerveValue : pxresult[0]['AxillaryNerveValue']
    ,AxillaryNerveDescrip : pxresult[0]['AxillaryNerveDescrip']
    ,SubscapularNerveValue : pxresult[0]['SubscapularNerveValue']
    ,SubscapularDescrip : pxresult[0]['SubscapularDescrip']
    ,SupraspinousNerveValue : pxresult[0]['SupraspinousNerveValue']
    ,SupraspinousNerveDescrip : pxresult[0]['SupraspinousNerveDescrip']

  }

    });
  }; 

   $scope.Loadshoulder4();

  $scope.addNew_shoulder4 = function (frmshoulder4) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_4' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SensoryRightLeft : frmshoulder4.SensoryRightLeft
      ,Deformity : frmshoulder4.Deformity
      ,DeformityValue : frmshoulder4.DeformityValue
      ,DeformityDescrip : frmshoulder4.DeformityDescrip
      ,Erythema : frmshoulder4.Erythema
      ,ErythemaValue : frmshoulder4.ErythemaValue
      ,ErythemaValueDescrip : frmshoulder4.ErythemaValueDescrip
      ,OpenWound : frmshoulder4.OpenWound
      ,OpenWoundValue : frmshoulder4.OpenWoundValue
      ,OpenWoundDescrip : frmshoulder4.OpenWoundDescrip
      ,Swelling : frmshoulder4.Swelling
      ,SwellingValue : frmshoulder4.SwellingValue
      ,SwellingDescrip : frmshoulder4.SwellingDescrip
      ,Hematoma : frmshoulder4.Hematoma
      ,HematomaValue : frmshoulder4.HematomaValue
      ,HematomaDescrip : frmshoulder4.HematomaDescrip
      ,Muscleatropy : frmshoulder4.Muscleatropy
      ,MuscleatropyValue : frmshoulder4.MuscleatropyValue
      ,MuscleatropyDescrip : frmshoulder4.MuscleatropyDescrip
      ,Mass : frmshoulder4.Mass
      ,MassValue : frmshoulder4.MassValue
      ,Masstender : frmshoulder4.Masstender
      ,Massmoveable : frmshoulder4.Massmoveable
      ,Massfixed : frmshoulder4.Massfixed
      ,Massregular : frmshoulder4.Massregular
      ,Massirregular : frmshoulder4.Massirregular
      ,Masslymphadenopathy : frmshoulder4.Masslymphadenopathy
      ,MassSize : frmshoulder4.MassSize
      ,MassLocation : frmshoulder4.MassLocation
      ,MassConsistency : frmshoulder4.MassConsistency
      ,Palpitation : frmshoulder4.Palpitation
      ,SensoryNormal : frmshoulder4.SensoryNormal
      ,C5: frmshoulder4.C5
      ,C6 : frmshoulder4.C6
      ,C7 : frmshoulder4.C7
      ,C8 : frmshoulder4.C8
      ,T1 : frmshoulder4.T1
      ,Ulnarnervevalue : frmshoulder4.Ulnarnervevalue
      ,UlnarnervevalueDescrip : frmshoulder4.UlnarnervevalueDescrip
      ,MedialnerveValue : frmshoulder4.MedialnerveValue
      ,MedialnerveDescrip : frmshoulder4.MedialnerveDescrip
      ,RadialnerveValue : frmshoulder4.RadialnerveValue
      ,RadialnerveDescrip : frmshoulder4.RadialnerveDescrip
      ,MusculocutaneousnValue : frmshoulder4.MusculocutaneousnValue
      ,MusculocutaneousDescrip : frmshoulder4.MusculocutaneousDescrip
      ,AxillaryNerveValue : frmshoulder4.AxillaryNerveValue
      ,AxillaryNerveDescrip : frmshoulder4.AxillaryNerveDescrip
      ,SubscapularNerveValue : frmshoulder4.SubscapularNerveValue
      ,SubscapularDescrip : frmshoulder4.SubscapularDescrip
      ,SupraspinousNerveValue : frmshoulder4.SupraspinousNerveValue
      ,SupraspinousNerveDescrip : frmshoulder4.SupraspinousNerveDescrip
     

    }
    $ipadrbg.context.jdata_shoulder_4.add(newrecord);
    $ipadrbg.context.jdata_shoulder_4.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadshoulder4();    
  }

  $scope.removeshoulder4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportsholder4 = [];
    }
  }

});
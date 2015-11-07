IOHPEApp.controller('shoulder_5_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_5 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder5 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_5.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_5 = pxresult;
      });

    $scope.Sportsholder5 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,ShoulderFullLimited : pxresult[0]['ShoulderFullLimited']
    
    ,DorsiflexionPass : pxresult[0]['DorsiflexionPass']
    ,DorsiflexionActiv : pxresult[0]['DorsiflexionActiv']
    ,DorsiflexionWidthPain : pxresult[0]['DorsiflexionWidthPain']
    ,DorsiflexionCrepitation : pxresult[0]['DorsiflexionCrepitation']
    ,DorsiflexionMMT : pxresult[0]['DorsiflexionMMT']

    ,FlexionPassive : pxresult[0]['FlexionPassive']
    ,FlexionActive : pxresult[0]['FlexionActive']
    ,FlexionWithPain : pxresult[0]['FlexionWithPain']
    ,FlexionCrepitation : pxresult[0]['FlexionCrepitation']
    ,FlexionMMT : pxresult[0]['FlexionMMT']

    ,ExtensionPassive : pxresult[0]['ExtensionPassive']
    ,ExtensionActive : pxresult[0]['ExtensionActive']
    ,ExtensionWithPain : pxresult[0]['ExtensionWithPain']
    ,ExtensionCrepitation : pxresult[0]['ExtensionCrepitation']
    ,ExtensionMMT : pxresult[0]['ExtensionMMT']

    ,AbductionPassive : pxresult[0]['AbductionPassive']
    ,AbductionActive : pxresult[0]['AbductionActive']
    ,AbductionWithPain : pxresult[0]['AbductionWithPain']
    ,AbductionCrepitation : pxresult[0]['AbductionCrepitation']
    ,AbductionMMT : pxresult[0]['AbductionMMT']

    ,AdductionPassive : pxresult[0]['AdductionPassive']
    ,AdductionActive : pxresult[0]['AdductionActive']
    ,AdductionWithPain : pxresult[0]['AdductionWithPain']
    ,AdductionCrepitation : pxresult[0]['AdductionCrepitation']
    ,AdductionMMT : pxresult[0]['AdductionMMT']

    ,IRPassive : pxresult[0]['IRPassive']
    ,IRActive : pxresult[0]['IRActive']
    ,IRWithPain : pxresult[0]['IRWithPain']
    ,IRCrepitation : pxresult[0]['IRCrepitation']
    ,IRMMT : pxresult[0]['IRMMT']

    ,ERPassive : pxresult[0]['ERPassive']
    ,ERActive : pxresult[0]['ERActive']
    ,ERWithPain : pxresult[0]['ERWithPain']
    ,ERCrepitation : pxresult[0]['ERCrepitation']
    ,ERMMT : pxresult[0]['ERMMT']

  }

    });
  }; 

   $scope.Loadshoulder5();

  $scope.addNew_shoulder5 = function (frmshoulder5) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_5' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,ShoulderFullLimited : frmshoulder5.ShoulderFullLimited
      
      ,DorsiflexionPass : frmshoulder5.DorsiflexionPass
      ,DorsiflexionActiv : frmshoulder5.DorsiflexionActiv
      ,DorsiflexionWidthPain : frmshoulder5.DorsiflexionWidthPain
      ,DorsiflexionCrepitation : frmshoulder5.DorsiflexionCrepitation
      ,DorsiflexionMMT : frmshoulder5.DorsiflexionMMT
      
      ,FlexionPassive : frmshoulder5.FlexionPassive
      ,FlexionActive : frmshoulder5.FlexionActive
      ,FlexionWithPain : frmshoulder5.FlexionWithPain
      ,FlexionCrepitation : frmshoulder5.FlexionCrepitation
      ,FlexionMMT : frmshoulder5.FlexionMMT

      ,ExtensionPassive : frmshoulder5.ExtensionPassive
      ,ExtensionActive : frmshoulder5.ExtensionActive
      ,ExtensionWithPain : frmshoulder5.ExtensionPassive
      ,ExtensionCrepitation : frmshoulder5.ExtensionCrepitation
      ,ExtensionMMT : frmshoulder5.ExtensionMMT

      ,AbductionPassive : frmshoulder5.AbductionPassive
      ,AbductionActive : frmshoulder5.AbductionActive
      ,AbductionWithPain : frmshoulder5.AbductionWithPain
      ,AbductionCrepitation : frmshoulder5.AbductionCrepitation
      ,AbductionMMT : frmshoulder5.AbductionMMT

      ,AdductionPassive : frmshoulder5.AdductionPassive
      ,AdductionActive : frmshoulder5.AdductionActive
      ,AdductionWithPain : frmshoulder5.AdductionWithPain
      ,AdductionCrepitation : frmshoulder5.AdductionCrepitation
      ,AdductionMMT : frmshoulder5.AdductionMMT

      ,IRPassive : frmshoulder5.IRPassive
      ,IRActive : frmshoulder5.IRActive
      ,IRWithPain : frmshoulder5.IRWithPain
      ,IRCrepitation : frmshoulder5.IRCrepitation
      ,IRMMT : frmshoulder5.IRMMT

      ,ERPassive : frmshoulder5.ERPassive
      ,ERActive : frmshoulder5.ERActive
      ,ERWithPain : frmshoulder5.ERWithPain
      ,ERCrepitation : frmshoulder5.ERCrepitation
      ,ERMMT : frmshoulder5.ERMMT 

    }
    $ipadrbg.context.jdata_shoulder_5.add(newrecord);
    $ipadrbg.context.jdata_shoulder_5.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadshoulder5();    
  }

  $scope.removeshoulder5 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_5' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportsholder5 = [];
    }
  }

});
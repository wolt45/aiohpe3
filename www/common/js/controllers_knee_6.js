IOHPEApp.controller('knee_6_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_6 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee6 = function(){
    var promise = $ipadrbg.context.jdata_Knee_6.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_6 = pxresult;
      });

    $scope.SportsKnee6= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SpecialTestNormal : pxresult[0]['SpecialTestNormal']
    ,Lachmans : pxresult[0]['Lachmans']
    ,LachmansGrade : pxresult[0]['LachmansGrade']
    ,PivotShift : pxresult[0]['PivotShift']
    ,PivotShiftGrade : pxresult[0]['PivotShiftGrade']
    ,Anteriordrawers : pxresult[0]['Anteriordrawers']
    ,AnteriordrawersGrade : pxresult[0]['AnteriordrawersGrade']
    ,BrachialArtery : pxresult[0]['BrachialArtery']
    ,McMurray : pxresult[0]['McMurray']
    ,McMurrayPain : pxresult[0]['McMurrayPain']
    ,McMurrayClick : pxresult[0]['McMurrayClick']
    ,Apley : pxresult[0]['Apley']
    ,ApleyPain : pxresult[0]['ApleyPain']
    ,ApleyClick : pxresult[0]['ApleyClick']
    ,ReverseMcMurray : pxresult[0]['ReverseMcMurray']
    ,ReverseMcMurrayPain : pxresult[0]['ReverseMcMurrayPain']
    ,ReverseMcMurrayClick : pxresult[0]['ReverseMcMurrayClick']
    ,Apprehension : pxresult[0]['Apprehension']
    ,ApprehensionGrade : pxresult[0]['ApprehensionGrade']
    ,Patellartilt : pxresult[0]['Patellartilt']
    ,Patellargrind : pxresult[0]['Patellargrind']
    ,Patellarcomprehension : pxresult[0]['Patellarcomprehension']
    ,Ballotement : pxresult[0]['Ballotement']
    ,Varusinstability : pxresult[0]['Varusinstability']
    ,VarusinstabilityPain : pxresult[0]['VarusinstabilityPain']
    ,Valgusinstability : pxresult[0]['Valgusinstability']
    ,ValgusinstabilityPain : pxresult[0]['ValgusinstabilityPain']
    ,Dialtest : pxresult[0]['Dialtest']
    ,Externalrotationstresstest : pxresult[0]['Externalrotationstresstest']
    ,Thessaly : pxresult[0]['Thessaly']
    ,Ege : pxresult[0]['Ege']
    ,SpecialtestOthers : pxresult[0]['SpecialtestOthers']


    }

    });
  }; 

   $scope.LoadKnee6();

  $scope.addNew_Knee6 = function (frmknee6) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_6' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SpecialTestNormal : frmknee6.SpecialTestNormal
      ,Lachmans : frmknee6.Lachmans
      ,LachmansGrade : frmknee6.LachmansGrade
      ,PivotShift : frmknee6.PivotShift
      ,PivotShiftGrade : frmknee6.PivotShiftGrade
      ,Anteriordrawers : frmknee6.Anteriordrawers
      ,AnteriordrawersGrade : frmknee6.AnteriordrawersGrade
      ,BrachialArtery : frmknee6.BrachialArtery
      ,McMurray : frmknee6.McMurray
      ,McMurrayPain : frmknee6.McMurrayPain
      ,McMurrayClick : frmknee6.McMurrayClick
      ,Apley : frmknee6.Apley
      ,ApleyPain : frmknee6.ApleyPain
      ,ApleyClick : frmknee6.ApleyClick
      ,ReverseMcMurray : frmknee6.ReverseMcMurray
      ,ReverseMcMurrayPain : frmknee6.ReverseMcMurrayPain
      ,ReverseMcMurrayClick : frmknee6.ReverseMcMurrayClick
      ,Apprehension : frmknee6.Apprehension
      ,ApprehensionGrade : frmknee6.ApprehensionGrade
      ,Patellartilt : frmknee6.Patellartilt
      ,Patellargrind : frmknee6.Patellargrind
      ,Patellarcomprehension : frmknee6.Patellarcomprehension
      ,Ballotement : frmknee6.Ballotement
      ,Varusinstability : frmknee6.Varusinstability
      ,VarusinstabilityPain : frmknee6.VarusinstabilityPain
      ,Valgusinstability : frmknee6.Valgusinstability
      ,ValgusinstabilityPain : frmknee6.ValgusinstabilityPain
      ,Dialtest : frmknee6.Dialtest
      ,Externalrotationstresstest : frmknee6.Externalrotationstresstest
      ,Thessaly : frmknee6.Thessaly
      ,Ege : frmknee6.Ege
      ,SpecialtestOthers : frmknee6.SpecialtestOthers

    }
    $ipadrbg.context.jdata_Knee_6.add(newrecord);
    $ipadrbg.context.jdata_Knee_6.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee6();    
  }

  $scope.removeKnee6 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_6' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee6 = [];
    }
  }

});
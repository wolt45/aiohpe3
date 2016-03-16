IOHPEApp.controller('ODICtrl', function ($scope, $routeParams, $http){
  $scope.jdata_ODI = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.parseInt = parseInt;
  
  $scope.LoadODI = function(){
    var promise = $ipadrbg.context.jdata_ODI.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ODI = pxresult;
      });

    $scope.ODImod = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Chronic : pxresult[0]['Chronic']
    ,SurgeryDay : pxresult[0]['SurgeryDay']
    ,PainIntensity : pxresult[0]['PainIntensity']
    ,PersonalCare : pxresult[0]['PersonalCare']
    ,Lifting : pxresult[0]['Lifting']
    ,Walking : pxresult[0]['Walking']
    ,Sitting : pxresult[0]['Sitting']
    ,Standing : pxresult[0]['Standing']
    ,Sleeping : pxresult[0]['Sleeping']
    ,SexLife : pxresult[0]['SexLife']
    ,SocialLife : pxresult[0]['SocialLife']
    ,Traveling : pxresult[0]['Traveling']
  
  }

    });
  }; 

   $scope.LoadODI();

  $scope.addNewODI = function (frmgenortho1) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ODI' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Chronic : frmgenortho1.Chronic
      ,SurgeryDay : frmgenortho1.SurgeryDay
      ,PainIntensity : frmgenortho1.PainIntensity
      ,PersonalCare : frmgenortho1.PersonalCare
      ,Lifting : frmgenortho1.Lifting
      ,Walking : frmgenortho1.Walking
      ,Sitting : frmgenortho1.Sitting
      ,Standing : frmgenortho1.Standing
      ,Sleeping : frmgenortho1.Sleeping
      ,SexLife : frmgenortho1.SexLife
      ,SocialLife : frmgenortho1.SocialLife
      ,Traveling : frmgenortho1.Traveling

    }
    $ipadrbg.context.jdata_ODI.add(newrecord);
    $ipadrbg.context.jdata_ODI.saveChanges();

    alert("ODI Data Saved!");

    $scope.LoadODI();    
  }

  $scope.removeODI = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ODI' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ODImod = [];
    }
  }

});
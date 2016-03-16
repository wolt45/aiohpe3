IOHPEApp.controller('ORPotenProb_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORPotProb = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORPotenProb = function(){
    var promise = $ipadrbg.context.jdata_ORPotProb.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORPotProb = pxresult;
      });

    $scope.ORPotenProb = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,PotentProb : pxresult[0]['PotentProb']
    ,Transport : pxresult[0]['Transport']
    ,TransReco : pxresult[0]['TransReco']
    ,SupportDev : pxresult[0]['SupportDev']
    ,MentalStats : pxresult[0]['MentalStats']
    ,MentalStatsOth : pxresult[0]['MentalStatsOth']
    ,IntraOp : pxresult[0]['IntraOp']
  
  }

    });
  }; 

   $scope.LoadORPotenProb();

  $scope.addNew_ORPotProb = function (frmORPotenProb) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORPotProb' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PotentProb : frmORPotenProb.PotentProb
      ,Transport : frmORPotenProb.Transport
      ,TransReco : frmORPotenProb.TransReco
      ,SupportDev : frmORPotenProb.SupportDev
      ,MentalStats : frmORPotenProb.MentalStats
      ,MentalStatsOth : frmORPotenProb.MentalStatsOth
      ,IntraOp : frmORPotenProb.IntraOp

    }
    $ipadrbg.context.jdata_ORPotProb.add(newrecord);
    $ipadrbg.context.jdata_ORPotProb.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORPotenProb();    
  }

  $scope.removeORPotProb = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORPotProb' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORPotenProb = [];
    }
  }

});
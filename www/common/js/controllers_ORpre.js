IOHPEApp.controller('ORpreOp_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORpreOp = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORpreOP = function(){
    var promise = $ipadrbg.context.jdata_ORpreOp.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORpreOp = pxresult;
      });

    $scope.ORpre = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SelectAge : pxresult[0]['SelectAge']
    ,NPOIns : pxresult[0]['NPOIns']
    ,FoodDrinkTime : pxresult[0]['FoodDrinkTime']
    ,HistoryAnesComp : pxresult[0]['HistoryAnesComp']
  
  }

    });
  }; 

   $scope.LoadORpreOP();

  $scope.addNew_ORpreOp = function (frmORpreOp) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORpreOp' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SelectAge : frmORpreOp.SelectAge
      ,NPOIns : frmORpreOp.NPOIns
      ,FoodDrinkTime : frmORpreOp.FoodDrinkTime
      ,HistoryAnesComp : frmORpreOp.HistoryAnesComp

    }
    $ipadrbg.context.jdata_ORpreOp.add(newrecord);
    $ipadrbg.context.jdata_ORpreOp.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORpreOP();    
  }

  $scope.removeORpreOp = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORpreOp' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORpre = [];
    }
  }

});
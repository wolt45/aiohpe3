IOHPEApp.controller('footAnkle_2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle2 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_2 = pxresult;
      });

    $scope.FootAnkle2 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Ambulation : pxresult[0]['Ambulation']
    ,Sensorium : pxresult[0]['Sensorium']
    ,Conjunctivae : pxresult[0]['Conjunctivae']
    ,ChestExpansion : pxresult[0]['ChestExpansion']
    ,Cardiac : pxresult[0]['Cardiac']
    ,Abdomen : pxresult[0]['Abdomen']
  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle2();

  $scope.addNew_FootAnkle2 = function (frmFootAnkle2) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_AnkleFoot_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Ambulation : frmFootAnkle2.Ambulation
      ,Sensorium : frmFootAnkle2.Sensorium
      ,Conjunctivae : frmFootAnkle2.Conjunctivae
      ,ChestExpansion : frmFootAnkle2.ChestExpansion
      ,Cardiac : frmFootAnkle2.Cardiac
      ,Abdomen : frmFootAnkle2.Abdomen
  
    }
    $ipadrbg.context.jdata_FootAnkle_2.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_2.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle2();
  }

  $scope.removeFootAnkle2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle2 = [];
    }
  }

});
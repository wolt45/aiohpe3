IOHPEApp.controller('footAnkle_9_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_9 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle9 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_9.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_9 = pxresult;
      });

    $scope.FootAnkle9 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Assessment : pxresult[0]['Assessment']
    ,Management : pxresult[0]['Management']
    ,Disposition : pxresult[0]['Disposition']
  
  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle9();

  $scope.addNew_FootAnkle9 = function (frmFootAnkle9) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_9' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Assessment : frmFootAnkle9.Assessment
      ,Management : frmFootAnkle9.Management
      ,Disposition : frmFootAnkle9.Disposition

    }
    $ipadrbg.context.jdata_FootAnkle_9.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_9.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle9();    
  }

  $scope.removeFootAnkle9 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_9' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle9 = [];
    }
  }

});
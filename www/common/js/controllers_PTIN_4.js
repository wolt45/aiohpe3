IOHPEApp.controller('PT4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PT4 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadPT4 = function(){
    var promise = $ipadrbg.context.jdata_PT4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_PT4 = pxresult;
      });

          $scope.PT4 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,LandMark : pxresult[0]['LandMark']
          ,RightMeasurement : pxresult[0]['RightMeasurement']
          ,LeftMeasurement : pxresult[0]['LeftMeasurement']
          ,Difference : pxresult[0]['Difference']
        
       }

    });
  }; 

   $scope.LoadPT4();

  $scope.addNew_PT4 = function (frmPT4) {
    
     if(frmPT4.PTRID== null) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,LandMark : frmPT4.LandMark
        ,RightMeasurement : frmPT4.RightMeasurement
        ,LeftMeasurement : frmPT4.LeftMeasurement
        ,Difference : frmPT4.Difference
      }
      $ipadrbg.context.jdata_PT4.add(newrecord);
    }
    else
    { 
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("UPDATE 'jdata_PT4' SET LandMark = '" + frmPT4.LandMark 
            + "', RightMeasurement = '" + frmPT4.RightMeasurement 
            + "', LeftMeasurement = '" + frmPT4.LeftMeasurement
            + "', Difference = '" + frmPT4.Difference 
            + "' WHERE PTRID = " + frmPT4.PTRID);
    });

    }
   
    $ipadrbg.context.jdata_PT4.saveChanges();

    alert("PT Initial Interview Data Saved!");

    $scope.LoadPT4();      
  }

$scope.editPT4_ROW = function (PTRID, LandMark, Right, Left, Difference) {
    $scope.PT4.PTRID = PTRID;
    $scope.PT4.LandMark = LandMark;
    $scope.PT4.RightMeasurement = RightMeasurement;
    $scope.PT4.LeftMeasurement = LeftMeasurement;
    $scope.PT4.Difference = Difference;
  }

  $scope.removePT4_ROW = function (PTRID) {
    if (confirm(PTRID + ': Are you sure to Delete this Physical Theraphy data? ')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_PT4' WHERE PTRID = " + PTRID);
      });
      //$ipadrbg.context.clinix_Diagnosis.saveChanges();
      $scope.LoadPT4();
    }
  } 

  $scope.removePT4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PT4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.PT4 = [];
    }
  }

});
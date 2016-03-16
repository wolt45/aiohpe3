IOHPEApp.controller('ORSocHab2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORSocHab2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORSocHab2 = function(){
    var promise = $ipadrbg.context.jdata_ORSocHab2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORSocHab2 = pxresult;
      });

    $scope.ORSocHabNot2 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Name : pxresult[0]['Name']
    ,Dose : pxresult[0]['Dose']
    ,Route : pxresult[0]['Route']
    ,Frequency : pxresult[0]['Frequency']
  
  }

    });
  }; 

   $scope.LoadORSocHab2();





  $scope.addNew_ORSocHab2 = function (frmORSocHab2) {
    
    // var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    // db.transaction(function (tx) {
    //     tx.executeSql("delete from 'jdata_ORSocHab2' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    // });

    if(frmORSocHab2.ORRID== null) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID
        ,Name : frmORSocHab2.Name
        ,Dose : frmORSocHab2.Dose
        ,Route : frmORSocHab2.Route
        ,Frequency : frmORSocHab2.Frequency
      }
      $ipadrbg.context.jdata_ORSocHab2.add(newrecord);
    }
    else {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("UPDATE 'jdata_ORSocHab2' SET Name = '" + frmORSocHab2.Name 
            + "', Dose = '" + frmORSocHab2.Dose 
            + "', Route = '" + frmORSocHab2.Route 
            + "', Frequency = '" + frmORSocHab2.Frequency +"' WHERE ORRID = " + frmORSocHab2.ORRID);
      });


    }
    $ipadrbg.context.jdata_ORSocHab2.saveChanges();

    //alert("Diagnosis Data Saved!");

    $scope.LoadORSocHab2();
  }


$scope.removeORSocHab2_ROW = function (ORSocHab) {
    if (confirm(ORSocHab + ': Are you sure to Delete this Diagnosis data? ')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_ORSocHab2' WHERE ORRID = " + ORSocHab);
      });
      //$ipadrbg.context.clinix_Diagnosis.saveChanges();
      $scope.LoadORSocHab2();
    }
  } 

  $scope.editORSocHab2_ROW = function (ORRID, Name, Dose, Route, Frequency) {
    $scope.ORSocHab2.ORRID = ORRID;
    $scope.ORSocHab2.Name = Name;
    $scope.ORSocHab2.Dose = Dose;
    $scope.ORSocHab2.Route = Route;
    $scope.ORSocHab2.Frequency = Frequency;
  }





  $scope.removeORSocHab2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORSocHab2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORSocHabNot2 = [];
    }
  }

});
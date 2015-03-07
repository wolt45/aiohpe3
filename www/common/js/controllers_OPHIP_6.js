IOHPEApp.controller('OPHIP_6Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_6 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHHIP_6 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_6.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_6 = pxresult;
      });
    });
  };

  $scope.LoadOPHHIP_6();

  $scope.addNew = function (frmObj) {
    if (frmObj.BloodLoss) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Operative Blood Loass'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Blood Loass"
        ,OperValue  : frmObj.BloodLoss
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.Closure) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Closure'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Closure"
        ,OperValue  : frmObj.Closure
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.CompressionDressings) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Compression Dressings'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID


        ,Operative : "Compression Dressings"
        ,OperValue  : frmObj.CompressionDressings
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.OperativeCourse) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Operative Course'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Course"
        ,OperValue  : frmObj.OperativeCourse
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.Findings) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Operative Findings'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Findings"
        ,OperValue  : frmObj.Findings
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.Diagnosis) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'POST Operative Diagnosis'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "POST Operative Diagnosis"
        ,OperValue  : frmObj.Diagnosis
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.OpDuratiion) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Duration of Operation'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Duration of Operation"
        ,OperValue  : frmObj.OpDuratiion
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.TEDS) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'TED Stockings'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "TED Stockings"
        ,OperValue  : frmObj.TEDS
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.XRays) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'X-Rays'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "X-Rays"
        ,OperValue  : frmObj.XRays
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    if (frmObj.Others) {
      
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_6' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND  Operative = 'Others'");
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Others"
        ,OperValue  : frmObj.Others
      }
      $ipadrbg.context.jdata_OPHIP_6.add(newrecord);
    }

    $ipadrbg.context.jdata_OPHIP_6.saveChanges();

    frmObj.BloodLoss = "";
    frmObj.Closure = "";
    frmObj.OperativeCourse = "";
    frmObj.Findings = "";
    frmObj.Diagnosis = "";
    frmObj.OpDuratiion = "";
    frmObj.XRays = "";
    frmObj.Others = "";

    $scope.LoadOPHHIP_6();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPHIP_6;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});
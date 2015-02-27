IOHPEApp.controller('DiagsManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagsManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsMgmt = function(){
    var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsManagement = pxresult;
      });
    });
  };

  $scope.LoadDiagsMgmt();

  $scope.addNew = function (daignosisObj) {

    if (daignosisObj.ManagementDetail2 ) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
          + " AND Management ='Physical Therapy'" );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management2
        ,ManagementDetail  : daignosisObj.ManagementDetail2
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }

    if (daignosisObj.ManagementDetail3A) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
          + " AND ManagementDetail ='Foot and Ankle'" );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management3
        ,ManagementDetail  : daignosisObj.ManagementDetail3A
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }
    if (daignosisObj.ManagementDetail3B) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
          + " AND ManagementDetail ='Quads and Hamstrings'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management3
        ,ManagementDetail  : daignosisObj.ManagementDetail3B
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }
    if (daignosisObj.ManagementDetail3C) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
          + " AND ManagementDetail ='SLR'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management3
        ,ManagementDetail  : daignosisObj.ManagementDetail3C
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }


    if (daignosisObj.ManagementDetail4 ) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
          + " AND Management ='Ambulatory Trainings'" );
      });
      
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : daignosisObj.Management4
        ,ManagementDetail  : daignosisObj.ManagementDetail4
      }
      $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    }

    $ipadrbg.context.clinix_DiagsManagement.saveChanges();

    daignosisObj.Management1z = "";
    daignosisObj.ManagementDetail1 = "";
    daignosisObj.Management2z = "";
    daignosisObj.ManagementDetail2 = "";
    daignosisObj.Management3z = "";
    daignosisObj.ManagementDetail3A = "";
    daignosisObj.ManagementDetail3B = "";
    daignosisObj.ManagementDetail3C = "";
    daignosisObj.Management4z = "";
    daignosisObj.ManagementDetail4 = "";

    $scope.LoadDiagsMgmt();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagsManagement;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
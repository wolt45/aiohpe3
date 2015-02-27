IOHPEApp.controller('StructuredManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadStructuredMgmt = function(){
    var promise = $ipadrbg.context.clinix_StructuredManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredManagement = pxresult;
      });
    });
  };

  $scope.LoadStructuredMgmt(); 

  $scope.addNew = function (formArrObj) {

    if (formArrObj.ManagementDetail2 ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Physical Therapy'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management2
        ,ManagementDetail  : formArrObj.ManagementDetail2
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    if ( formArrObj.DetlA || formArrObj.DetlB || formArrObj.DetlC || formArrObj.DetlD ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Exercise program'"
            );
      });

      var Detail3 = (formArrObj.DetlA ? formArrObj.DetlA + ", " : "")
        + (formArrObj.DetlB ? formArrObj.DetlB + ", " : "")
        + (formArrObj.DetlC ? formArrObj.DetlC + ", " : "")
        + (formArrObj.DetlD ? formArrObj.DetlD + ", " : "") ;

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Exercise program"
        ,ManagementDetail  : Detail3
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    if (formArrObj.ManagementDetail4 ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Ambulatory Aid'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : formArrObj.Management4
        ,ManagementDetail  : formArrObj.ManagementDetail4
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    if (formArrObj.Shower ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Shower'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Shower"
        ,ManagementDetail  : formArrObj.Shower
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    if (formArrObj.TEDS ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'TED Stockings'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "TED Stockings"
        ,ManagementDetail  : formArrObj.TEDS
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }


    if (formArrObj.Notes ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Instructions/Notes'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Instructions/Notes"
        ,ManagementDetail  : formArrObj.Notes
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }

    if (formArrObj.Follow ) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("DELETE from 'clinix_StructuredManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID
            + " AND Management = 'Follow-up'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Management        : "Follow-up"
        ,ManagementDetail  : formArrObj.Follow
      }
      $ipadrbg.context.clinix_StructuredManagement.add(newrecord);
    }

    $ipadrbg.context.clinix_StructuredManagement.saveChanges();

    formArrObj.Management1z = "";
    formArrObj.ManagementDetail1 = "";
    formArrObj.Management2z = "";
    formArrObj.ManagementDetail2 = "";
    formArrObj.Management3z = "";
    
    formArrObj.DetlA = "";
    formArrObj.DetlB = "";
    formArrObj.DetlC = "";
    formArrObj.DetlD = "";

    formArrObj.Management4z = "";
    formArrObj.ManagementDetail4 = "";

    formArrObj.TEDS  = "";
    formArrObj.Shower = "";
    formArrObj.Notes = "";
    formArrObj.Follow = "";

    $scope.LoadStructuredMgmt();
  }

  $scope.removeItem = function (formArrObj) {
    formArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredManagement;
         diagol.splice(diagol.indexOf(formArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
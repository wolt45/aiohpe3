IOHPEApp.controller('HipMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipMotionRange = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipMotionRange = function(){
    var promise = $ipadrbg.context.clinix_HipMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMotionRange = pxresult;
      });
    });
  };

  $scope.LoadHipMotionRange();

  $scope.addNew = function (hipMotionRange) {
    if (hipMotionRange.RightFlexionContra) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Flexion Contracture'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion Contracture"
        ,MotionAreaVal    : hipMotionRange.RightFlexionContra
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.RightFlexion) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Flexion'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion"
        ,MotionAreaVal    : hipMotionRange.RightFlexion
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.RightExtension) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Extension'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Extension"
        ,MotionAreaVal    : hipMotionRange.RightExtension
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.IRRight) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'IR'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "IR"
        ,MotionAreaVal    : hipMotionRange.IRRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.ERRight) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'ER'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "ER"
        ,MotionAreaVal    : hipMotionRange.ERRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.supineRight) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Abduction(supine)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Abduction(supine)"
        ,MotionAreaVal    : hipMotionRange.supineRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.lateralRight) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Abduction(lateral)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Abduction(lateral)"
        ,MotionAreaVal    : hipMotionRange.lateralRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.AdductionRight) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'Adduction'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Adduction"
        ,MotionAreaVal    : hipMotionRange.AdductionRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    // SLR RIGHT
    if (hipMotionRange.SLR_Ryn || hipMotionRange.SLRValR) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'SLR (right)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR (right)"
        ,YN       : hipMotionRange.SLR_Ryn
        ,MotionAreaVal    : hipMotionRange.SLRValR
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    // SLR LEFT
    if (hipMotionRange.SLR_Lyn || hipMotionRange.SLRValL) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'SLR (left)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR (left)"
        ,YN       : hipMotionRange.SLR_Lyn
        ,MotionAreaVal     : hipMotionRange.SLRValL
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.Resist_Ryn) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'SLR vs Resistance (right)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR vs Resistance (right)"
        ,YN     : hipMotionRange.Resist_Ryn
        ,MotionAreaVal    : hipMotionRange.ResistRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.Resist_Lyn) {
      
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID
            + " AND MotionArea = 'SLR vs Resistance (left)'" );
      });
    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR vs Resistance (left)"
        ,YN     : hipMotionRange.Resist_Lyn
        ,MotionAreaVal    : hipMotionRange.ResistLeft
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    $ipadrbg.context.clinix_HipMotionRange.saveChanges();

    hipMotionRange.RightFlexionContra = "";
    hipMotionRange.RightFlexion = "";
    hipMotionRange.RightExtension = "";
    hipMotionRange.IRRight = "";
    hipMotionRange.ERRight = "";
    hipMotionRange.supineRight = "";
    hipMotionRange.lateralRight = "";
    hipMotionRange.AdductionRight = "";
      
    hipMotionRange.SLR_Ryn = "";
    hipMotionRange.SLRValR = "";
    hipMotionRange.SLR_Lyn = "";
    hipMotionRange.SLRValL = "";
       
    hipMotionRange.Resist_Ryn = "";
    hipMotionRange.ResistRight = "";

    hipMotionRange.Resist_Lyn = "";
    hipMotionRange.ResistLeft = "";
       
    $scope.LoadHipMotionRange();
  }

  $scope.removeHipMotionRange = function (hipMotionRange) {
    hipMotionRange.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipMotio = $scope.clinix_HipMotionRange;
         hipMotio.splice(hipMotio.indexOf(hipMotionRange), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});
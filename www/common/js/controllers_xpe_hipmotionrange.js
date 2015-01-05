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
    if (hipMotionRange.LeftFlexionContra || hipMotionRange.RightFlexionContra) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion Contracture"
        ,Left     : hipMotionRange.LeftFlexionContra
        ,Right    : hipMotionRange.RightFlexionContra
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.LeftFlexion || hipMotionRange.RightFlexion) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion"
        ,Left     : hipMotionRange.LeftFlexion
        ,Right    : hipMotionRange.RightFlexion
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.LeftExtension || hipMotionRange.RightExtension) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Extension"
        ,Left     : hipMotionRange.LeftExtension
        ,Right    : hipMotionRange.RightExtension
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.IRLeft || hipMotionRange.IRRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "IR"
        ,Left     : hipMotionRange.IRLeft
        ,Right    : hipMotionRange.IRRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.ERLeft || hipMotionRange.ERRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "ER"
        ,Left     : hipMotionRange.ERLeft
        ,Right    : hipMotionRange.ERRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.supineLeft || hipMotionRange.supineRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Abduction(supine)"
        ,Left     : hipMotionRange.supineLeft
        ,Right    : hipMotionRange.supineRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.lateralLeft || hipMotionRange.lateralRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Abduction(lateral)"
        ,Left     : hipMotionRange.lateralLeft
        ,Right    : hipMotionRange.lateralRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.AdductionLeft || hipMotionRange.AdductionRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Adduction"
        ,Left     : hipMotionRange.AdductionLeft
        ,Right    : hipMotionRange.AdductionRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.SLRLeft || hipMotionRange.SLRRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR"
        ,Left     : hipMotionRange.SLRLeft
        ,Right    : hipMotionRange.SLRRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    if (hipMotionRange.ResistLeft || hipMotionRange.ResistRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "SLR vs Resistance"
        ,Left     : hipMotionRange.ResistLeft
        ,Right    : hipMotionRange.ResistRight
      }
      $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    }

    $ipadrbg.context.clinix_HipMotionRange.saveChanges();

    hipMotionRange.LeftFlexionContra = "";
    hipMotionRange.RightFlexionContra = "";
    hipMotionRange.LeftFlexion = "";
    hipMotionRange.RightFlexion = "";

    hipMotionRange.LeftExtension = "";
    hipMotionRange.RightExtension = "";

    hipMotionRange.IRLeft = "";
    hipMotionRange.IRRight = "";

    hipMotionRange.ERLeft = "";
    hipMotionRange.ERRight = "";

    hipMotionRange.supineLeft = "";
    hipMotionRange.supineRight = "";
    
    hipMotionRange.lateralLeft = "";
    hipMotionRange.lateralRight = "";
    
    hipMotionRange.AdductionLeft = "";
    hipMotionRange.AdductionRight = "";
      
    hipMotionRange.SLRLeft = "";
    hipMotionRange.SLRRight = "";
       
    hipMotionRange.ResistLeft = "";
    hipMotionRange.ResistRight = "";
       
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
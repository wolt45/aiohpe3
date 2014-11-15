IOHPEApp.controller('KneeXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeXRays = function(){
    var promise = $ipadrbg.context.clinix_KneeXRays.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeXRays = pxresult;
      });
    });
  };

  $scope.LoadKneeXRays();

  $scope.addNew = function (kneeXRay) {

    if (kneeXRay.XRayArea1 || kneeXRay.Medial1 || kneeXRay.Lateral1) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem1
        ,XRayArea   : kneeXRay.XRayArea1
        ,Medial     : kneeXRay.Medial1
        ,Lateral    : kneeXRay.Lateral1
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }

    if (kneeXRay.XRayArea2) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem2
        ,XRayArea   : kneeXRay.XRayArea2
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }

    if (kneeXRay.XRayArea3 || kneeXRay.Medial3) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem3
        ,XRayArea   : kneeXRay.XRayArea3
        ,Medial     : kneeXRay.Medial3
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }

    if (kneeXRay.XRayArea4 || kneeXRay.Lateral4) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem4
        ,XRayArea   : kneeXRay.XRayArea4
        ,Lateral    : kneeXRay.Lateral4
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }

    if (kneeXRay.XRayArea5) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem5
        ,XRayArea   : kneeXRay.XRayArea5
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }

    if (kneeXRay.XRayArea6) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,APDate     : kneeXRay.APDate
        ,APXRayItem : kneeXRay.APXRayItem6
        ,XRayArea   : kneeXRay.XRayArea6
      }
      $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    }



    $ipadrbg.context.clinix_KneeXRays.saveChanges();

    kneeXRay.XRayArea1 = "";
    kneeXRay.Medial1 = "";
    kneeXRay.Lateral1 = "";
    kneeXRay.XRayArea2 = "";
    kneeXRay.Medial2 = "";
    kneeXRay.Lateral2 = "";

    kneeXRay.XRayArea3 = "";
    kneeXRay.Medial3 = "";
    kneeXRay.Lateral3 = "";

    kneeXRay.XRayArea4 = "";
    kneeXRay.Medial4 = "";
    kneeXRay.Lateral4 = "";

    kneeXRay.XRayArea5 = "";
    kneeXRay.Medial5 = "";
    kneeXRay.Lateral5 = "";

    kneeXRay.XRayArea6 = "";
    kneeXRay.Medial6 = "";
    kneeXRay.Lateral6 = "";

    $scope.LoadKneeXRays();
  }

  $scope.removeKneeXRays = function (kneeXRay) {
    kneeXRay.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipX = $scope.clinix_KneeXRays;
         hipX.splice(hipX.indexOf(kneeXRay), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});

  $scope.Push_HIP_PREop_FORM = function(){
    $scope.clinix_PREOp_HIP_preform = [];
    var promise = $ipadrbg.context.clinix_PREOp_HIP_preform.filter(function (px) { 
      return px.ClinixRID > 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_HIP_preform = pxresult;
      });
      $scope.clinix_PREOp_HIP_preform_JSON = JSON.stringify($scope.clinix_PREOp_HIP_preform);
      $http({
        method: 'POST'
        , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_PREop_HIP_Preform.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_HIP_preform_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_HIP_preform_JSON
        , cache : false
      });
    });
  }

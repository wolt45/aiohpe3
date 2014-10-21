IOHPEApp.controller('AmbulatoryStatusCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_AmbuStatus = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadAmbulatoryStatus = function(){
    var promise = $ipadrbg.context.clinix_AmbuStatus.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_AmbuStatus = pxresult;
      });
    });
  };

  $scope.LoadAmbulatoryStatus();

  $scope.addNew = function (ambuStatus) {
    newrecord = {
      ClinixRID           : $scope.clinix.ClinixRID
      ,PxRID              : $scope.clinix.PxRID

      ,PhysicalCondition  : ambuStatus.AmbuPhysCond
      ,AmbulatoryAid      : ambuStatus.AmbuAid
      ,AbleTo             : ambuStatus.AmbuAbleTo
    }

    $ipadrbg.context.clinix_AmbuStatus.add(newrecord);
    $ipadrbg.context.clinix_AmbuStatus.saveChanges();

    $scope.LoadAmbulatoryStatus();
  }

  $scope.removeChiefComp = function (ambuStatus) {
    ambuStatus.remove()
    .then(function() {
      $scope.$apply(function() {
         var ambstat = $scope.clinix_AmbuStatus;
         ambstat.splice(ambstat.indexOf(ambuStatus), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});

DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE
DEPRECATE

IOHPEApp.controller('ICDCtrl', function ($scope, $routeParams, $http){
  $scope.ICD_PXCodes = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  // The Array Object 0n the Form
  $scope.selected_ICDCodes = [];
  
  // populate ICD Object
  $scope.LkUpICDCodes= [];
  var promise = $ipadrbg.context.jdata_ICD10.filter(function (icdx) { 
    return icdx.lkup_ICDRID > 0}).order('Description').toLiveArray();
  promise.then(function(icdresult) {
    $scope.$apply( function () {
      $scope.LkUpICDCodes = icdresult;
    });
  });
  // populate ICD Object - end


  
  // $scope.LoadPECharges = function(){
  //   var promise = $ipadrbg.context.ICD_PXCodes.filter(function (icdx) { 
  //     return icdx.ClinixRID == this.id}
  //     , {id:$scope.ClinixRID}).toLiveArray();
  //   promise.then(function(pxresult) {
  //     $scope.$apply(function () {
  //       $scope.ICD_PXCodes = pxresult;

  //       $scope.ICD_PXCodes_JSON = JSON.stringify(pxresult);
  //     });
  //   });
  // }

  //$scope.LoadPECharges();



  $scope.addNew_PECharges = function (FeeRID,Description,Tariff,ChargeAmount,Discount) {
    // var netDiscnt = parseFloat(ChargeAmount) - parseFloat(Discount);
    
    //cannot save blank, so
    //ChargeAmount = ChargeAmount * 1;
    //Discount = Discount * 1;
    var netDiscnt = ChargeAmount - Discount;
    
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,ChargeRID        : FeeRID
      ,ChargeItem       : Description
      ,Tariff           : Tariff

      ,ChargeAmount     : ChargeAmount
      ,Discount         : Discount
      ,NetAmount        : netDiscnt
      ,SynchStatus      : 111
    }

    $ipadrbg.context.ICD_PXCodes.add(newrecord);
    $ipadrbg.context.ICD_PXCodes.saveChanges();

    FeeRID = null;
    Description = null;
    ChargeAmount = "0";
    Discount = "0";

    $scope.LoadPECharges();
  }

  $scope.pickCharge = function (FeeRID, Description,Tariff) {
    $scope.FeeRID = FeeRID;
    $scope.Description = Description;
    $scope.Tariff = Tariff;
    //alert("HIT! " + picChargeItem);
  }

  $scope.removePECharges = function (pcCharge) {

    if (confirm('Are you sure to Delete this data?')) {
      pcCharge.remove().then(function() {
        $scope.$apply(function() {
           var items = $scope.ICD_PXCodes;
           items.splice(items.indexOf(pcCharge), 1);
        });
      })
      .fail(function(err) {
      alert("Error deleting item!");
      });
    }
  }
});
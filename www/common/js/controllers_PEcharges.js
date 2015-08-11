// 10.0.1.99
IOHPEApp.controller('PEchargesCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_PEcharges = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  // populate Tariff Object
  $scope.LkUpPECharges= [];
  var promise = $ipadrbg.context.lkup_PEChargesTariff.filter(function (px) { 
    return px.FeeRID > this.id }  
    , {id : 0}).order('SortOrder').toLiveArray();
  promise.then(function(pxresult) {
    $scope.$apply( function () {
      $scope.LkUpPECharges = pxresult;
    });
  });
  // populate Tariff Object - end
  
  $scope.LoadPECharges = function(){
    var promise = $ipadrbg.context.clinix_PEcharges.filter(function (px) { 
      return px.ClinixRID == this.id}
      , {id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PEcharges = pxresult;

        $scope.clinix_PEcharges_JSON = JSON.stringify(pxresult);

      });
    });
  }

  $scope.LoadPECharges();

  $scope.addNew_PECharges = function (pcCharge) {
    var netDiscnt = parseFloat(pcCharge.ChargeAmount) - parseFloat(pcCharge.Discount);
    //cannot save blank, so
    pcCharge.ChargeAmount = parseFloat(pcCharge.ChargeAmount);
    pcCharge.Discount = parseFloat(pcCharge.Discount);
    
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,ChargeRID        : pcCharge.FeeRID
      ,ChargeItem       : pcCharge.Description
      ,Tariff           : pcCharge.Tariff
      ,ChargeAmount     : pcCharge.ChargeAmount
      ,Discount         : pcCharge.Discount
      ,NetAmount        : netDiscnt
      ,SynchStatus      : 111
    }

      $ipadrbg.context.clinix_PEcharges.add(newrecord);
      $ipadrbg.context.clinix_PEcharges.saveChanges();

      //pcCharge.Description = null;
      pcCharge.ChargeAmount = "0";
      pcCharge.Discount = "0";

      $scope.LoadPECharges();
  }

  // column totals
  // column totals

  $scope.CALC_Tariff = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += parseFloat(chargeRow.Tariff);
    }
    return total;
  }

  $scope.CALC_ChargeAmount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += parseFloat(chargeRow.ChargeAmount);
    }
    return total;
  }

  $scope.CALC_Discount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += parseFloat(chargeRow.Discount);
    }
    return total;
  }

  $scope.CALC_NetAmount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += parseFloat(chargeRow.NetAmount);
    }
    return total;
  }
  // column totals - end

  $scope.removePECharges = function (pcCharge) {
    pcCharge.remove()
    .then(function() {
      $scope.$apply(function() {
         var items = $scope.clinix_PEcharges;
         items.splice(items.indexOf(pcCharge), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


  /////////////////////////////////////////////////////////////
  // ClosePE send all IOHPE and PE BACK to server
  // if slows Doctor interaction, move to PUSH button Main Menu
  /////////////////////////////////////////////////////////////


  $scope.ClosePE = function (clinix) {
    if (confirm('Are you sure to Close this Appoinment => : ' + $scope.ClinixRID + ' ?')) {
      
      clinix.TranStatus = 30; // instead of 2-UNPAID, 30-CLOSED PE = UNPAID
      clinix.TranStatusDisp = "UNPAID";
      $ipadrbg.context.clinix.attach(clinix);
      
      clinix.pxAddress = null;
      $ipadrbg.context.clinix.saveChanges();

      //TranStatus changed, reconsutruct JSON, preparation for Synch
      $scope.clinix_JSON = JSON.stringify(clinix);
      $scope.clinix_JSON = "[" + $scope.clinix_JSON + "]";

      // //Push Ambulatory Status, this Clinix PE only
      // $scope.clinix_AmbuStatus = [];
      // var promise = $ipadrbg.context.clinix_AmbuStatus.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_AmbuStatus = pxresult;
      //   });
      //   $scope.clinix_AmbuStatus_JSON = JSON.stringify($scope.clinix_AmbuStatus);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_AmbuStatus.php?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_AmbuStatus_JSON
      //     , cache : false
      //   });
      // });


      // // Push Diagnosis, this Clinix.PE onlye   11.99
      // $scope.clinix_Diagnosis = [];
      // var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();

      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_Diagnosis = pxresult;
      //   });
      //   $scope.clinix_Diagnosis_JSON = JSON.stringify($scope.clinix_Diagnosis);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_Diagnosis.php?clinixJsonIzed=' + $scope.clinix_Diagnosis_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_Diagnosis_JSON
      //     , cache : false
      //   });
      // });


      // // PUSH DiagsManagement
      // $scope.clinix_DiagsManagement = [];
      // var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_DiagsManagement = pxresult;
      //   });
      //   $scope.clinix_DiagsManagement_JSON = JSON.stringify($scope.clinix_DiagsManagement);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_DiagsManagement.php?clinixJsonIzed=' + $scope.clinix_DiagsManagement_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_DiagsManagement_JSON
      //     , cache : false
      //   });
      // });


      // // PUSH DiagsMedication = [];
      // $scope.clinix_DiagsMedication = [];
      // var promise = $ipadrbg.context.clinix_DiagsMedication.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_DiagsMedication = pxresult;
      //   });
      //   $scope.clinix_DiagsMedication_JSON = JSON.stringify($scope.clinix_DiagsMedication);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_DiagsMedication.php?clinixJsonIzed=' + $scope.clinix_DiagsMedication_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_DiagsMedication_JSON
      //     , cache : false
      //   });
      // });


      // // PUSH DiagSchedSurgery = [];
      // $scope.clinix_DiagSchedSurgery = [];
      // var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_DiagSchedSurgery = pxresult;
      //   });
      //   $scope.clinix_DiagSchedSurgery_JSON = JSON.stringify($scope.clinix_DiagSchedSurgery);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_DiagsSchedSurgery.php?clinixJsonIzed=' + $scope.clinix_DiagSchedSurgery_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_DiagSchedSurgery_JSON
      //     , cache : false
      //   });
      // });


      // // PUSH DiagsDisposition = [];
      // $scope.clinix_DiagsDisposition = [];
      // var promise = $ipadrbg.context.clinix_DiagsDisposition.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_DiagsDisposition = pxresult;
      //   });
      //   $scope.clinix_DiagsDisposition_JSON = JSON.stringify($scope.clinix_DiagsDisposition);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_DiagsDisposition.php?clinixJsonIzed=' + $scope.clinix_DiagsDisposition_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_DiagsDisposition_JSON
      //     , cache : false
      //   });
      // });


      // // PUSH Diags NOTES  
      // $scope.clinix_DiagsNotes = [];
      // var promise = $ipadrbg.context.clinix_DiagsNotes.filter(function (px) { 
      //   return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      // promise.then(function(pxresult) {
      //   $scope.$apply(function () {
      //     $scope.clinix_DiagsNotes = pxresult;
      //   });
      //   $scope.clinix_DiagsNotes_JSON = JSON.stringify($scope.clinix_DiagsNotes);
      //   $http({
      //     method: 'POST'
      //     , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_DiagsNotes.php?clinixJsonIzed=' + $scope.clinix_DiagsNotes_JSON
      //     , contentType : 'application/json'
      //     , data : $scope.clinix_DiagsNotes_JSON
      //     , cache : false
      //   });
      // });

      // PUSH BACK - FLOOR

      //notify server
      $scope.notifyServer();

      //alert("Appoinment # " + $scope.ClinixRID + " Successfully Closed!");
    }
  }

  // cancel PE button 
  $scope.CancelPE = function (clinix) {
    if (confirm('Are you sure to CANCEL this Appoinment: ' + $scope.ClinixRID + ' ?')) {
      $ipadrbg.context.clinix.attach(clinix);
      clinix.TranStatus = 98;
      //clinix.TranStatus = 10; // temporaily, testing routine
      $ipadrbg.context.clinix.saveChanges();

      //TranStatus changed, reconsutruct JSON
      $scope.clinix_JSON = JSON.stringify(clinix);
      $scope.clinix_JSON = "[" + $scope.clinix_JSON + "]";

      //notify server
      $scope.notifyServer();

      alert("Appoinment # " + $scope.ClinixRID + " was Cancelled!");
    }
  }

  //from 
  //file://localhost/Users/cerquit/Desktop/WFS%20Desktop/SPECIALS/jquery%20-%20HTML5%20WebSQL%20%20how%20to%20know%20when%20a%20db%20transaction%20finishes%20%20-%20Stack%20Overflow.html
  // function databaseSync() {

  //   $.when( tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=one"),
  //           tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=two"), 
  //           tableInsert("http://192.168.1.40:8888/iOS/mobilesrv/index.php?ACT=three"))
  //       .then(function(){
  //           console.log( 'All processing complete' );
  //       });
  // }

  //update server TranStatus after, PE close pushback  
  $scope.notifyServer = function () {
    // Set TranStatus
    $http({
      method: 'POST'
      , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_clinixTrnStts.php' //?clinixJsonIzed=' + $scope.clinix_JSON
      , contentType : 'application/json'
      , data : $scope.clinix_JSON
      , cache : false
    });

    // PUASH BACk PE Charges
    $http({
      method: 'POST'
      , url : 'http://10.0.1.99/RBGsrvr_todayset/srvr_back_PEcharges.php' //?clinixJsonIzed=' + $scope.clinix_PEcharges_JSON
      , contentType : 'application/json'
      , data : $scope.clinix_PEcharges_JSON
      , cache : false
    });

    alert("Appoinment # " + $scope.ClinixRID + " SERVER was Notified!");
  }

});

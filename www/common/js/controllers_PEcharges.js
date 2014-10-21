IOHPEApp.controller('PEchargesCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_PEcharges = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.PECharges= [
      { id :1000, procedural : 0, Discount : 0, chargeAmount :    0 , chargeItem : "CLINICAL CHARGES"}
      { id :1001, procedural : 0, Discount : 0, chargeAmount : 1000 , chargeItem : "Initial consultation"}
    , { id :1002, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "Follow up Visit"}
    , { id :1003, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "Ankle Taping"}
    , { id :1004, procedural : 0, Discount : 0, chargeAmount : 3000 , chargeItem : "Cast Brace"}

    , { id : 1005, procedural : 0, Discount : 0, chargeAmount :  250 , chargeItem : "Cast Trimming"}
    , { id : 1006, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "Clubfoot Cast"}
    , { id : 1007, procedural : 0, Discount : 0, chargeAmount : 2000 , chargeItem : "Knee aspiration/cortizone injection"}

    , { id : 1008, procedural : 0, Discount : 0, chargeAmount : 1200 , chargeItem : "Lac-Long Arm Cast"}
    , { id : 1009, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "Las-long arm Splint"}
    , { id : 1010, procedural : 0, Discount : 0, chargeAmount : 2000 , chargeItem : "LLC-Long Leg Cast"}

    , { id : 1011, procedural : 0, Discount : 0, chargeAmount : 1000 , chargeItem : "LLS-Last Long Splint"}
    , { id : 1012, procedural : 0, Discount : 0, chargeAmount : 2000 , chargeItem : "LLC-Long Leg Cast"}
    , { id : 1013, procedural : 0, Discount : 0, chargeAmount : 2500 , chargeItem : "LLWC-Long Leg Walking Cast"}

    , { id : 1014, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "Posterior Splint"}
    , { id : 1015, procedural : 0, Discount : 0, chargeAmount : 2500 , chargeItem : "PTB Cast"}
    , { id : 1016, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "ROC- Removal of Cast"}

    , { id : 1017, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "SAC- Short Arm Cast"}
    , { id : 1018, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "SAS- Short Arm Splint"}
    , { id : 1019, procedural : 0, Discount : 0, chargeAmount : 1000 , chargeItem : "SLC-Short Leg Cast"}

    , { id : 1020, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "SLS-Short Leg Splint"}
    , { id : 1021, procedural : 0, Discount : 0, chargeAmount : 1500 , chargeItem : "SLWC- Short Leg Wlaking Cast"}
    , { id : 1022, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "Serial Casting/Foot"}

    , { id : 1023, procedural : 0, Discount : 0, chargeAmount :  800 , chargeItem : "Thumb Spica Cast"}
    , { id : 1024, procedural : 0, Discount : 0, chargeAmount :  500 , chargeItem : "Ulnar Gutter Splint"}
    , { id : 1025, procedural : 0, Discount : 0, chargeAmount :  200 , chargeItem : "Windowing of Cast"}

    , { id : 1026, procedural : 0, Discount : 0, chargeAmount : 2500 , chargeItem : "Hip Injection (Kenacort)"}
    , { id : 1027, procedural : 0, Discount : 0, chargeAmount :  600 , chargeItem : "Injection Fee(KL)"}
    , { id : 1028, procedural : 0, Discount : 0, chargeAmount : 1000 , chargeItem : "Injection Fee(SupaRTZ)"}
    , { id : 1029, procedural : 0, Discount : 0, chargeAmount : 1500 , chargeItem : "Soft tissue injection"}

    , { id : 2000, procedural : 1, Discount : 1, chargeAmount : 0 , chargeItem : "PROCEDURES"}

    , { id : 2001, procedural : 1, Discount : 0, chargeAmount : 100000 , chargeItem : "Total hip/knee replacement unilateral"}
    , { id : 2002, procedural : 1, Discount : 0, chargeAmount : 150000 , chargeItem : "Total hip/knee replacement bilateral"}
    , { id : 2003, procedural : 1, Discount : 0, chargeAmount :  40000 , chargeItem : "Anesthesiologist"}

    , { id : 2004, procedural : 1, Discount : 0, chargeAmount :  35000 , chargeItem : "Assistant Surgeon"}
    , { id : 2005, procedural : 1, Discount : 0, chargeAmount :  75000 , chargeItem : "Indroprosthesis replacement"}
    , { id : 2006, procedural : 1, Discount : 0, chargeAmount :  75000 , chargeItem : "Close reduction and plating"}
    , { id : 2007, procedural : 1, Discount : 0, chargeAmount :  50000 , chargeItem : "Open reduction"}
      ];

  $scope.disabled={id:100};  

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

  $scope.addNew = function (pcCharge) {

    var netDiscnt = parseFloat(pcCharge.chargeAmount) - parseFloat(pcCharge.Discount);
    
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,ChargeRID        : pcCharge.id
      ,ChargeItem       : pcCharge.chargeItem
      ,Tariff           : pcCharge.chargeAmount
      ,ChargeAmount     : pcCharge.chargeAmount
      ,Discount         : pcCharge.Discount
      ,NetAmount        : netDiscnt
      ,SynchStatus      : 111
    }

      $ipadrbg.context.clinix_PEcharges.add(newrecord);
      $ipadrbg.context.clinix_PEcharges.saveChanges();

      pcCharge.chargeItem = null;
      pcCharge.chargeAmount = null;
      pcCharge.Discount = null;

      $scope.LoadPECharges();
  }

  $scope.CALC_Tariff = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += (chargeRow.Tariff);
    }
    return total;
  }

  $scope.CALC_ChargeAmount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += (chargeRow.ChargeAmount);
    }
    return total;
  }

  $scope.CALC_Discount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += (chargeRow.Discount);
    }
    return total;
  }

  $scope.CALC_NetAmount = function(){
    var total = 0;
    for(var i = 0; i < $scope.clinix_PEcharges.length; i++){
        var chargeRow = $scope.clinix_PEcharges[i];
        total += (chargeRow.NetAmount);
    }
    return total;
  }

  $scope.removeItem = function (pcCharge) {
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
    if (confirm('Are you sure to Close this Appoinment: ' + $scope.ClinixRID + ' ?')) {
      $ipadrbg.context.clinix.attach(clinix);
      clinix.TranStatus = 30;
      clinix.pxAddress = null;
      $ipadrbg.context.clinix.saveChanges();

      //TranStatus changed, reconsutruct JSON
      $scope.clinix_JSON = JSON.stringify(clinix);
      $scope.clinix_JSON = "[" + $scope.clinix_JSON + "]";

      //Push
      $scope.clinix_AmbuStatus = [];
      var promise = $ipadrbg.context.clinix_AmbuStatus.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_AmbuStatus = pxresult;
        });
        $scope.clinix_AmbuStatus_JSON = JSON.stringify($scope.clinix_AmbuStatus);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_AmbuStatus.php?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_AmbuStatus_JSON
          , cache : false
        });
      });


      $scope.clinix_Diagnosis = [];
      var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_Diagnosis = pxresult;
        });
        $scope.clinix_Diagnosis_JSON = JSON.stringify($scope.clinix_Diagnosis);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_Diagnosis.php?clinixJsonIzed=' + $scope.clinix_Diagnosis_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_Diagnosis_JSON
          , cache : false
        });
      });

      $scope.clinix_DiagsManagement = [];
      var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_DiagsManagement = pxresult;
        });
        $scope.clinix_DiagsManagement_JSON = JSON.stringify($scope.clinix_DiagsManagement);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_DiagsManagement.php?clinixJsonIzed=' + $scope.clinix_DiagsManagement_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_DiagsManagement_JSON
          , cache : false
        });
      });


      $scope.clinix_DiagsMedication = [];
      var promise = $ipadrbg.context.clinix_DiagsMedication.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_DiagsMedication = pxresult;
        });
        $scope.clinix_DiagsMedication_JSON = JSON.stringify($scope.clinix_DiagsMedication);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_DiagsMedication.php?clinixJsonIzed=' + $scope.clinix_DiagsMedication_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_DiagsMedication_JSON
          , cache : false
        });
      });

      $scope.clinix_DiagSchedSurgery = [];
      var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_DiagSchedSurgery = pxresult;
        });
        $scope.clinix_DiagSchedSurgery_JSON = JSON.stringify($scope.clinix_DiagSchedSurgery);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_DiagsSchedSurgery.php?clinixJsonIzed=' + $scope.clinix_DiagSchedSurgery_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_DiagSchedSurgery_JSON
          , cache : false
        });
      });

      $scope.clinix_DiagsDisposition = [];
      var promise = $ipadrbg.context.clinix_DiagsDisposition.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_DiagsDisposition = pxresult;
        });
        $scope.clinix_DiagsDisposition_JSON = JSON.stringify($scope.clinix_DiagsDisposition);
        $http({
          method: 'POST'
          , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_DiagsDisposition.php?clinixJsonIzed=' + $scope.clinix_DiagsDisposition_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_DiagsDisposition_JSON
          , cache : false
        });
      });


      // Push - end

      //notify server
      $scope.notifyServer();

      alert("Appoinment # " + $scope.ClinixRID + " Successfully Closed!");
    }
  }

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

  //update server TranStatus
  $scope.notifyServer = function () {
    // Set TranStatus
    $http({
      method: 'POST'
      , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_clinixTrnStts.php?clinixJsonIzed=' + $scope.clinix_JSON
      , contentType : 'application/json'
      , data : $scope.clinix_JSON
      , cache : false
    });

    // Charges
    $http({
      method: 'POST'
      , url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_PEcharges.php?clinixJsonIzed=' + $scope.clinix_PEcharges_JSON
      , contentType : 'application/json'
      , data : $scope.clinix_PEcharges_JSON
      , cache : false
    });

    alert("Appoinment # " + $scope.ClinixRID + " SERVER was Notified!");
  }

});

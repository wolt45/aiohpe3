IOHPEApp.controller('PTNotes1_Ctrl', function ($scope, $rootScope ,$routeParams, $http){
  $scope.jdata_PTNotes1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;



  $scope.LoadPTNotes1 = function(PTRID){

    var promise = $ipadrbg.context.jdata_PTNotes1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_PTNotes1 = pxresult;
      });

          $scope.PTNotes1 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          // ,DateEntered : pxresult[0]['DateEntered']
          // ,PTNotes : pxresult[0]['PTNotes']
          // ,ROM : pxresult[0]['ROM']
          // ,MMT : pxresult[0]['MMT']
          // ,PAIN : pxresult[0]['PAIN']
          // ,SENSORY : pxresult[0]['SENSORY']
          // ,PROBLEMLIST : pxresult[0]['PROBLEMLIST']
          // ,STG : pxresult[0]['STG']
          // ,LTG : pxresult[0]['LTG']
          // ,PLAN : pxresult[0]['PLAN']
        
       }

    });
  }; 

  $scope.LoadPTNotes1();

  $scope.addNew_PTNotes1 = function (frmPTNotes1) {
    
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      // tx.executeSql("delete from 'jdata_PTNotes1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      PTRID2 : $scope.PTRID
      ,ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,DateEntered : frmPTNotes1.DateEntered
      ,PTNotes : frmPTNotes1.PTNotes
      ,ROM : frmPTNotes1.ROM
      ,MMT : frmPTNotes1.MMT
      ,PAIN : frmPTNotes1.PAIN
      ,SENSORY : frmPTNotes1.SENSORY
      ,PROBLEMLIST : frmPTNotes1.PROBLEMLIST
      ,STG : frmPTNotes1.STG
      ,LTG : frmPTNotes1.LTG
      ,PLAN : frmPTNotes1.PLAN

    }
    $ipadrbg.context.jdata_PTNotes1.add(newrecord);
    $ipadrbg.context.jdata_PTNotes1.saveChanges();

    alert("PT Notes Data Saved!");
    frmPTNotes1.DateEntered = null; 
    frmPTNotes1.PTNotes = null; 
    frmPTNotes1.ROM = null; 
    frmPTNotes1.MMT = null; 
    frmPTNotes1.PAIN = null; 
    frmPTNotes1.SENSORY = null; 
    frmPTNotes1.PROBLEMLIST = null; 
    frmPTNotes1.STG = null; 
    frmPTNotes1.LTG = null; 
    frmPTNotes1.PLAN = null; 

    $scope.LoadPTNotes1();      
  }



  $scope.removePTNotes1 = function (PTRID) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PTNotes1' WHERE PTRID = " + PTRID);
      });
      $scope.PTNotes1 = [];
    }
    $scope.LoadPTNotes1(); 
  }

});
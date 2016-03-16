IOHPEApp.controller('ORPostOpRec_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORpostOpRec = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORpostOpRec = function(){
    var promise = $ipadrbg.context.jdata_ORpostOpRec.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORpostOpRec = pxresult;
      });

    $scope.ORPostOpRec = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,PostOpTime : pxresult[0]['PostOpTime']
    ,AccompBy : pxresult[0]['AccompBy']
    ,PreOpBP : pxresult[0]['PreOpBP']
    ,P : pxresult[0]['P']
    ,Temp : pxresult[0]['Temp']
    ,Sp02 : pxresult[0]['Sp02']
    ,Via : pxresult[0]['Via']
    ,From : pxresult[0]['From']
    ,Anesthesia : pxresult[0]['Anesthesia']
    ,O2MaskCan : pxresult[0]['O2MaskCan']
  
  }

    });
  }; 

   $scope.LoadORpostOpRec();

  $scope.addNew_ORPostOpRec = function (frmORPostOpRec) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORpostOpRec' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PostOpTime : frmORPostOpRec.PostOpTime
      ,AccompBy : frmORPostOpRec.AccompBy
      ,PreOpBP : frmORPostOpRec.PreOpBP
      ,P : frmORPostOpRec.P
      ,Temp : frmORPostOpRec.Temp
      ,Sp02 : frmORPostOpRec.Sp02
      ,Via : frmORPostOpRec.Via
      ,From : frmORPostOpRec.From
      ,Anesthesia : frmORPostOpRec.Anesthesia
      ,O2MaskCan : frmORPostOpRec.O2MaskCan

    }
    $ipadrbg.context.jdata_ORpostOpRec.add(newrecord);
    $ipadrbg.context.jdata_ORpostOpRec.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORpostOpRec();    
  }

  $scope.removeORPostOpRec = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORpostOpRec' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORPostOpRec = [];
    }
  }

});
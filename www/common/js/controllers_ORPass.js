IOHPEApp.controller('ORPass_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORPass = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.parseInt = parseInt;

  $scope.LoadORPass = function(){
    var promise = $ipadrbg.context.jdata_ORPass.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORPass = pxresult;
      });

    $scope.ORPass = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    , ConQ15a: pxresult[0]['ConQ15a']
    , ConQ15b: pxresult[0]['ConQ15b']
    , ConQ15c: pxresult[0]['ConQ15c']
    , ConQ15d: pxresult[0]['ConQ15d']
    , ConQ30a: pxresult[0]['ConQ30a']
    , ConQ30b: pxresult[0]['ConQ30b']
    , ConQ1a: pxresult[0]['ConQ1a']
    , ConQ1b: pxresult[0]['ConQ1b']
    , ConQ1c: pxresult[0]['ConQ1c']
    , ConQ1d: pxresult[0]['ConQ1d']

    , ActQ15a: pxresult[0]['ActQ15a']
    , ActQ15b: pxresult[0]['ActQ15b']
    , ActQ15c: pxresult[0]['ActQ15c']
    , ActQ15d: pxresult[0]['ActQ15d']
    , ActQ30a: pxresult[0]['ActQ30a']
    , ActQ30b: pxresult[0]['ActQ30b']
    , ActQ1a: pxresult[0]['ActQ1a']
    , ActQ1b: pxresult[0]['ActQ1b']
    , ActQ1c: pxresult[0]['ActQ1c']
    , ActQ1d: pxresult[0]['ActQ1d']

    , ResQ15a: pxresult[0]['ResQ15a']
    , ResQ15b: pxresult[0]['ResQ15b']
    , ResQ15c: pxresult[0]['ResQ15c']
    , ResQ15d: pxresult[0]['ResQ15d']
    , ResQ30a: pxresult[0]['ResQ30a']
    , ResQ30b: pxresult[0]['ResQ30b']
    , ResQ1a: pxresult[0]['ResQ1a']
    , ResQ1b: pxresult[0]['ResQ1b']
    , ResQ1c: pxresult[0]['ResQ1c']
    , ResQ1d: pxresult[0]['ResQ1d']

    , SatQ15a: pxresult[0]['SatQ15a']
    , SatQ15b: pxresult[0]['SatQ15b']
    , SatQ15c: pxresult[0]['SatQ15c']
    , SatQ15d: pxresult[0]['SatQ15d']
    , SatQ30a: pxresult[0]['SatQ30a']
    , SatQ30b: pxresult[0]['SatQ30b']
    , SatQ1a: pxresult[0]['SatQ1a']
    , SatQ1b: pxresult[0]['SatQ1b']
    , SatQ1c: pxresult[0]['SatQ1c']
    , SatQ1d: pxresult[0]['SatQ1d']

    , PaiQ15a: pxresult[0]['PaiQ15a']
    , PaiQ15b: pxresult[0]['PaiQ15b']
    , PaiQ15c: pxresult[0]['PaiQ15c']
    , PaiQ15d: pxresult[0]['PaiQ15d']
    , PaiQ30a: pxresult[0]['PaiQ30a']
    , PaiQ30b: pxresult[0]['PaiQ30b']
    , PaiQ1a: pxresult[0]['PaiQ1a']
    , PaiQ1b: pxresult[0]['PaiQ1b']
    , PaiQ1c: pxresult[0]['PaiQ1c']
    , PaiQ1d: pxresult[0]['PaiQ1d']

    , EmeQ15a: pxresult[0]['EmeQ15a']
    , EmeQ15b: pxresult[0]['EmeQ15b']
    , EmeQ15c: pxresult[0]['EmeQ15c']
    , EmeQ15d: pxresult[0]['EmeQ15d']
    , EmeQ30a: pxresult[0]['EmeQ30a']
    , EmeQ30b: pxresult[0]['EmeQ30b']
    , EmeQ1a: pxresult[0]['EmeQ1a']
    , EmeQ1b: pxresult[0]['EmeQ1b']
    , EmeQ1c: pxresult[0]['EmeQ1c']
    , EmeQ1d: pxresult[0]['EmeQ1d']

    , PainScale: pxresult[0]['PainScale']
    , TimeScale: pxresult[0]['TimeScale']
    , MedicationScale: pxresult[0]['MedicationScale']
    , RelievedScale: pxresult[0]['RelievedScale']
    , NotRelScale: pxresult[0]['NotRelScale']
    
    , NurseNotes: pxresult[0]['NurseNotes']
  
  }

    });
  }; 

   $scope.LoadORPass();

  $scope.addNew_ORPass = function (frmORPass) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORPass' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PotentProb : frmORPass.PotentProb
    , ConQ15a: frmORPass.ConQ15a
    , ConQ15b: frmORPass.ConQ15b
    , ConQ15c: frmORPass.ConQ15c
    , ConQ15d: frmORPass.ConQ15d
    , ConQ30a: frmORPass.ConQ30a
    , ConQ30b: frmORPass.ConQ30b
    , ConQ1a: frmORPass.ConQ1a
    , ConQ1b: frmORPass.ConQ1b
    , ConQ1c: frmORPass.ConQ1c
    , ConQ1d: frmORPass.ConQ1d

    , ActQ15a: frmORPass.ActQ15a
    , ActQ15b: frmORPass.ActQ15b
    , ActQ15c: frmORPass.ActQ15c
    , ActQ15d: frmORPass.ActQ15d
    , ActQ30a: frmORPass.ActQ30a
    , ActQ30b: frmORPass.ActQ30b
    , ActQ1a: frmORPass.ActQ1a
    , ActQ1b: frmORPass.ActQ1b
    , ActQ1c: frmORPass.ActQ1c
    , ActQ1d: frmORPass.ActQ1d

    , ResQ15a: frmORPass.ResQ15a
    , ResQ15b: frmORPass.ResQ15b
    , ResQ15c: frmORPass.ResQ15c
    , ResQ15d: frmORPass.ResQ15d
    , ResQ30a: frmORPass.ResQ30a
    , ResQ30b: frmORPass.ResQ30b
    , ResQ1a: frmORPass.ResQ1a
    , ResQ1b: frmORPass.ResQ1b
    , ResQ1c: frmORPass.ResQ1c
    , ResQ1d: frmORPass.ResQ1d

    , SatQ15a: frmORPass.SatQ15a
    , SatQ15b: frmORPass.SatQ15b
    , SatQ15c: frmORPass.SatQ15c
    , SatQ15d: frmORPass.SatQ15d
    , SatQ30a: frmORPass.SatQ30a
    , SatQ30b: frmORPass.SatQ30b
    , SatQ1a: frmORPass.SatQ1a
    , SatQ1b: frmORPass.SatQ1b
    , SatQ1c: frmORPass.SatQ1c
    , SatQ1d: frmORPass.SatQ1d

    , PaiQ15a: frmORPass.PaiQ15a
    , PaiQ15b: frmORPass.PaiQ15b
    , PaiQ15c: frmORPass.PaiQ15c
    , PaiQ15d: frmORPass.PaiQ15d
    , PaiQ30a: frmORPass.PaiQ30a
    , PaiQ30b: frmORPass.PaiQ30b
    , PaiQ1a: frmORPass.PaiQ1a
    , PaiQ1b: frmORPass.PaiQ1b
    , PaiQ1c: frmORPass.PaiQ1c
    , PaiQ1d: frmORPass.PaiQ1d

    , EmeQ15a: frmORPass.EmeQ15a
    , EmeQ15b: frmORPass.EmeQ15b
    , EmeQ15c: frmORPass.EmeQ15c
    , EmeQ15d: frmORPass.EmeQ15d
    , EmeQ30a: frmORPass.EmeQ30a
    , EmeQ30b: frmORPass.EmeQ30b
    , EmeQ1a: frmORPass.EmeQ1a
    , EmeQ1b: frmORPass.EmeQ1b
    , EmeQ1c: frmORPass.EmeQ1c
    , EmeQ1d: frmORPass.EmeQ1d

    , PainScale: frmORPass.PainScale
    , TimeScale: frmORPass.TimeScale
    , MedicationScale: frmORPass.MedicationScale
    , RelievedScale: frmORPass.RelievedScale
    , NotRelScale: frmORPass.NotRelScale
    
    , NurseNotes: frmORPass.NurseNotes

    }
    $ipadrbg.context.jdata_ORPass.add(newrecord);
    $ipadrbg.context.jdata_ORPass.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORPass();    
  }

  $scope.removeORPass = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORPass' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORPass = [];
    }
  }

});
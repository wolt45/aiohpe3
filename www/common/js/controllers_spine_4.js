IOHPEApp.controller('spine_4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_spine_4 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadspine4 = function(){
    var promise = $ipadrbg.context.jdata_spine_4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_spine_4 = pxresult;
      });

      $scope.spine4 = {
      ClinixRID  : $scope.clinix.ClinixRID
      ,PxRID     : $scope.clinix.PxRID

      ,BladderFunction : pxresult[0]['BladderFunction']
      ,BowelFunction : pxresult[0]['BowelFunction']
      ,sexualfunction : pxresult[0]['sexualfunction']
      ,groingenitalsbuttock : pxresult[0]['groingenitalsbuttock']
      ,legfoot : pxresult[0]['legfoot']
      ,legfootRightLeft : pxresult[0]['legfootRightLeft']
      ,armhand : pxresult[0]['armhand']
      ,armhandRightLeft : pxresult[0]['armhandRightLeft']
      ,nightawaken : pxresult[0]['nightawaken']
      ,inference : pxresult[0]['inference']

      }

       
    });
  }; 

   $scope.Loadspine4();

  $scope.addNew_spine4 = function (frmSpine4) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_spine_4' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,BladderFunction : frmSpine4.BladderFunction
      ,BowelFunction : frmSpine4.BowelFunction
      ,sexualfunction : frmSpine4.sexualfunction
      ,groingenitalsbuttock : frmSpine4.groingenitalsbuttock
      ,legfoot : frmSpine4.legfoot
      ,legfootRightLeft : frmSpine4.legfootRightLeft
      ,armhand : frmSpine4.armhand
      ,armhandRightLeft : frmSpine4.armhandRightLeft
      ,nightawaken : frmSpine4.nightawaken
      ,inference : frmSpine4.inference

    }
    $ipadrbg.context.jdata_spine_4.add(newrecord);
    $ipadrbg.context.jdata_spine_4.saveChanges();

    alert("Spine Data Saved!");

    $scope.Loadspine4();
  }

  $scope.removespine4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_spine_4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.spine4 = [];
    }
  }

});
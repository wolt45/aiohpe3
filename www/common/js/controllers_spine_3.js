IOHPEApp.controller('spine_3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_spine_3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadspine3 = function(){
    var promise = $ipadrbg.context.jdata_spine_3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_spine_3 = pxresult;
      });

      $scope.spine3 = {
      ClinixRID  : $scope.clinix.ClinixRID
      ,PxRID     : $scope.clinix.PxRID

      ,sittingnochange : pxresult[0]['sittingnochange']
      ,sittingrelievespain : pxresult[0]['sittingrelievespain']
      ,sittingincreasepain : pxresult[0]['sittingincreasepain']
      ,sittingafterhowlong : pxresult[0]['sittingafterhowlong']

      ,walkingnochange : pxresult[0]['walkingnochange']
      ,walkingrelievespain : pxresult[0]['walkingrelievespain']
      ,walkingincreasepain : pxresult[0]['walkingincreasepain']
      ,walkingafterhowlong : pxresult[0]['walkingafterhowlong']

      ,standingnochange : pxresult[0]['standingnochange']
      ,standingrelievespain : pxresult[0]['standingrelievespain']
      ,standingincreasepain : pxresult[0]['standingincreasepain']
      ,standingafterhowlong : pxresult[0]['standingafterhowlong']

      ,lyingdownnochange : pxresult[0]['lyingdownnochange']
      ,lyingdownrelievespain : pxresult[0]['lyingdownrelievespain']
      ,lyingdownincreasepain : pxresult[0]['lyingdownincreasepain']
      ,lyingdownafterhowlong : pxresult[0]['lyingdownafterhowlong']

      ,bendingforwardnochange : pxresult[0]['bendingforwardnochange']
      ,bendingforwardrelievespain : pxresult[0]['bendingforwardrelievespain']
      ,bendingforwardincreasepain : pxresult[0]['bendingforwardincreasepain']
      ,bendingforwardafterhowlong : pxresult[0]['bendingforwardafterhowlong']

      ,bendingbackwardnochange : pxresult[0]['bendingbackwardnochange']
      ,bendingbackwardrelievespain : pxresult[0]['bendingbackwardrelievespain']
      ,bendingbackwardincreasepain : pxresult[0]['bendingbackwardincreasepain']
      ,bendingbackwardafterhowlong : pxresult[0]['bendingbackwardafterhowlong']

      ,liftingnochange : pxresult[0]['liftingnochange']
      ,liftingrelievespain : pxresult[0]['liftingrelievespain']
      ,liftingincreasepain : pxresult[0]['liftingincreasepain']
      ,liftingafterhowlong : pxresult[0]['liftingafterhowlong']

      ,coughingsneezingnochange : pxresult[0]['coughingsneezingnochange']
      ,coughingsneezingrelievespain : pxresult[0]['coughingsneezingrelievespain']
      ,coughingsneezingincreasepain : pxresult[0]['coughingsneezingincreasepain']
      ,coughingsneezingafterhowlong : pxresult[0]['coughingsneezingafterhowlong']

      ,changingpositionnochange : pxresult[0]['changingpositionnochange']
      ,changingpositionrelievespain : pxresult[0]['changingpositionrelievespain']
      ,changingpositionincreasepain : pxresult[0]['changingpositionincreasepain']
      ,changingpositionafterhowlong : pxresult[0]['changingpositionafterhowlong']

      ,activitiesmotionposition : pxresult[0]['activitiesmotionposition']
      ,relievepain : pxresult[0]['relievepain']


      }

       
    });
  }; 

   $scope.Loadspine3();

  $scope.addNew_spine3 = function (frmSpine3) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_spine_3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,sittingnochange : frmSpine3.sittingnochange
      ,sittingrelievespain : frmSpine3.sittingrelievespain
      ,sittingincreasepain : frmSpine3.sittingincreasepain
      ,sittingafterhowlong : frmSpine3.sittingafterhowlong
      
      ,walkingnochange : frmSpine3.walkingnochange
      ,walkingrelievespain : frmSpine3.walkingrelievespain
      ,walkingincreasepain : frmSpine3.walkingincreasepain
      ,walkingafterhowlong : frmSpine3.walkingafterhowlong

      ,standingnochange : frmSpine3.standingnochange
      ,standingrelievespain : frmSpine3.standingrelievespain
      ,standingincreasepain : frmSpine3.standingincreasepain
      ,standingafterhowlong : frmSpine3.standingafterhowlong

      ,lyingdownnochange : frmSpine3.lyingdownnochange
      ,lyingdownrelievespain : frmSpine3.lyingdownrelievespain
      ,lyingdownincreasepain : frmSpine3.lyingdownincreasepain
      ,lyingdownafterhowlong : frmSpine3.lyingdownafterhowlong

      ,bendingforwardnochange : frmSpine3.bendingforwardnochange
      ,lyingdownrelievespain : frmSpine3.lyingdownrelievespain
      ,lyingdownincreasepain : frmSpine3.lyingdownincreasepain
      ,lyingdownafterhowlong : frmSpine3.lyingdownafterhowlong

      ,bendingforwardnochange : frmSpine3.bendingforwardnochange
      ,bendingforwardrelievespain : frmSpine3.bendingforwardrelievespain
      ,bendingforwardincreasepain : frmSpine3.bendingforwardincreasepain
      ,bendingforwardafterhowlong : frmSpine3.bendingforwardafterhowlong

      ,bendingbackwardnochange : frmSpine3.bendingbackwardnochange
      ,bendingbackwardrelievespain : frmSpine3.bendingbackwardrelievespain
      ,bendingbackwardincreasepain : frmSpine3.bendingbackwardincreasepain
      ,bendingbackwardafterhowlong : frmSpine3.bendingbackwardafterhowlong

      ,liftingnochange : frmSpine3.liftingnochange
      ,liftingrelievespain : frmSpine3.liftingrelievespain
      ,liftingincreasepain : frmSpine3.liftingincreasepain
      ,liftingafterhowlong : frmSpine3.liftingafterhowlong

      ,coughingsneezingnochange : frmSpine3.coughingsneezingnochange
      ,coughingsneezingrelievespain : frmSpine3.coughingsneezingrelievespain
      ,coughingsneezingincreasepain : frmSpine3.coughingsneezingincreasepain
      ,coughingsneezingafterhowlong : frmSpine3.coughingsneezingafterhowlong

      ,changingpositionnochange : frmSpine3.changingpositionnochange
      ,changingpositionrelievespain : frmSpine3.changingpositionrelievespain
      ,changingpositionincreasepain : frmSpine3.changingpositionincreasepain
      ,changingpositionafterhowlong : frmSpine3.changingpositionafterhowlong

      ,activitiesmotionposition : frmSpine3.activitiesmotionposition
      ,relievepain : frmSpine3.relievepain

    }
    $ipadrbg.context.jdata_spine_3.add(newrecord);
    $ipadrbg.context.jdata_spine_3.saveChanges();

    alert("Spine Data Saved!");

    $scope.Loadspine3();
  }

  $scope.removespine3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_spine_3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.spine3 = [];
    }
  }

});
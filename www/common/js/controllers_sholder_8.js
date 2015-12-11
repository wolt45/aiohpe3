IOHPEApp.controller('shoulder_8_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_8 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder8 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_8.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_8 = pxresult;
      });

    $scope.Sportshoulder8 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,GrossPictures : pxresult[0]['GrossPictures']
    ,Acronialspur : pxresult[0]['Acronialspur']
    ,BiglianiType : pxresult[0]['BiglianiType']
    ,ACjointarthritis : pxresult[0]['ACjointarthritis']

    ,Calcifications : pxresult[0]['Calcifications']
    ,CalcificationsDescrip : pxresult[0]['CalcificationsDescrip']
    ,Osacromiale : pxresult[0]['Osacromiale']
    ,Glenohumeralarthritis : pxresult[0]['Glenohumeralarthritis']

    ,Inflammedbursa : pxresult[0]['Inflammedbursa']
    ,MRIACjointarthritis : pxresult[0]['MRIACjointarthritis']

    ,MRICalcification : pxresult[0]['MRICalcification']
    ,MRICalcificationDescrip : pxresult[0]['MRICalcificationDescrip']

    ,MRIOsacromiale : pxresult[0]['MRIOsacromiale']
    ,Bicepstendonpathology : pxresult[0]['Bicepstendonpathology']
    ,BicepstendonpathologyInflammed : pxresult[0]['BicepstendonpathologyInflammed']
    ,BicepstendonpathologyFlattered : pxresult[0]['BicepstendonpathologyFlattered']
    ,BicepstendonpathologyTear : pxresult[0]['BicepstendonpathologyTear']

    ,Rotatorcufftendonpathology : pxresult[0]['Rotatorcufftendonpathology']
    ,RotatorcufftendonpathologyInflammed : pxresult[0]['RotatorcufftendonpathologyInflammed']
    ,RotatorcufftendonpathologyFlattered : pxresult[0]['RotatorcufftendonpathologyFlattered']
    ,RotatorcufftendonpathologyTear : pxresult[0]['RotatorcufftendonpathologyTear']

    ,MRIOthers : pxresult[0]['MRIOthers']

  }

    });
  }; 

   $scope.Loadshoulder8();

  $scope.addNew_shoulder8 = function (frmshoulder8) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_8' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,GrossPictures : frmshoulder8.GrossPictures
      ,Acronialspur : frmshoulder8.Acronialspur
      ,BiglianiType : frmshoulder8.BiglianiType
      ,ACjointarthritis : frmshoulder8.ACjointarthritis

      ,Calcifications : frmshoulder8.Calcifications
      ,CalcificationsDescrip : frmshoulder8.CalcificationsDescrip
      ,Osacromiale : frmshoulder8.Osacromiale
      ,Glenohumeralarthritis : frmshoulder8.Glenohumeralarthritis

      ,Inflammedbursa : frmshoulder8.Inflammedbursa
      ,MRIACjointarthritis : frmshoulder8.MRIACjointarthritis

      ,MRICalcification : frmshoulder8.MRICalcification
      ,MRICalcificationDescrip : frmshoulder8.MRICalcificationDescrip

      ,MRIOsacromiale : frmshoulder8.MRIOsacromiale
      ,Bicepstendonpathology : frmshoulder8.Bicepstendonpathology
      ,BicepstendonpathologyInflammed : frmshoulder8.BicepstendonpathologyInflammed
      ,BicepstendonpathologyFlattered : frmshoulder8.BicepstendonpathologyFlattered
      ,BicepstendonpathologyTear : frmshoulder8.BicepstendonpathologyTear

      ,Rotatorcufftendonpathology : frmshoulder8.Rotatorcufftendonpathology
      ,RotatorcufftendonpathologyInflammed : frmshoulder8.RotatorcufftendonpathologyInflammed
      ,RotatorcufftendonpathologyFlattered : frmshoulder8.RotatorcufftendonpathologyFlattered
      ,RotatorcufftendonpathologyTear : frmshoulder8.RotatorcufftendonpathologyTear

      ,MRIOthers : frmshoulder8.MRIOthers

    }
    $ipadrbg.context.jdata_shoulder_8.add(newrecord);
    $ipadrbg.context.jdata_shoulder_8.saveChanges();

    alert("Shoulder Data Saved!");

    $scope.Loadshoulder8();    
  }

  $scope.removeshoulder8 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_8' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportshoulder8 = [];
    }
  }

});
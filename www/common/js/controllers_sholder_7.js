IOHPEApp.controller('shoulder_7_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_7 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder7 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_7.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_7 = pxresult;
      });

    $scope.Sportshoulder7 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,SpecialTestNormal : pxresult[0]['SpecialTestNormal']
    
    ,JobesValue : pxresult[0]['JobesValue']
    ,JobesDescrip : pxresult[0]['JobesDescrip']

    ,HawkinValue : pxresult[0]['HawkinValue']
    ,HawkinDescrip : pxresult[0]['HawkinDescrip']

    ,OBrienssValue : pxresult[0]['OBrienssValue']
    ,OBrienssDescrip : pxresult[0]['OBrienssDescrip']

    ,Sulcussign : pxresult[0]['Sulcussign']
    ,SulcussignDescrip : pxresult[0]['SulcussignDescrip']

    ,ApprehensionValue : pxresult[0]['ApprehensionValue']
    ,ApprehensionDescrip : pxresult[0]['ApprehensionDescrip']

    ,DropArmValue : pxresult[0]['DropArmValue']
    ,DropArmDescrip : pxresult[0]['DropArmDescrip']

    ,SpeedsValue : pxresult[0]['SpeedsValue']
    ,SpeedsDescrip : pxresult[0]['SpeedsDescrip']

    ,YergansonValue : pxresult[0]['YergansonValue']
    ,YergansonDescrip : pxresult[0]['YergansonDescrip']

    ,NeerValue : pxresult[0]['NeerValue']
    ,NeerDescrip : pxresult[0]['NeerDescrip']

    ,Otherspecialtest : pxresult[0]['NeerDescrip']

  }

    });
  }; 

   $scope.Loadshoulder7();

  $scope.addNew_shoulder7 = function (frmshoulder7) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_7' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SpecialTestNormal : frmshoulder7.SpecialTestNormal

      ,JobesValue : frmshoulder7.JobesValue
      ,JobesDescrip : frmshoulder7.JobesDescrip

      ,HawkinValue : frmshoulder7.HawkinValue
      ,HawkinDescrip : frmshoulder7.HawkinDescrip

      ,OBrienssValue : frmshoulder7.OBrienssValue
      ,OBrienssDescrip : frmshoulder7.OBrienssDescrip

      ,Sulcussign : frmshoulder7.Sulcussign
      ,SulcussignDescrip : frmshoulder7.SulcussignDescrip

      ,ApprehensionValue : frmshoulder7.ApprehensionValue
      ,ApprehensionDescrip : frmshoulder7.ApprehensionDescrip

      ,DropArmValue : frmshoulder7.DropArmValue
      ,DropArmDescrip : frmshoulder7.DropArmDescrip

      ,SpeedsValue : frmshoulder7.SpeedsValue
      ,SpeedsDescrip : frmshoulder7.SpeedsDescrip

      ,YergansonValue : frmshoulder7.YergansonValue
      ,YergansonDescrip : frmshoulder7.YergansonDescrip

      ,NeerValue : frmshoulder7.NeerValue
      ,NeerDescrip : frmshoulder7.NeerDescrip

      ,Otherspecialtest : frmshoulder7.Otherspecialtest

    }
    $ipadrbg.context.jdata_shoulder_7.add(newrecord);
    $ipadrbg.context.jdata_shoulder_7.saveChanges();

    alert("Shoulder Data Saved!");

    $scope.Loadshoulder7();    
  }

  $scope.removeshoulder7 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_7' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportshoulder7 = [];
    }
  }

});
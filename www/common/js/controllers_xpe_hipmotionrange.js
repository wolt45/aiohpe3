IOHPEApp.controller('HipMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipMotionRange = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipMotionRange = function(){
    var promise = $ipadrbg.context.clinix_HipMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMotionRange = pxresult;

        $scope.HipMotionRanges = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,FlexionContra : pxresult[0]['FlexionContra']
          ,Flexion : pxresult[0]['Flexion']
          ,Extension : pxresult[0]['Extension']
          ,IR : pxresult[0]['IR']
          ,ER : pxresult[0]['ER']
          ,AbductionSupine : pxresult[0]['AbductionSupine']
          ,AbductionLateral : pxresult[0]['AbductionLateral']
          ,Adduction : pxresult[0]['Adduction']

          ,SLR_Ryn : pxresult[0]['SLR_Ryn']
          ,SLRValR : pxresult[0]['SLRValR']
          ,SLR_Lyn : pxresult[0]['SLR_Lyn']
          ,SLRValL : pxresult[0]['SLRValL']

          ,Resist_Ryn : pxresult[0]['Resist_Ryn']
          ,ResistRight : pxresult[0]['ResistRight']
          ,Resist_Lyn : pxresult[0]['Resist_Lyn']
          ,ResistLeft : pxresult[0]['ResistLeft']
        }

      });
    });
  };
  $scope.LoadHipMotionRange();

  $scope.addNew_HipROM = function (hipMotionRange) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,FlexionContra : hipMotionRange.FlexionContra
      ,Flexion : hipMotionRange.Flexion
      ,Extension : hipMotionRange.Extension
      ,IR : hipMotionRange.IR
      ,ER : hipMotionRange.ER
      ,AbductionSupine : hipMotionRange.AbductionSupine
      ,AbductionLateral : hipMotionRange.AbductionLateral
      ,Adduction : hipMotionRange.Adduction
      
      ,SLR_Ryn : hipMotionRange.SLR_Ryn
      ,SLRValR : hipMotionRange.SLRValR
      ,SLR_Lyn : hipMotionRange.SLR_Lyn
      ,SLRValL : hipMotionRange.SLRValL

      ,Resist_Ryn : hipMotionRange.Resist_Ryn
      ,ResistRight : hipMotionRange.ResistRight
      ,Resist_Lyn : hipMotionRange.Resist_Lyn
      ,ResistLeft : hipMotionRange.ResistLeft
    }
    $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    $ipadrbg.context.clinix_HipMotionRange.saveChanges();

    alert("Hip ROM Data Saved!");
    
    $scope.LoadHipMotionRange();
  }

  $scope.removeHipMotionRange = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
      });
      $scope.HipMotionRanges = [];
    }
  }
});
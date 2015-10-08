IOHPEApp.controller('footAnkle_7_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_7 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle7 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_7.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_7 = pxresult;
      });

    $scope.FootAnkle7 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,GrossPicture : pxresult[0]['GrossPicture']
    ,CompartmentNarrowing : pxresult[0]['CompartmentNarrowing']
    ,Medial : pxresult[0]['Medial']
    ,MedialDescrip : pxresult[0]['MedialDescrip']
    ,Lateral : pxresult[0]['Lateral']
    ,LateralDescrip : pxresult[0]['LateralDescrip']
    ,Talartilt : pxresult[0]['Talartilt']
    ,TalartiltDescrip : pxresult[0]['TalartiltDescrip']
    ,TalocruralAngleDescrip : pxresult[0]['TalocruralAngleDescrip']
    ,Osteophytes : pxresult[0]['Osteophytes']
    ,OsteophytesDescrip : pxresult[0]['OsteophytesDescrip']
    ,LateralTalarTilt : pxresult[0]['LateralTalarTilt']
    ,LateralTalarTiltAngle : pxresult[0]['LateralTalarTiltAngle']
    ,AnteriorTibialSpur : pxresult[0]['AnteriorTibialSpur']
    ,AnteriorTibialSpurGrade : pxresult[0]['AnteriorTibialSpurGrade']
    ,SyndesmoticWidening : pxresult[0]['SyndesmoticWidening']
    ,SyndesmoticWideningDescrip : pxresult[0]['SyndesmoticWideningDescrip']
    ,TibiotalarArthritis : pxresult[0]['TibiotalarArthritis']
    ,SubtalarArthritis : pxresult[0]['SubtalarArthritis']
    ,TalonavicularArthritis : pxresult[0]['TalonavicularArthritis']
    ,CalcaneocuboidArthritis : pxresult[0]['CalcaneocuboidArthritis']
    ,MidfootArthritis : pxresult[0]['MidfootArthritis']
    ,ForefootArthritis : pxresult[0]['ForefootArthritis']
    ,OsTrigonum : pxresult[0]['OsTrigonum']
    ,OtherOS : pxresult[0]['OtherOS']
    ,OsTrigonumType : pxresult[0]['OsTrigonumType']
    
    ,Hanglund : pxresult[0]['Hanglund']
    
    ,CalcanealOssicle : pxresult[0]['CalcanealOssicle']
    
    ,PosteriorCalcanealSpur : pxresult[0]['PosteriorCalcanealSpur']
    
    ,OsteochondralDefects : pxresult[0]['OsteochondralDefects']
    ,OsteochondralDefectsDescrip : pxresult[0]['OsteochondralDefectsDescrip']
    
    ,OthersXray : pxresult[0]['OthersXray']
  
  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle7();

  $scope.addNew_FootAnkle7 = function (frmFootAnkle7) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_7' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,GrossPicture : frmFootAnkle7.GrossPicture
      ,CompartmentNarrowing : frmFootAnkle7.CompartmentNarrowing
      ,Medial : frmFootAnkle7.Medial
      ,MedialDescrip : frmFootAnkle7.MedialDescrip
      ,Lateral : frmFootAnkle7.Lateral
      ,LateralDescrip : frmFootAnkle7.LateralDescrip
      ,Talartilt : frmFootAnkle7.Talartilt
      ,TalartiltDescrip : frmFootAnkle7.TalartiltDescrip
      ,TalocruralAngleDescrip : frmFootAnkle7.TalocruralAngleDescrip
      ,Osteophytes : frmFootAnkle7.Osteophytes
      ,OsteophytesDescrip : frmFootAnkle7.OsteophytesDescrip
      ,LateralTalarTilt : frmFootAnkle7.LateralTalarTilt
      ,LateralTalarTiltAngle : frmFootAnkle7.LateralTalarTiltAngle
      ,AnteriorTibialSpur : frmFootAnkle7.AnteriorTibialSpur
      ,AnteriorTibialSpurGrade : frmFootAnkle7.AnteriorTibialSpurGrade
      ,SyndesmoticWidening : frmFootAnkle7.SyndesmoticWidening
      ,SyndesmoticWideningDescrip : frmFootAnkle7.SyndesmoticWideningDescrip
      ,TibiotalarArthritis : frmFootAnkle7.TibiotalarArthritis
      ,SubtalarArthritis : frmFootAnkle7.SubtalarArthritis
      ,TalonavicularArthritis : frmFootAnkle7.TalonavicularArthritis
      ,CalcaneocuboidArthritis : frmFootAnkle7.CalcaneocuboidArthritis
      ,MidfootArthritis : frmFootAnkle7.MidfootArthritis
      ,ForefootArthritis : frmFootAnkle7.ForefootArthritis
      ,OsTrigonum : frmFootAnkle7.OsTrigonum
      ,OtherOS : frmFootAnkle7.OtherOS
      ,OsTrigonumType : frmFootAnkle7.OsTrigonumType
      ,Hanglund : frmFootAnkle7.Hanglund
      ,CalcanealOssicle : frmFootAnkle7.CalcanealOssicle
      ,PosteriorCalcanealSpur : frmFootAnkle7.PosteriorCalcanealSpur
      ,OsteochondralDefects : frmFootAnkle7.OsteochondralDefects
      ,OsteochondralDefectsDescrip : frmFootAnkle7.OsteochondralDefectsDescrip
      ,OthersXray : frmFootAnkle7.OthersXray

    }
    $ipadrbg.context.jdata_FootAnkle_7.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_7.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle7();
  }

  $scope.removeFootAnkle7 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_7' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle7 = [];
    }
  }

});
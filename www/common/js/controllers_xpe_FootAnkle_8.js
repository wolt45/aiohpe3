IOHPEApp.controller('footAnkle_8_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_FootAnkle_8 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadFootAnkle8 = function(){
    var promise = $ipadrbg.context.jdata_FootAnkle_8.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_FootAnkle_8 = pxresult;
      });

    $scope.FootAnkle8 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Effusion : pxresult[0]['Effusion']
    ,SynovialInflammation : pxresult[0]['SynovialInflammation']

    ,MedialLigamentComplexSprain : pxresult[0]['MedialLigamentComplexSprain']
    ,MedialLigamentComplexSprainGrade : pxresult[0]['MedialLigamentComplexSprainGrade']

    ,SpecificLigamentsDescrip : pxresult[0]['SpecificLigamentsDescrip']

    ,LateralLigamentComplexSprain : pxresult[0]['LateralLigamentComplexSprain']
    ,LateralLigamentComplexSprainGrade : pxresult[0]['LateralLigamentComplexSprainGrade']

    ,SyndesmoticSprain : pxresult[0]['SyndesmoticSprain']
    ,SyndesmoticSprainGrade : pxresult[0]['SyndesmoticSprainGrade']

    ,PeronialTendonPathology : pxresult[0]['PeronialTendonPathology']
    ,PeronialTendonPathologyInflamed : pxresult[0]['PeronialTendonPathologyInflamed']
    ,PeronialTendonPathologyPartial : pxresult[0]['PeronialTendonPathologyPartial']
    ,PeronialTendonPathologyComplete : pxresult[0]['PeronialTendonPathologyComplete']

    ,Posteriortibialtendonpathology : pxresult[0]['Posteriortibialtendonpathology']
    ,PosteriortibialtendonpathologyInflamed : pxresult[0]['PosteriortibialtendonpathologyInflamed']
    ,PosteriortibialtendonpathologyPartial : pxresult[0]['PosteriortibialtendonpathologyPartial']
    ,PosteriortibialtendonpathologyComplete : pxresult[0]['PosteriortibialtendonpathologyComplete']

    ,AnteriorTibialTendonPathology : pxresult[0]['AnteriorTibialTendonPathology']
    ,AnteriorTibialTendonPathologyInflamed : pxresult[0]['AnteriorTibialTendonPathologyInflamed']
    ,AnteriorTibialTendonPathologyPartial : pxresult[0]['AnteriorTibialTendonPathologyPartial']
    ,AnteriorTibialTendonPathologyComplete : pxresult[0]['AnteriorTibialTendonPathologyComplete']

    ,AchillesTendonPathology : pxresult[0]['AchillesTendonPathology']
    ,AchillesTendonPathologyInflamed : pxresult[0]['AchillesTendonPathologyInflamed']
    ,AchillesTendonPathologyPartial : pxresult[0]['AchillesTendonPathologyPartial']
    ,AchillesTendonPathologyComplete : pxresult[0]['AchillesTendonPathologyComplete']

    ,AnteriorBonySpur : pxresult[0]['AnteriorBonySpur']
    ,PosteriorSoftTissueImpingement : pxresult[0]['PosteriorSoftTissueImpingement']
    ,HalundPathology : pxresult[0]['HalundPathology']
    ,RetrocalcanealBursalInflammation : pxresult[0]['RetrocalcanealBursalInflammation']
    ,RetrotendocalcanealBursalInflammation : pxresult[0]['RetrotendocalcanealBursalInflammation']
    ,OsteochodralLesion : pxresult[0]['OsteochodralLesion']
    ,OsteochodralLesionDecrip : pxresult[0]['OsteochodralLesionDecrip']
    ,OtherMRI : pxresult[0]['OtherMRI']
  
  }

       //alert($scope.SkelTrauma1.NeurologicVascularDes);

    });
  }; 

   $scope.LoadFootAnkle8();

  $scope.addNew_FootAnkle8 = function (frmFootAnkle8) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_FootAnkle_8' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Effusion : frmFootAnkle8.Effusion
      ,SynovialInflammation : frmFootAnkle8.SynovialInflammation

      ,MedialLigamentComplexSprain : frmFootAnkle8.MedialLigamentComplexSprain
      ,MedialLigamentComplexSprainGrade : frmFootAnkle8.MedialLigamentComplexSprainGrade

      ,SpecificLigamentsDescrip : frmFootAnkle8.SpecificLigamentsDescrip

      ,LateralLigamentComplexSprain : frmFootAnkle8.LateralLigamentComplexSprain
      ,LateralLigamentComplexSprainGrade : frmFootAnkle8.LateralLigamentComplexSprainGrade

      ,MedialLigamentComplexSprain : frmFootAnkle8.MedialLigamentComplexSprain
      ,MedialLigamentComplexSprainGrade : frmFootAnkle8.MedialLigamentComplexSprainGrade

      ,SpecificLigamentsDescrip : frmFootAnkle8.SpecificLigamentsDescrip

      ,LateralLigamentComplexSprain : frmFootAnkle8.LateralLigamentComplexSprain
      ,LateralLigamentComplexSprainGrade : frmFootAnkle8.LateralLigamentComplexSprainGrade

      ,SyndesmoticSprain : frmFootAnkle8.SyndesmoticSprain
      ,SyndesmoticSprainGrade : frmFootAnkle8.SyndesmoticSprainGrade

      ,PeronialTendonPathology : frmFootAnkle8.PeronialTendonPathology
      ,PeronialTendonPathologyInflamed : frmFootAnkle8.PeronialTendonPathologyInflamed
      ,PeronialTendonPathologyPartial : frmFootAnkle8.PeronialTendonPathologyPartial
      ,PeronialTendonPathologyComplete : frmFootAnkle8.PeronialTendonPathologyComplete

      ,Posteriortibialtendonpathology : frmFootAnkle8.Posteriortibialtendonpathology
      ,PosteriortibialtendonpathologyInflamed : frmFootAnkle8.PosteriortibialtendonpathologyInflamed
      ,PosteriortibialtendonpathologyPartial : frmFootAnkle8.PosteriortibialtendonpathologyPartial
      ,PosteriortibialtendonpathologyComplete : frmFootAnkle8.PosteriortibialtendonpathologyComplete

      ,AnteriorTibialTendonPathology : frmFootAnkle8.AnteriorTibialTendonPathology
      ,AnteriorTibialTendonPathologyInflamed : frmFootAnkle8.AnteriorTibialTendonPathologyInflamed
      ,AnteriorTibialTendonPathologyPartial : frmFootAnkle8.AnteriorTibialTendonPathologyPartial
      ,AnteriorTibialTendonPathologyComplete : frmFootAnkle8.AnteriorTibialTendonPathologyComplete

      ,AchillesTendonPathology : frmFootAnkle8.AchillesTendonPathology
      ,AchillesTendonPathologyInflamed : frmFootAnkle8.AchillesTendonPathologyInflamed
      ,AchillesTendonPathologyPartial : frmFootAnkle8.AchillesTendonPathologyPartial
      ,AchillesTendonPathologyComplete : frmFootAnkle8.AchillesTendonPathologyComplete

      ,AnteriorBonySpur : frmFootAnkle8.AnteriorBonySpur
      ,PosteriorSoftTissueImpingement : frmFootAnkle8.PosteriorSoftTissueImpingement
      ,HalundPathology : frmFootAnkle8.HalundPathology
      ,RetrocalcanealBursalInflammation : frmFootAnkle8.RetrocalcanealBursalInflammation
      ,RetrotendocalcanealBursalInflammation : frmFootAnkle8.RetrotendocalcanealBursalInflammation
      ,OsteochodralLesion : frmFootAnkle8.OsteochodralLesion
      ,OsteochodralLesionDecrip : frmFootAnkle8.OsteochodralLesionDecrip
      ,OtherMRI : frmFootAnkle8.OtherMRI

    }
    $ipadrbg.context.jdata_FootAnkle_8.add(newrecord);
    $ipadrbg.context.jdata_FootAnkle_8.saveChanges();

    alert("Foot and Ankle Data Saved!");

    $scope.LoadFootAnkle8();
    
  }

  $scope.removeFootAnkle8 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_FootAnkle_8' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.FootAnkle8 = [];
    }
  }

});
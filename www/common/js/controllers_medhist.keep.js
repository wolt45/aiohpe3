IOHPEApp.controller('MedHistCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_MedHist = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadMedHist = function(){
    var promise = $ipadrbg.context.clinix_MedHist.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_MedHist = pxresult;
      });
    });
  }

  $scope.LoadMedHist();

  $scope.addMedHist = function (grpMedHist) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,HeartMedsYes             : grpMedHist.HeartMedsYes
      ,HeartMeds                : grpMedHist.HeartMeds
      ,HeartSurgeryYes          : grpMedHist.HeartSurgeryYes
      ,HeartSurgeryDate         : grpMedHist.HeartSurgeryDate
      ,HypertensionYes          : grpMedHist.HypertensionYes
      ,Hypertension             : grpMedHist.Hypertension
      ,DiabetesYes              : grpMedHist.DiabetesYes
      ,Diabetes                 : grpMedHist.Diabetes
      ,KidneyYes                : grpMedHist.KidneyYes
      ,Kidney                   : grpMedHist.Kidney
      ,GIsYes                   : grpMedHist.GIsYes
      ,GIs                      : grpMedHist.GIs

      ,AllergiesYes             : grpMedHist.AllergiesYes
      ,Allergies                : grpMedHist.Allergies
      ,InfectionHistoryYes      : grpMedHist.InfectionHistoryYes
      ,InfectionHistory         : grpMedHist.InfectionHistory

      ,LungsYes                 : grpMedHist.LungsYes
      ,Lungs                    : grpMedHist.Lungs
      ,TraumaYes                : grpMedHist.TraumaYes
      ,Trauma                   : grpMedHist.Trauma
      ,CNSYes                   : grpMedHist.CNSYes
      ,CNS                      : grpMedHist.CNS

      ,ArthYes                  : grpMedHist.ArthYes
      ,Arth                     : grpMedHist.Arth
      ,AsthYes                  : grpMedHist.AsthYes
      ,Asth                     : grpMedHist.Asth
      ,CancerYes                : grpMedHist.CancerYes
      ,Cancer                   : grpMedHist.Cancer
      ,COPDYes                  : grpMedHist.COPDYes
      ,COPD                     : grpMedHist.COPD
      ,HeartDiseaseYes          : grpMedHist.HeartDiseaseYes
      ,HeartDisease             : grpMedHist.HeartDisease
      ,LiveDiseYes              : grpMedHist.LiveDiseYes
      ,LiveDise                 : grpMedHist.LiveDise
      ,MIYes                    : grpMedHist.MIYes
      ,MI                       : grpMedHist.MI
      ,PrevSurgYes              : grpMedHist.PrevSurgYes
      ,PrevSurg                 : grpMedHist.PrevSurg
      ,DigestYes                : grpMedHist.DigestYes
      ,Digest                   : grpMedHist.Digest
      ,EliProbYes               : grpMedHist.EliProbYes
      ,EliProb                  : grpMedHist.EliProb
      ,EmoPsyYes                : grpMedHist.EmoPsyYes
      ,EmoPsy                   : grpMedHist.EmoPsy
      ,FaintingYes              : grpMedHist.FaintingYes
      ,Fainting                 : grpMedHist.Fainting
      ,RenalDiseaseYes          : grpMedHist.RenalDiseaseYes
      ,RenalDisease             : grpMedHist.RenalDisease
      ,RheumaticDisYes          : grpMedHist.RheumaticDisYes
      ,RheumaticDis             : grpMedHist.RheumaticDis
      ,SeizuresYes              : grpMedHist.SeizuresYes
      ,Seizures                 : grpMedHist.Seizures
      ,StrokeYes                : grpMedHist.StrokeYes
      ,Stroke                   : grpMedHist.Stroke
      ,ThyroidDiseYes           : grpMedHist.ThyroidDiseYes
      ,ThyroidDise              : grpMedHist.ThyroidDise

      ,Others                   : grpMedHist.Others
    }

    $ipadrbg.context.clinix_MedHist.add(newrecord);
    $ipadrbg.context.clinix_MedHist.saveChanges();

    grpMedHist.HeartMedsYes       = "";
    grpMedHist.HeartMeds          = "";

    //alert("HEY!");

    $scope.LoadMedHist();
  }

  $scope.removeMedHist = function (grpMedHist) {
    grpMedHist.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_MedHist;
         comps.splice(comps.indexOf(grpMedHist), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});
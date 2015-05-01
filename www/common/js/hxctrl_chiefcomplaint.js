IOHPEApp.controller('HXctrl_ChiefComplaint', function ($scope, $routeParams, $http){
  $scope.clinix_chiefcomp = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.myBone= [
      { id : 0, name: "(undefined)"}
    , { id : 1, name: "HIP"}
    , { id : 2, name: "KNEE"}
    , { id : 3, name: "ANKLE and FOOT"}
    , { id : 4, name: "SHOULDER-ARM"}
    , { id : 5, name: "ELBOW"}
    , { id : 6, name: "WRIST and HAND"}
    , { id : 7, name: "THIGH"}
  ];

  // multi-select fiddle
  // http://jsfiddle.net/jaredwilli/vUSPu/

  $scope.LoadComplaints = function(){
    var promise = $ipadrbg.context.clinix_chiefcomp.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_chiefcomp = pxresult;
      });
    });

    var promise = $ipadrbg.context.clinix_spineIntl.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_spineIntl = pxresult;
      });
    })
  }

  $scope.LoadComplaints();

  $scope.addNew = function (complaint) {

    var myComplaint = 
      (complaint.MyBoneComplaint.Pain ? complaint.MyBoneComplaint.Pain + " " : "") 
      + (complaint.MyBoneComplaint.Swelling ? " " + complaint.MyBoneComplaint.Swelling + " " : "") 
      + (complaint.MyBoneComplaint.Stiffness ? " " + complaint.MyBoneComplaint.Stiffness + " " : "") 
      + (complaint.MyBoneComplaint.LimitedMotion ? " " + complaint.MyBoneComplaint.LimitedMotion + " " : "") 
      + (complaint.MyBoneComplaint.Deformity ? " " + complaint.MyBoneComplaint.Deformity + " " : "") 
      + (complaint.MyBoneComplaint.Shortening ? " " + complaint.MyBoneComplaint.Shortening + " " : "") 
      + (complaint.MyBoneComplaint.Numbness ? " " + complaint.MyBoneComplaint.Numbness + " " : "") 
      ;

    if (myComplaint && complaint.MyBoneLRB && complaint.MyBone) {
      newrecord = {
        ClinixRID         : $scope.clinix.ClinixRID
        ,PxRID            : $scope.clinix.PxRID

        ,MyBoneComplaint  : myComplaint
        ,MyBoneLRB        : complaint.MyBoneLRB
        ,MyBone           : complaint.MyBone
        
        ,Remarks          : complaint.Remarks
      }

      $ipadrbg.context.clinix_chiefcomp.add(newrecord);
      $ipadrbg.context.clinix_chiefcomp.saveChanges();

      complaint.MyBone = null;
      complaint.MyBoneLRB = null;
      complaint.MyBoneComplaint = null;
      complaint.Remarks = null;

      $scope.LoadComplaints();
    }
    else {
      alert ("CHIEF COMPLAINT data is incomplete!");
    }
  }

  $scope.removeChiefComp = function (complaint) {
    complaint.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_chiefcomp;
         comps.splice(comps.indexOf(complaint), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

  // $scope.editChiefComp = function (cheifcompdetailID) {
  //   complaint.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var comps = $scope.clinix_chiefcomp;
  //        comps.splice(comps.indexOf(complaint), 1);
  //     });
  //   })
  //  .fail(function(err) {
  //      alert("Error deleting item!");
  //  });
  // }





  // Spine Initial
  $scope.saveSpineIntl = function (spineIntl) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID
      ,MySpineNeck      : spineIntl.Neck
      ,MySpineUpperBack : spineIntl.UpperBack
      ,MySpineLowerBack : spineIntl.LowerBack
      ,MySpineOthers    : spineIntl.SpineOthers
    }

      $ipadrbg.context.clinix_spineIntl.add(newrecord);
      $ipadrbg.context.clinix_spineIntl.saveChanges();

      spineIntl.Neck = "";
      spineIntl.UpperBack = "";
      spineIntl.LowerBack = "";
      spineIntl.SpineOthers = "";

      $scope.LoadComplaints();
  }

  $scope.removeSpineIntl = function (spineIntl) {
    spineIntl.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_spineIntl;
         comps.splice(comps.indexOf(spineIntl), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


});

// IOHPEApp.controller('myBone', function ($scope) {
//   $scope.myBone = [
//   { 0 : "(undefined)"},
//   { 1 : "HIP"},
//   { 2 : "KNEE"},
//   { 3 : "ANKLE and FOOT"},
//   { 4 : "SHOULDER-ARM"},
//   { 5 : "ELBOW"},
//   { 6 : "WRIST and HAND"},
//   { 7 : "THIGH"}
// ]}
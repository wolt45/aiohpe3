IOHPEApp.controller('ChiefComplaintCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_chiefcomp = [];
  $scope.clinix_HXchiefcomp = [];

  $scope.LABSChiefcomp = [];
  $scope.zclinix = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.PxRID = 0;

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
    var promise = $ipadrbg.context.clinix_chiefcomp.filter(function (px) 
      { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_chiefcomp = pxresult;
        // WFS HACKS: pick-up Chart Number Here
        $scope.PxRID = pxresult[0]['PxRID'];
        // alert($scope.PxRID);
        $scope.LoadHXComplaints();

        $scope.LoadLABSChiefcomp();

        $scope.LoadZCLINIX();
      });
    });
  }
  $scope.LoadComplaints();


  // HISTORY, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadHXComplaints = function(){
    var promise = $ipadrbg.context.clinix_chiefcomp.filter(function (px) 
      { return px.PxRID == this.id} , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HXchiefcomp = pxresult;
        // alert($scope.PxRID);
      });
    });
  }


  // LABS, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadLABSChiefcomp = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && labs.HangRID == this.hangRID} , {id:$scope.PxRID, hangRID:2}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.LABSChiefcomp = pxresult;
        // alert($scope.PxRID);
      });
    });
  }


  // LABS, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadZCLINIX = function(){
    var promise = $ipadrbg.context.zclinix.filter(function (tblZClinix) 
      { return tblZClinix.ClinixRID == this.id } , {id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.zclinix = pxresult;
        // alert($scope.ClinixRID);
      });
    });
  }




  $scope.addNew = function (complaint) {
    var myComplaint = 
      (complaint.MyBoneComplaint.Pain ? complaint.MyBoneComplaint.Pain + " " : "") 
      + (complaint.MyBoneComplaint.Swelling ? " " + complaint.MyBoneComplaint.Swelling + " " : "") 
      + (complaint.MyBoneComplaint.Stiffness ? " " + complaint.MyBoneComplaint.Stiffness + " " : "") 
      + (complaint.MyBoneComplaint.LimitedMotion ? " " + complaint.MyBoneComplaint.LimitedMotion + " " : "") 
      + (complaint.MyBoneComplaint.Deformity ? " " + complaint.MyBoneComplaint.Deformity + " " : "") 
      + (complaint.MyBoneComplaint.Shortening ? " " + complaint.MyBoneComplaint.Shortening + " " : "") 
      + (complaint.MyBoneComplaint.Numbness ? " " + complaint.MyBoneComplaint.Numbness + " " : "") 
      + (complaint.MyBoneComplaint.FollowUp ? " " + complaint.MyBoneComplaint.FollowUp + " " : "") 
      ;

    var affectedArea = "";
    if (complaint.MyBone == "HIP" || 
      complaint.MyBone == "KNEE" || 
      complaint.MyBone == "ANKLE and FOOT" || 
      complaint.MyBone == "KNEE SPORTS" || 
      complaint.MyBone == "SHOULDER-ARM") {

      if (complaint.MyBoneLRB == "Left" || 
        complaint.MyBoneLRB == "Right" || 
        complaint.MyBoneLRB == "Both") {
        var affectedArea = complaint.MyBone + complaint.MyBoneLRB;
      }
    }  
    else {
      var affectedArea = complaint.MyBone;
    }

    // alert ("myComplaint = " + myComplaint);
    // alert ("MyBoneLRB = " + complaint.MyBoneLRB);
    // alert ("MyBone = " + complaint.MyBone);
    // alert ("affectedArea = " + affectedArea);

    if (myComplaint && affectedArea) {
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
    if (confirm('Are you sure to DELETE this data?')) {
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
  }

});
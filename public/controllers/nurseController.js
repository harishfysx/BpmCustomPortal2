var helloApp= angular.module('nurseApp', ['smart-table']);

helloApp.controller('safeCtrl', function ($scope,$http,$window) {

	//get Intial data
	$http.post('/nurse/nurseTasks').success(function(response){
		  
		//console.log(response);
		
		//$scope.normalTCount=response.normalTcount;
		$scope.normalTCount=response.normalTcount;
		//$scope.highTcount=response.highTcount;
		$scope.highTcount=response.highTcount;
		$scope.rowCollection = response.totalData;
		  
	   });
	
	//workTask
	
	$scope.selectedRow = null;
	  $scope.workTask= function(task,rowIndex){
		  $scope.selectedRow = rowIndex;
		  //console.log(task);
		  $http.get('/nurse/nurseTask/'+task.taskId).success(function(response){
			  $scope.processInstanceName=response.processInstanceName; 
			  $scope.taskDesc=response.description;
			  $scope.patientFName=response.data.variables.person.firstName;
			  $scope.patientMName=response.data.variables.person.middleName;
			  $scope.patientLName=response.data.variables.person.lastName;
			  $scope.patientGender=response.data.variables.person.gender;
			  $scope.patientDob=response.data.variables.person.dateOfBirth;
			
			  console.log(response.data.variables.person);
		  });
		  
		  
						
	  					}
	  
	  
	
});
	  
    
/*
	 $scope.rowCollection = [{
			"taskAssignedTo": {
				"type": "Group",
				"who": "FrontDesk_T_450c447b-c10f-4ac7-b95b-f720a2dcf721.fc82362c-af9a-4bc8-b16a-1403689bd101"
			},
			"assignedToUser": null,
			"bpdName": "PatientCheckInFlow",
			"instanceCreateDate": "2016-01-20T19:25:01Z",
			"instanceDueDate": "2016-01-21T03:25:01Z",
			"instanceId": 959,
			"instanceModifyDate": "2016-01-20T19:25:02Z",
			"instanceName": "PatientCheckInFlow:959",
			"instanceStatus": "Active",
			"taskAttachedExtActivityRef": null,
			"taskAttachedInfoPathFormRef": null,
			"taskDueDate": "2016-01-20T19:26:02Z",
			"taskId": 47402277,
			"taskPriority": "Normal",
			"taskStatus": "Received",
			"taskSubject": "Register Patient"
		}, {
			"taskAssignedTo": {
				"type": "Group",
				"who": "FrontDeskTeam_T_866ec4c0-f6ea-4186-bc23-2bb7fd6fd6cb.27181da8-3b96-43a1-a431-c925125c2500"
			},
			"assignedToUser": null,
			"bpdName": "PatientCheckInFlow",
			"instanceCreateDate": "2016-02-01T14:56:21Z",
			"instanceDueDate": "2016-02-01T22:56:21Z",
			"instanceId": 1075,
			"instanceModifyDate": "2016-02-01T14:56:23Z",
			"instanceName": "PatientCheckInFlow:1075",
			"instanceStatus": "Active",
			"taskAttachedExtActivityRef": null,
			"taskAttachedInfoPathFormRef": null,
			"taskDueDate": "2016-02-01T14:57:22Z",
			"taskId": 56276884,
			"taskPriority": "Normal",
			"taskStatus": "Received",
			"taskSubject": "Register Patient"
		}, {
			"taskAssignedTo": {
				"type": "Group",
				"who": "FrontDeskTeam_T_866ec4c0-f6ea-4186-bc23-2bb7fd6fd6cb.27181da8-3b96-43a1-a431-c925125c2500"
			},
			"assignedToUser": null,
			"bpdName": "PatientCheckInFlow",
			"instanceCreateDate": "2016-02-01T14:56:32Z",
			"instanceDueDate": "2016-02-01T22:56:32Z",
			"instanceId": 1076,
			"instanceModifyDate": "2016-02-01T14:56:32Z",
			"instanceName": "PatientCheckInFlow:1076",
			"instanceStatus": "Active",
			"taskAttachedExtActivityRef": null,
			"taskAttachedInfoPathFormRef": null,
			"taskDueDate": "2016-02-01T14:57:32Z",
			"taskId": 56276944,
			"taskPriority": "Normal",
			"taskStatus": "Received",
			"taskSubject": "Register Patient"
		}, {
			"taskAssignedTo": {
				"type": "Group",
				"who": "FrontDeskTeam_T_866ec4c0-f6ea-4186-bc23-2bb7fd6fd6cb.27181da8-3b96-43a1-a431-c925125c2500"
			},
			"assignedToUser": null,
			"bpdName": "PatientCheckInFlow",
			"instanceCreateDate": "2016-02-01T14:56:33Z",
			"instanceDueDate": "2016-02-01T22:56:33Z",
			"instanceId": 1077,
			"instanceModifyDate": "2016-02-01T14:56:33Z",
			"instanceName": "PatientCheckInFlow:1077",
			"instanceStatus": "Active",
			"taskAttachedExtActivityRef": null,
			"taskAttachedInfoPathFormRef": null,
			"taskDueDate": "2016-02-01T14:57:33Z",
			"taskId": 56276955,
			"taskPriority": "Normal",
			"taskStatus": "Received",
			"taskSubject": "Register Patient"
		}, {
			"assignedToRole": null,
			"taskAssignedTo": {
				"type": "User",
				"who": "pcp_test_frontdesk1"
			},
			"bpdName": "PatientCheckInFlow",
			"instanceCreateDate": "2016-02-01T14:56:34Z",
			"instanceDueDate": "2016-02-01T22:56:34Z",
			"instanceId": 1078,
			"instanceModifyDate": "2016-02-01T15:04:36Z",
			"instanceName": "PatientCheckInFlow:1078",
			"instanceStatus": "Active",
			"taskAttachedExtActivityRef": null,
			"taskAttachedInfoPathFormRef": null,
			"taskDueDate": "2016-02-01T14:57:34Z",
			"taskId": 56276962,
			"taskPriority": "Normal",
			"taskStatus": "Received",
			"taskSubject": "Register Patient"
		}];

	*/
  

  

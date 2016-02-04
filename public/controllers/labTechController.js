var helloApp= angular.module('labTechApp', ['smart-table']);

helloApp.controller('safeCtrl', function ($scope,$http,$window) {

	//get Intial data
	var refresh= function(){
		$http.post('/labTech/labTechTasks').success(function(response){
	
		  
		//console.log(response);
		
		//$scope.normalTCount=response.normalTcount;
		$scope.normalTCount=response.normalTcount;
		//$scope.highTcount=response.highTcount;
		$scope.highTcount=response.highTcount;
		$scope.rowCollection = response.totalData;
		  
	   });
}
	
	refresh();
	//workTask
	
			$scope.selectedRow = null;
			$scope.workTask= function(task,rowIndex){
				$scope.selectedRow = rowIndex;
		  //console.log(task);
				$http.get('/labTech/labTechTask/'+task.taskId).success(function(response){
			  $scope.processInstanceName=response.processInstanceName; 
			  $scope.tkiid=response.tkiid;
			  $scope.taskDesc=response.description;
			  $scope.patientFName=response.data.variables.person.firstName;
			  $scope.patientMName=response.data.variables.person.middleName;
			  $scope.patientLName=response.data.variables.person.lastName;
			  $scope.patientGender=response.data.variables.person.gender;
			  $scope.patientDob=response.data.variables.person.dateOfBirth;
			
			  console.log(response);
			  
		  });
		  
		  
						
	  			}
	
			//post nurse triage info
			
	  
	
});
	  
    


helloApp.controller('postLabTechCtrl', function ($scope,$http,$window) {
	

	$scope.postLabTech=function(){
		if($scope.tkiid){
			
			var dataObj = {"tkiid":$scope.tkiid,
							"taskParam":{
										"medTestInfo":{
													  "ctScan":$scope.ctScan,
													  "mri": $scope.mri,
													   "xray":$scope.xray
													  }
										}
						}
			
			$http.post('/labTech/postlabTech',dataObj)
			
			
			.success(function(response){
				console.log(response);
			});
			
			$window.location.reload();
		}else{
			console.log("no task is selected");
			$window.alert("no task is selected");
		}
		
		
	}
	
	
	
});


var helloApp= angular.module('doctorApp', ['smart-table']);

helloApp.controller('safeCtrl', function ($scope,$http,$window) {

	//get Intial data
	var refresh= function(){
		$http.post('/doctor/doctorTasks').success(function(response){
	
		  
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
				$http.get('/doctor/doctorTask/'+task.taskId).success(function(response){
			  $scope.processInstanceName=response.processInstanceName; 
			  $scope.tkiid=response.tkiid;
			  $scope.taskDesc=response.description;
			  $scope.patientFName=response.data.variables.person.firstName;
			  $scope.patientMName=response.data.variables.person.middleName;
			  $scope.patientLName=response.data.variables.person.lastName;
			  $scope.patientGender=response.data.variables.person.gender;
			  $scope.patientDob=response.data.variables.person.dateOfBirth;
			
			  //triage Info
			  $scope.bloodPressure=response.data.variables.triageInfo.bloodPressure;
			  $scope.heartBeat=response.data.variables.triageInfo.heartBeat;
			  $scope.height=response.data.variables.triageInfo.height;
			  $scope.temparature=response.data.variables.triageInfo.temparature;
			  $scope.weight=response.data.variables.triageInfo.weight;
			  console.log(response);
			  
		  });
		  
		  
						
	  			}
	
			//post nurse triage info
			
	  
	
});
	  
    


helloApp.controller('postDctrCtrl', function ($scope,$http,$window) {
	

	$scope.postDoctor=function(){
		if($scope.tkiid && $scope.temp && $scope.heartBeat && $scope.bloodpressure && $scope.height && $scope.weight ){
			
			var dataObj = {"tkiid":$scope.tkiid,
							"taskParam":{
										"triageInfo":{
													  "temparature": $scope.temp,
													  "heartBeat": $scope.heartBeat,
													   "bloodPressure":$scope.bloodpressure,
													   "height":$scope.height,
													   "weight":$scope.weight
													  }
										}
						}
			
			$http.post('/doctor/postDoctor',dataObj)
			
			
			.success(function(response){
				console.log(response);
			});
			
			$window.location.reload();
		}else{
			console.log("no task is selected");
		}
		
		
	}
	
	
	
});


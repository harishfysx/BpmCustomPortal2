var helloApp= angular.module('frontDeskGBApp', ['smart-table']);

helloApp.controller('safeCtrl', function ($scope,$http,$window) {

	//get Intial data
	var refresh= function(){
		$http.post('/frontDeskGB/frontDeskGBTasks').success(function(response){
	
		  
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
				$http.get('/frontDeskGB/frontDeskGBTask/'+task.taskId).success(function(response){
					
			  $scope.processInstanceName=response.processInstanceName; 
			  $scope.tkiid=response.tkiid;
			  $scope.taskDesc=response.description;
			  $scope.patientFName=response.data.variables.person.firstName;
			  $scope.patientMName=response.data.variables.person.middleName;
			  $scope.patientLName=response.data.variables.person.lastName;
			  $scope.patientGender=response.data.variables.person.gender;
			  $scope.patientDob=response.data.variables.person.dateOfBirth;
			  
			  $scope.bloodPressure=response.data.variables.triageInfo.bloodPressure;
			  $scope.heartBeat=response.data.variables.triageInfo.heartBeat;
			  $scope.height=response.data.variables.triageInfo.height;
			  $scope.temparature=response.data.variables.triageInfo.temparature;
			  $scope.weight=response.data.variables.triageInfo.weight;
			  
			  $scope.address1=response.data.variables.address.address1
			  $scope.address2 =response.data.variables.address.address2
			  $scope.city=response.data.variables.address.city
			  $scope.country=response.data.variables.address.country
			  $scope.email=response.data.variables.address.email
			  $scope.phone=response.data.variables.address.phone
			  $scope.state=response.data.variables.address.state
			  $scope.zip=response.data.variables.address.zip
			  
			  $scope.expiration=response.data.variables.insuranceInfo.expiration
			  $scope.isInsured=response.data.variables.insuranceInfo.isInsured
			  $scope.memberId=response.data.variables.insuranceInfo.memberId
			  $scope.organization=response.data.variables.insuranceInfo.organization
			  
			  $scope.presDrugList=response.data.variables.diagInfo.presDrug.items
			  
			  $scope.ctScan=response.data.variables.medTestInfo.ctScan
			  $scope.mri=response.data.variables.medTestInfo.mri
			  $scope.xray=response.data.variables.medTestInfo.xray
			
			  console.log(response);
			  
		  });
		  
		  
						
	  			}
	
			//post nurse triage info
			
	  
	
});
	  
    


helloApp.controller('postFrontDeskGBCtrl', function ($scope,$http,$window) {
	

	$scope.finishFrontDeskGB=function(){
		if($scope.tkiid){
			
			var dataObj = {"tkiid":$scope.tkiid}
							
						
			
			$http.post('/frontdeskGB/postFrntDeskGBTask',dataObj)
			
			
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


angular.module("myapp", [])
.controller("appController", function($scope) {
	
	// Initializing empty array of tasks
	$scope.tasks = [];
	$scope.comments = [];
	$scope.task_index = '';
	$scope.new_task = '';
	$scope.new_comment = '';
	$scope.show_add_task_form = false;

	/* 
		** Loading initial tasks data
		@ name : name for task
		@ is_completed : is completed status for task, when checkbox is checked it is considered that checked task is completed
	*/
	$scope.tasks = [
		{name:'Task 1',is_completed:false,comments:[{comment:'comment1',time:new Date()},{comment:'comment2',time:new Date()}]},
		{name:'Task 2',is_completed:true,comments:[]},
		{name:'Task 3',is_completed:false,comments:[]}
	];

	// Display comments for selected task and update value of task index for current task
	$scope.display_comments = function(task,index) {
		$scope.task_index = index;
		if(!task.is_completed) {
			$scope.comments = task.comments;	
		} else {
			$scope.comments = [];
		}
	}

	// Showing comments for first task after loading
	if($scope.tasks.length > 0) {
		$scope.display_comments($scope.tasks[0],0);
	}

	// Creating new task 
	$scope.add_task = function() {
		if(this.new_task != undefined && this.new_task != '') {
			$scope.tasks.push({name:this.new_task,is_completed:false,comments:[]});			
			$scope.reset_forms();
		}
	}

	// Adding comment by taking current task's index
	$scope.add_comment = function() {
		if($scope.tasks[$scope.task_index] != undefined) {
			if($scope.tasks[$scope.task_index].comments != undefined) {
				if(this.new_comment != undefined && this.new_comment != '') {
					$scope.tasks[$scope.task_index].comments.push({comment:this.new_comment,time:new Date()});
					$scope.reset_forms();
				}
			}
		}	
	}

	// Show add task form
	$scope.show_add_task = function() {
		$scope.reset_forms();
		$scope.show_add_task_form=true;
	}

	// Reset all form values
	$scope.reset_forms = function() {
		this.new_task = '';
		this.new_comment = '';
		this.show_add_task_form = false;
	}
})

.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
(function(){
	var module = angular.module("newsModule",[]);
	module.run(function() {
	    AV.initialize("po6ihzz17t3wvqgzip3l3vk8fy1ucx0igogu4e3a68f7uhi4", "4higrd4vrv44fhwdeacxhepcjw2w8l4hldp2vogx3n08gcw8");
	});
	module.controller("newsCtrl",['$http', '$scope', function($http, $scope){
		var News = AV.Object.extend("news");
		$scope.news = [];
	  $scope.newItem = {news_url:'', news_desc:'',image_url:""};

		$scope.editTempItem={};


	  $scope.getItems = function() {
	  	//var Todo = AV.Object.extend("news");
	  	var query = new AV.Query(News);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.news = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }


	  $scope.addItem = function () {
	  	//var News = AV.Object.extend("News");
	  	var news = new News();
		news.set('news_desc',$scope.newItem.news_desc);
	  	news.set('news_url',$scope.newItem.news_url);
		  news.set('image_url',$scope.newItem.image_url);
		news.save(null,{
			success:function(result){
				$scope.news.push(news.toJSON());
				$scope.newItem={news_url:'',news_desc:'',image_url:""};
				alert("新增成功");
			}
		});
	  };

	  //$scope.updateTodoState = function(todoParam) {
	  //	//var Todo = AV.Object.extend("Todo");
	  //	var todo = new News();
	  //	todo.set("objectId",todoParam.objectId);
	  //	todo.set("done",todoParam.done);
	  //	todo.save(null, {
	  //		success: function(result){
	  //		}
	  //	});
	  //}
		$scope.deleteItem=function(newsParam){
			//var News = AV.Object.extend("News");
			var news=new News();
			news.set("objectId",newsParam.objectId);
			news.destroy({
				success: function(news){
					alert("删除成功");
					//console.error($scope.news.indexOf(newsParam));
					$scope.news.splice($scope.news.indexOf(newsParam),1);
					//console.error("success delete");
				},
				error:function(news,error){
					console.error("fail delete");
				}
			});
		}

		$scope.editTemp=function(itemParam){
			$scope.editTempItem=itemParam;
		}

		$scope.editItem=function(){
			//var News =AV.Object.extend("News");
			//$scope.editTempItem.save
			var news = new News();
			news.set("objectId",$scope.editTempItem.objectId);
			news.set('news_desc',$scope.editTempItem.news_desc);
			news.set('news_url',$scope.editTempItem.news_url);
			news.set('image_url',$scope.editTempItem.image_url);

			news.save(null,{
				success:function(news){
					alert("编辑成功");
					$('#myModal').modal('hide');
					console.error("success Edit")
				},
				error:function(news){
					console.error("fail edit");
				}
			});
		}

    $scope.getItems();

	}]);



})();
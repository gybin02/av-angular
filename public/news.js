(function(){
	var module = angular.module("newsModule",[]);
	module.run(function() {
		AV.initialize("po6ihzz17t3wvqgzip3l3vk8fy1ucx0igogu4e3a68f7uhi4", "4higrd4vrv44fhwdeacxhepcjw2w8l4hldp2vogx3n08gcw8");
	});
	module.controller("newsCtrl",['$http', '$scope', function($http, $scope){
		var News = AV.Object.extend("news");
		$scope.news = [];//$scope是一个把view(一个DOM元素)连结到controller上的对象$scope，实际上就是一个JavaScript对象，
						 // controller和view都可以访问它，所以我们可以利用它在两者间传递信息。
						 // 在这个 $scope 对象里，我们既存储数据，又存储将要运行在view上的函数
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
		};


		$scope.addItem = function () {
			//var News = AV.Object.extend("News");
			var news = new News();
			news.set('news_desc',$scope.newItem.news_desc);
			news.set('news_url',$scope.newItem.news_url);
			news.set('image_url',$scope.newItem.image_url);
			news.save(null,{
				success:function(result){
					$scope.$apply(function(){
						$scope.news.push(news.toJSON());
						$scope.newItem={news_url:'',news_desc:'',image_url:""};
						alert("新增成功");
					})
				}
			});
		};

		$scope.deleteItem=function(newsParam){
			//var News = AV.Object.extend("News");
			var news=new News();
			news.set("objectId",newsParam.objectId);
			news.destroy({
				success: function(news){
					$scope.$apply(function(){
						alert("删除成功");
						$scope.news.splice($scope.news.indexOf(newsParam),1);
					})
				},
				error:function(news,error){
					console.error("fail delete");
				}
			});
		};

		$scope.editTemp=function(itemParam){
			$scope.editTempItem=itemParam;
		};

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
		};

		$scope.denyCar=function(itemParam){

		};

		$scope.getItems();

	}]);
	module.controller('CarCtrl', function($scope) {
		var Car=AV.Object.extend("Cars");
		$scope.cars = [];
		$scope.carSold = [];

		$scope.getCars = function() {
			var query = new AV.Query(Car);
			query.equalTo("status",2);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.cars = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};

		//卖车审核
		$scope.passCar=function(itemParam){
			var car = new Car();
			car.set("objectId",itemParam.objectId);
			car.set("status",1);
			car.save(null,{
				success: function () {
					alert('审核通过');
					$scope.$apply(function(){
						$scope.cars.splice($scope.cars.indexOf(itemParam),1);
					})
				},
				error:function(){
					console.error("fail Pass Audit");
				}
			})
		};
		//已交易车辆审核
		$scope.getCarSold = function() {
			var query = new AV.Query(Car);
			query.equalTo("status",3);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.carSold = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};
		$scope.passSoldCar=function(itemParam){
			var car = new Car();
			car.set("objectId",itemParam.objectId);
			car.set("status",4);
			car.save(null,{
				success: function () {
					alert('审核通过');
					$scope.$apply(function(){
						$scope.carSold.splice($scope.carSold.indexOf(itemParam),1);
					})
				},
				error:function(){
					console.error("fail Pass Audit");
				}
			})
		};

		$scope.getCars();
		$scope.getCarSold();

	})


})();
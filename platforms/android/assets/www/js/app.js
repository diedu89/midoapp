(function(){
	var app = angular.module('contacts',['customValidations']);

	app.controller('ViewController', function($scope){
		$scope.view = 'list';

		$scope.setOption = function(view){
			$scope.view = view;
			return true;
		}

		$scope.isSelected = function(view){
			return $scope.view == view;
		}
	});

	app.controller('ListController', [
		'$rootScope','$http','$scope',
		function( $rootScope, $http, $scope){
			$rootScope.contacts = [];

			$scope.getList = function(){
				$http.jsonp(
					'http://midotest.herokuapp.com//contacts.json?callback=JSON_CALLBACK'
				).success(function(contacts){
					$rootScope.contacts = contacts;
				}).error(function(){
					alert("Error al obtener datos");
				});
			}

			$scope.getList();
		}
	]);

	app.controller('FormController', [
		'$rootScope','$http',
		function($rootScope, $http){
			this.contact = {};

			this.addContact = function(){
				var $this = this;
				$http.jsonp(
					'http://midotest.herokuapp.com//create_contact.json?callback=JSON_CALLBACK&contact[name]=' + this.contact.name + "&contact[phone]=" + this.contact.phone
				).success(function(response){
					$rootScope.contacts.push({id: response.id, name: response.name, phone:response.phone});
					$this.contact = {};
				}).error(function(){
					alert("No se pudo crear el contacto");
				});
			}

			return true;
		}
	]);

})();

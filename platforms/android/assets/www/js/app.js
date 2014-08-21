(function(){
	var app = angular.module('contacts',['customValidations']);

	app.controller('ListController', [
		'$rootScope','$http',
		function( $rootScope, $http){
			$rootScope.contacts = [];
			$http.jsonp(
				'http://midotest.herokuapp.com//contacts.json?callback=JSON_CALLBACK'
			).success(function(contacts){
				console.log(contacts);
				$rootScope.contacts = contacts;
			}).error(function(){
				alert("Error al obtener datos");
			});
		}
	]);

	app.controller('ViewController', function(){
		this.view = 'list';

		this.setOption = function(view){
			this.view = view;
			return true;
		}

		this.isSelected = function(view){
			return this.view == view;
		}
	});

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

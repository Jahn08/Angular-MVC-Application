﻿(function () {
	'use strict';

	angular.module('ArticleLibraryApp').controller('AboutUsCtrl', ['$scope', 'InfoReqFactory', 'ErrorService',
		function ($scope, InfoReqFactory, ErrorService) {
			
			var onRequest = function (end) {
				if (end) {
					$scope.sending = false;
					$scope.msg = null;
				}
				else {
					$scope.sending = true;
					$scope.msg = "Please, wait...";
				}
				$scope.isError = false;
			};
			var onError = function (data, msg) {
				if (data) {
					$scope.sending = false;
					$scope.isError = true;
					$scope.msg = ErrorService.formatMsg(msg, data);
				}
			};

			onRequest();

			InfoReqFactory.getAboutUsInfo().then(function (data) {
				$scope.info = data.aboutUs;
				onRequest(true);
			}, onError);
		}]);
})();
angular.module('s3upload_app', [])
.directive('s3upload', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
})

.controller('UploadController', ['$scope', '$http', function($scope, $http) {

  $scope.upload = function(file) {
    // Get The PreSigned URL
    $http.post('/s3_credentials',{ filename: file.name, type: file.type })
      .success(function(resp) {
        // Perform The Push To S3
        $http.put(resp.signedRequest, file, { headers: {'Content-Type': file.type }})
          .success(function(resp) {
            //Finally, We're done
            console.log('Upload Done!')
          })
          .error(function(resp) {
            console.log(resp);
          });
      })
      .error(function(resp) {
        console.log(resp);
      });
  }

}])

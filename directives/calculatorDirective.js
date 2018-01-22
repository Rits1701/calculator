VLApp.directive('calculatorDirective', function () {

    return {

        retrict: "E",

        replace: true,

        scope: true,

        controller: "calculatorCtrl",

        templateUrl: "templates/calculatorTemplate.html",

        link: function (scope, el, attrs) {
            //console.log(attrs.id);
            scope.fetchComponentData(attrs.id);
        }

    };

});
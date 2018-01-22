VLApp.controller('calculatorCtrl',['$scope', '$rootScope','$compile','$timeout','$window', function ($scope, $rootScope,$compile,$timeout,$window) {
    //$scope.data = 
    var posKeyBottomC, posKeyLeftC, posKeyRightC, posKeyTopC;
        $scope.state = {};
    
    $scope.fetchComponentData = function (strCompId) {
        $scope.state = $scope.appData.data[strCompId];
    }

    $window.onkeydown = function(e){
        if(e.keyCode === 27){
            $scope.CalCloseFun();
        }
    };
    angular.element(document).ready(function() {
        //BigNumber.config({ ERRORS: false, ROUNDING_MODE: 0 }); 
        var calculatorContainer = $('<div id="calculatorsource" class="dragable"><div id="calClose" ng-click="CalCloseFun()"></div><div id="rim"><div id="keypad"><div class="horizontal display"><input id="displayPanel" style="display:none !important; type="text" value="0"/> <input id="onlyDisplayPanel" type="text" value="0"/></div><div class="horizontal "><div id="keyC" data-rnc-tag="C" class="key control-key">c</div><div id="empty" ></div><div id="keyDivide" class="key operation-key" value="1">&#x00F7;</div></div><div class="horizontal"><div id="key7" data-rnc-tag="7" class="key keycal">7</div><div id="key8" data-rnc-tag="8" class="key keycal">8</div><div id="key9" data-rnc-tag="9" class="key keycal">9</div><div id="keyMultiply" class="key operation-key" value="2">\u00D7</div></div><div class="horizontal"><div id="key4" data-rnc-tag="4" class="key keycal">4</div><div id="key5" data-rnc-tag="5" class="key keycal">5</div><div id="key6" data-rnc-tag="6" class="key keycal">6</div><div id="keySubtract" class="key operation-key">&#x02013</div></div><div class="horizontal"><div id="key1" data-rnc-tag="1" class="key keycal">1</div><div id="key2" data-rnc-tag="2" class="key keycal">2</div><div id="key3" data-rnc-tag="3" class="key keycal">3</div><div id="keyAdd" class="key operation-key">+</div></div><div class="horizontal"><div id="key0" data-rnc-tag="0" class="key double-wide keycal">0</div><div id="keyDecimalPoint" data-rnc-tag="." class="key keycal">.</div><div id="keyEquals" class="key operation-key">=</div></div></div></div></div>');
        
        angular.element(document.getElementsByClassName('appContainer')[0]).append($compile(calculatorContainer)($scope));
        $('#calculatorsource').children().find('input').addClass('calc');

         $('#calculatorsource').bind('mousedown', function () {
            posKeyLeftC = $('#calculatorsource').css('left')
            posKeyTopC = $('#calculatorsource').css('top')
            posKeyRightC = parseFloat(posKeyLeftC.split('px')) - 270;
            posKeyBottomC = parseFloat(posKeyTopC.split('px')) - 230;

        })  
        $timeout(function() {
        	rnc.calculator();
        },200);
        
 
    });
    
    $scope.$on('LAB_DATA_LOADED', function () {

 
    });
     $scope.isCoveringBox = function() {
        var isCovering = false;
        var textboxes = $(".input");
        var textboxOffset2 = $(".input").offset();
        var textbox2W = ($(".input").outerWidth()) - 20;
        var textbox2H = $(".input").outerHeight();
        var calcOffset = $("#calculatorsource").offset();
        var keypadOffset = ($(".keypadHolder").offset());
        var keypadW = ($(".keypadHolder").outerWidth());
        var keypadH = $(".keypadHolder").outerHeight();

        for (var t = 0; t < $(".input").length; t++) {
            var textbox = textboxes.eq(t);
            var textboxOffset = textbox.offset();
            var _xVar = (textboxOffset.left - calcOffset.left) + 20;
            var _yVar = textboxOffset.top - calcOffset.top;
            var _CxVar = (calcOffset.left - keypadOffset.left);
            var _CyVar = calcOffset.top - keypadOffset.top;
            var _IxVar = (textboxOffset2.left - calcOffset.left) + 20;
            var _IyVar = textboxOffset2.top - calcOffset.top;
            var xVar = Math.abs(_xVar);
            var yVar = Math.abs(_yVar);
            var IxVar = Math.abs(_IxVar);
            var IyVar = Math.abs(_IyVar);
            var CxVar = Math.abs(_CxVar);
            var CyVar = Math.abs(_CyVar);
            var calcW = $("#calculatorsource").outerWidth();
            var calcH = $("#calculatorsource").outerHeight();
            var textboxW = (textbox.outerWidth()) - 20;
            var textboxH = textbox.outerHeight();
            var isYOver, isXOver, isCYOver, isCXOver;
            if (_xVar > 0) isXOver = xVar < calcW;
            else isXOver = xVar < textboxW;
            if (_IxVar > 0) isIXOver = IxVar < calcW;
            else isIXOver = IxVar < textbox2W;
            if (_CxVar > 0) isCXOver = CxVar < keypadW;
            else isCXOver = CxVar < calcW;
            if (_yVar > 0) isYOver = yVar < calcH;
            else isYOver = yVar < textboxH;
            if (_IyVar > 0) isIYOver = IyVar < calcH;
            else isIYOver = IyVar < textbox2H;
            if (_CyVar > 0) isCYOver = CyVar < keypadH;
            else isCYOver = CyVar < calcH;
            isCovering = ((isXOver && isYOver) || (isIXOver && isIYOver));
            if ($(".keypadHolder").css("display") == "block") {
                console.log("block")
                isCovering = ((isXOver && isYOver) || (isCXOver && isCYOver) || (isIXOver && isIYOver))
            }
            if (isCovering) break;
        }
        return isCovering;
    }
    $scope.CalCloseFun = function() {
        $('#calculatorsource').hide();
    }
    $scope.calFunction = function(){
        $('#calculatorsource').show();
        if ($scope.isCoveringBox()) {
            
            $("#calculatorsource").css({ "left": "220px", "top": "410px" });
        }

        $('#calculatorsource').draggable({
            containment: '.appContainer', drag: function (e, ui) {
                $('#calculatorsource').css({'transform':'translate(0,0)'});
            }
        });
    
    }
    
}]);
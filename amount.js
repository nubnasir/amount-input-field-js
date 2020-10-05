/*
	*** Amount validator and auto formatter javaScript
	*** version-1.1
	*** Finance js lib development
	*** Author/Developer: Md. Nasir Uddin Bhuiyan
*/
	var __splitInputValueOnKeyPress = 0;
	var __pasteCursorPosition = 0;

	function validAmount (e) {
		var element = e.target;
		console.log("validAmount" + element.value);
		if(!isValidInputValue(element.value)){
			element.value = '';
			return;
		}

		var cursorPosition = e.target.selectionStart;
		console.log("cursorPosition" + cursorPosition);
		var elValue = element.value.split(".");
		var value = elValue[0].replace(/,/g, '');
		var decimalPart = elValue.length > 1? '.' + elValue[1].replace(',', '') : '';

		var valueArray = value.split('');
		var resultArray = [];
		var counter = 0;
		var temp = '';
		for (var i = valueArray.length - 1; i >= 0; i--) {
			temp += valueArray[i];
			counter++;
			if(counter == 3){
				resultArray.push(temp);
				counter = 0;
				temp = '';
			}
		}

		if(counter > 0){
			resultArray.push(temp);
		}
			
		var result = '';
		for (var i = resultArray.length - 1; i >= 0; i--) {
			temp = resultArray[i].split('');
			for (var j = temp.length - 1; j >= 0; j--) {
				result += temp[j];
			};
			if(i > 0){
				result += ','
			}
		}

		result = result + (decimalPart.length <= 3 ? decimalPart : decimalPart.substring(0,3));
		element.value = result;

		var charCode = (e.which) ? e.which : e.keyCode;
		console.log("charCode" + charCode);
		var cursorPositionAdder = 0;
		console.log("__splitInputValueOnKeyPress" + __splitInputValueOnKeyPress);
		if((charCode >=48 && charCode <=57) || (charCode >=96 && charCode <=105) || charCode == 188 || charCode == 190){
			cursorPositionAdder = result.substring(0,cursorPosition).split(",").length - __splitInputValueOnKeyPress;
		}
		if(detectMob()){
			cursorPosition = result.length;
			cursorPositionAdder = 0;
		}
		console.log("__pasteCursorPosition" + __pasteCursorPosition);
		if(__pasteCursorPosition > 0){
			cursorPositionAdder += __pasteCursorPosition
			__pasteCursorPosition = 0;
		}
		console.log("cursorPositionAdder" + cursorPositionAdder);
		e.target.selectionStart = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
		e.target.selectionEnd = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
	}

	function validChar (event) {
		console.log("validChar"+event.target.value);
		try {
			if(event.target.selectionStart !=0) {
				__splitInputValueOnKeyPress = event.target.value.substring(0,event.target.selectionStart).split(",").length;
			}
		} catch(e){
			__splitInputValueOnKeyPress = 0;
		}
		var charCode = (event.which) ? event.which : event.keyCode;
		if(!isValidInputValue(String.fromCharCode(charCode))){
			return false;
		}
		if((charCode >=48 && charCode <=57) || charCode == 44 || charCode == 46){
			return true;
		}
		return false;
	}

	function isValidInputValue(value){
		return /^-?[\d,.]*$/.test(value);
	}

	function pasteFilter(e){
		console.log("pasteFilter");
		var clipboardData, pastedData;
		e.stopPropagation();
	    e.preventDefault();
	    clipboardData = e.clipboardData || window.clipboardData;
	    pastedData = clipboardData.getData('Text');
	    
		if(pastedData != null && pastedData != '' && pastedData.length > 0) {
			var intiResult = '';
			var valueArray = pastedData.split('');
			for(var i=0; i<valueArray.length; i++){
				if(/^-?[\d]+$/.test(valueArray[i])){
					intiResult+=valueArray[i];
				}
			}
			__pasteCursorPosition = Math.floor(intiResult.length/3) + intiResult.length%3;
			e.target.value=intiResult;
		}
		validAmount(e);
	}

	function detectMob() {
	    const toMatch = [
	        /Android/i,
	        /webOS/i,
	        /iPhone/i,
	        /iPad/i,
	        /iPod/i,
	        /BlackBerry/i,
	        /Windows Phone/i
	    ];

	    return toMatch.some((toMatchItem) => {
	        return navigator.userAgent.match(toMatchItem);
	    });
	}

	(function(){
		var amountInputs = document.getElementsByClassName("amount");
		for(var i=0; i<amountInputs.length; i++){
			amountInputs[i].addEventListener("keyup", validAmount);
			amountInputs[i].addEventListener("keypress", (event) => {event.returnValue =  validChar(event)});
			amountInputs[i].addEventListener("paste", pasteFilter);
		}
	})();
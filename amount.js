/*
	*** Amount validator and auto formatter javaScript
	*** version-1.1
	*** Finance js lib development
	*** Author/Developer: Md. Nasir Uddin Bhuiyan
*/
	var __splitInputValueOnKeyPress = 0;
	/*document.addEventListener('DOMContentLoaded',function(){
		var amountInputs = document.getElementsByClassName("amount");
		for(var i=0; i<amountInputs.length; i++){
					amountInputs[i].onkeyup = validAmount(amountInputs[i]);
					amountInputs[i].onkeypress = validChar(amountInputs[i]);
					amountInputs[i].onpaste = pasteFilter(amountInputs[i]);
		}
	});*/

	function validAmount () {
		console.log("validAmount"+this.value);
		if(!isValidInputValue(this.value)){
			this.value = '';
			return;
		}

		var cursorPosition = this.selectionStart;
		console.log("cursorPosition" + cursorPosition);
		var elValue = this.value.split(".");
		var value = elValue[0].replace(/,/g, '');
		var decimalPart = elValue.length > 1? '.' + elValue[1] : '';

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
		this.value = result;

		var charCode = (this.which) ? this.which : this.keyCode;
		var cursorPositionAdder = 0;
		console.log("__splitInputValueOnKeyPress" + __splitInputValueOnKeyPress);
		if((charCode >=48 && charCode <=57) || (charCode >=96 && charCode <=105) || charCode == 188 || charCode == 190){
			cursorPositionAdder = result.substring(0,cursorPosition).split(",").length - __splitInputValueOnKeyPress;
		}
		console.log("cursorPositionAdder" + cursorPositionAdder);
		this.selectionStart = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
		this.selectionEnd = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
	}

	function validChar (event) {
		console.log("validChar"+event.value);
		try {
			if(event.selectionStart !=0) {
				__splitInputValueOnKeyPress = event.value.substring(0,event.selectionStart).split(",").length;
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

	function pasteFilter(elem){
		console.log("pasteFilter"+elem.value);
		if(elem.value != null && elem.value != '' && elem.value.length > 0) {
			var intiResult = '';
			var valueArray = elem.value.split('');
			for(var i=0; i<valueArray.length; i++){
				if(/^-?[\d]+$/.test(valueArray[i])){
					intiResult+=valueArray[i];
				}
			}
			elem.value=intiResult;
		}
		return true;
	}

	(function(){
		var amountInputs = document.getElementsByClassName("amount");
		for(var i=0; i<amountInputs.length; i++){
			amountInputs[i].addEventListener("keyup", validAmount);
			amountInputs[i].addEventListener("keypress", (event) => {event.returnValue =  validChar(event)});
			// amountInputs[i].onpaste = function() {pasteFilter()};
		}
	})();
	var __splitInputValueOnKeyPress = 0;
	
	function validAmountOnKeyUp (element) {
		var elValue = element.value.split(".");
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
			var temp = resultArray[i].split('');
			for (var j = temp.length - 1; j >= 0; j--) {
				result += temp[j];
			};
			if(i > 0){
				result += ','
			}
		}

		result = result + (decimalPart.length <= 3 ? decimalPart : decimalPart.substring(0,3));
		element.value = result;

		var charCode = (element.which) ? element.which : event.keyCode;
		var cursorPosition = element.selectionStart;
		var cursorPositionAdder = 0;
		if((charCode >=48 && charCode <=57) || (charCode >=96 && charCode <=105) || charCode == 188 || charCode == 190){
			cursorPositionAdder = result.substring(0,cursorPosition).split(",").length - __splitInputValueOnKeyPress;
		}
		element.selectionStart = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
		element.selectionEnd = cursorPosition + (cursorPositionAdder>0? cursorPositionAdder : 0);
	}

	function validAmountOnKeyPress (element) {
		try {
			if(element.selectionStart !=0) {
				__splitInputValueOnKeyPress = element.value.substring(0,element.selectionStart).split(",").length;
			}
		} catch(e){
			__splitInputValueOnKeyPress = 0;
		}
		var charCode = (element.which) ? element.which : event.keyCode;
		if((charCode >=48 && charCode <=57) || charCode == 44 || charCode == 46){
			return true;
		}
		return false;
	}
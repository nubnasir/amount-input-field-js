# Amount Validator Input Field - JavaScript

### Demo link https://nubnasir.github.io/amount-input-field-js/

Key notes
=> Allows numbers 0-9, comma (,) and dot(.)

=> Adds comma(,) automatically in exact position

=> Prevents more that two(2) decimal points

=> No extra additional library is required


How to use
### Step 1 

download amount.js from this github repo

### Step 2 

Add in html file inside head tag

Example:
&lt;head&gt;
&lt;script type="text/javascript" src="amount.js"&gt;&lt;/script&gt;
&lt;/head&gt;

### Step 3

In the amount input field add onkeyup="validAmountOnKeyUp(this)" and onkeypress="return validAmountOnKeyPress(this)"


Example: &lt;input type="text" onkeyup="validAmountOnKeyUp(this)" onkeypress="return validAmountOnKeyPress(this)" &gt;

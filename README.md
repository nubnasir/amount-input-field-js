# Amount Validator Input Field - JavaScript

### Demo link https://nubnasir.github.io/amount-input-field-js/

Key notes
=> Allows numbers 0-9, comma (,) and dot(.)

=> Adds comma(,) automatically in exact position

=> Prevents more that two(2) decimal points

=> No extra additional library is required

=> Filter numbers [0-9] from pasted text

=> No cursor position issue

=> Easy configuration using class name "amount"


How to use 

###(Way 1) with "amount" class
### Step 1 

download amount-2.0.min.js from this github repo

### Step 2 

Add amount-2.0.min.js at the end of the page

Example:
&lt;script type="text/javascript" src="amount-2.0.min.js"&gt;&lt;/script&gt;

### Step 3

In the text input field add class "amount"


Example: &lt;input type="text" class="amount" &gt;

###(Way 2) with custom class name "your_custom_class_name"
### Step 1 

download amount-2.0.min.js from this github repo

### Step 2 

Add amount-2.0.min.js at page &lt;head&gt; tag

Example:
&lt;head&gt;

&lt;script type="text/javascript" src="amount-2.0.min.js"&gt;&lt;/script&gt;

&lt;/head&gt;
### Step 3

Add a custom class in your input field "your_custom_class_name". At the end of the page use function "apply_amount" and pass "your_custom_class_name"

&lt;script type="text/javascript"&gt;

apply_amount('your_custom_class_name');

&lt;/script&gt;

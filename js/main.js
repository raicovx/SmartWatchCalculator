
$(document).ready(function(){
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back"){
			try {
			    tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
       }
    });
    var val;
    var operation = ""; //Determines which calculation occurs dynamically
    var output = $("#output-text");
    var secondInput = false; //Determines if this is the second input for the equation or not.
    
    //Add eventListener for all button clicks
    $(".btn").on("click", function(){
    	
		    	if(this.innerHTML == "+"){
		    		if(output.text().length > 0 || secondInput){
			    		resetOutputField(output, this);
			    		operation = "plus";
			    		secondInput = true;
		    		}else{
		    			errorMessage("Error: Nothing to calculate");
		    		}
		    		
		    	}else if(this.innerHTML == "-"){
		    		if(output.text().length > 0  || secondInput){
		    			resetOutputField(output, this);
			    		operation = "minus";
			    		secondInput = true;
		    		}
		    	}else if(this.innerHTML == "÷"){
		    		if(output.text().length > 0  || secondInput){
		    			resetOutputField(output, this);
		    			operation="divide";
		    			secondInput = true;
		    		}
		    	}else if(this.innerHTML == "√"){
		    		if(output.text().length > 0  || secondInput){
		    			val = Math.sqrt(output.text());
		    			output.text(val);
		    			secondInput = false;
		    		}
		    	}else if(this.innerHTML == "×"){
		    		if(output.text().length > 0  || secondInput){
		    			resetOutputField(output, this);
		    			operation="multiply";
		    			secondInput = true;
		    		}
		    	}else if(this.innerHTML == "="){
		    		//Handle Different operation types when "equals" is pressed
		    		if (operation == "plus"){
		    			val = (val + parseFloat(output.text()));
		    				
		    		}else if (operation == "minus"){
		    			val = (val - parseFloat(output.text()));
		
		    		}else if(operation == "divide"){
		    			val = (val / parseFloat(output.text()));
		
		    		}else if(operation == "multiply"){
		    			alert(val +" x "+parseFloat(output.text()))
		    			val = val * parseFloat(output.text());
		    		}else if(operation == "exponent"){
		    			val = Math.pow(val, output.text());
		    		}
		    		
		    		//only display answer and reset if there was actually an operator selected
		    		if(operation.length > 0){
			    		output.text(val);
			    		operation = "";
			    		$(".operator-btn").removeClass("active-operator");
		    		}else{
		    			errorMessage("Error: No Operation selected (i.e + or -)");
		    		}
		    		secondInput = false;
		    		
		    	}else if(this.innerHTML == "e<sup>x</sup>"){
		    		resetOutputField(output, this);
		    		operation = "exponent";
		    	}else if(this.innerHTML == "C"){
		    		//Clear only current input (preserves varable value)
		    		output.text("");
		    	}else if(this.innerHTML =="AC"){
		    		//Clear All, including variable
		    		output.text("");
		    		val = "";
		    		secondInput = false;
		    	}else if(this.innerHTML =="-/+"){
		    		//Displays negative value, added to variable for calculation on operator click
		    		output.text(-output.text());
		    	}else if(this.innerHTML == "."){
		    		//Prevents more than 1 decimal place being added
 		    		if(output.text().indexOf(".") == -1){
 		    			output.append(this.innerHTML);
 		    		}
    			}else{
    				//FINALLY, if it was none of the above buttons, just append the button value.
		    	    output.append(this.innerHTML);
		    	}
    		
    });
    
    //set value variable and reset the input/output field
    function resetOutputField($param, $btn){
    	if($(".operator-btn").hasClass("active-operator")){
    		$(".operator-btn").removeClass("active-operator");
    		
    	}else{
	    	val = parseFloat(output.text());
			$param.text("");
			
    	}
    	$($btn).addClass("active-operator");
    }
    
    //There was an error, show toast/alert explaining why
    function errorMessage($log){
    	alert($log);
    }
});
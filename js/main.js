
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
    initialButtonCheck(); //Check for button order preferences
    
    
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
                    
                //SETTINGS BUTTONS
                }else if($(this).hasClass("settings-btn")){
                    //hide main screen
                    $(".main-screen").fadeOut();
                    $(".main-screen").css("visibility", "hidden")
                    
                    //populate settings
                    refreshSettings();
                    
                    
                     //show settings
                    $(".settings-screen").css("visibility", "visible")
                    $(".settings-screen").fadeIn();
                   
                }else if($(this).hasClass("settings-close-btn")){
                    //hide settings
                    $(".settings-screen").fadeOut();
                    $(".settings-screen").css("visibility", "hidden")
                    //show main screen
                    $(".main-screen").css("visibility", "visible")
                    $(".main-screen").fadeIn();
                     
                //Number Order Setting Buttons   
                }else if($(this).hasClass("lowerTopBtn")){
                    buttonSwitcher();
                }else if($(this).hasClass("lowerBottomBtn")){
                    buttonSwitcher();
                   
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
    
    //Button Setting Functions
    
    //Initial Setting Check
    function initialButtonCheck(){
        origBttn = localStorage.origBttn; 
                if(origBttn == 'false'){
                    $('.row#one, .row#three').remove();
                   $('.row#two').append('<div class="row" id="three"><button class="number-btn btn">7</button><button class="number-btn btn">8</button><button class="number-btn btn">9</button></div>').prepend('<div class="row" id="one"><button class="number-btn btn">1</button><button class="number-btn btn">2</button><button class="number-btn btn">3</button></div>');
              }        
        if(!origBttn){
           origBttn = localStorage.origBttn = 'true';
        }
    }
    
    //Apply Setting
    function buttonSwitcher(){ 
        origBttn = localStorage.origBttn; 
        if(origBttn == 'false'){
            $('.row#one, .row#three').remove();
                  $('.row#two').prepend('<div class="row" id="three"><button class="number-btn btn">7</button><button class="number-btn btn">8</button><button class="number-btn btn">9</button></div>').append('<div class="row" id="one"><button class="number-btn btn">1</button><button class="number-btn btn">2</button><button class="number-btn btn">3</button></div>');
              localStorage.origBttn = 'true';
            
        }else if(origBttn == 'true'){
            $('.row#one, .row#three').remove();
             $('.row#two').append('<div class="row" id="three"><button class="number-btn btn">7</button><button class="number-btn btn">8</button><button class="number-btn btn">9</button></div>').prepend('<div class="row" id="one"><button class="number-btn btn">1</button><button class="number-btn btn">2</button><button class="number-btn btn">3</button></div>');
             localStorage.origBttn = 'false';
        }else{
            alert('using else??');
            initialButtonCheck();
        }
         refreshSettings();
    }
    //Refresh settings ui
    function refreshSettings(){
        if(localStorage.origBttn == 'true'){
            $(".lowerBottomBtn").removeClass("inactive-setting");                
            $(".lowerTopBtn").addClass("inactive-setting");                
        }else if(localStorage.origBttn == 'false'){
            $(".lowerTopBtn").removeClass("inactive-setting");
            $(".lowerBottomBtn").addClass("inactive-setting");
        }
    }
});
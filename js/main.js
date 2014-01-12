// Make sure a variable is actually an HTML element
objectIsHTMLObject = function(element) {
	return (
		// If browser supports HTMLElement type check to see if it is one
	    (typeof HTMLElement === "object")? element instanceof HTMLElement :
	    // If browser doesn't support HTMLElement (IE) then check other attributes
	    element && typeof element === "object" && element.nodeType === 1 && typeof element.nodeName==="string"
	);
}

var slider = function(slider) {
	var self = this;		
	var slider,				// Slider object
		sliderValue,		// Value of the slider
		sliderNumber,		// Element for text box holding number;
		sliderObject,		// The HTML element passed as argument, converted from jQuery Array to true HTMLObject;
		sliderController;	// The sliding object;
	
	this.value;
	
	// If the slider object has been passed and it is an HTML
	// Element, move forward.
	if (slider && objectIsHTMLObject(slider[0])) {
		// Gather the parts of the slider for this object -
		// This allows you to have multiple slider objects on
		// a page
		sliderObject = slider[0];
		//sliderNumber = $(slider).find(".slider-number");
		sliderController = $(slider).find(".slider-controller");
		slider = $(slider).find(".slider");
		
		
		sliderController.on("mousedown", activate);
		$(document).on("mouseup", deactivate);
	}

	// PRIVATE FUNCTIONS
	// using 'function' declaration to hoist variables
	function activate(event) {
		// Attach the mousemove event to the document
		$(document).bind("mousemove", active);
	}
	
	function active(event) {
		var left;	// Left offset for the controller;
		var width;	// Width of the slider;
		
		// Get actual wudth of the slider. This happens each time
		// the slider is activated so if it is a responsive page
		// the width will update to the new width.
		width = slider.width() - sliderController.width();
		var x = event.pageX - slider.offset().left;
		// Less than 0, so zero the slider
		if (x < 0) {
			sliderController.css("left",0);
			left = 0;
		}
		//Greater than width so max the slider
		else if (x > width) {
			sliderController.css("left",width);
			left = 100;
		}
		// Set the in-the-middle
		else {
			sliderController.css("left",x);
			left = Math.round((x/width)*100,0);
		}
		// Update the text box
		self.value = left;
		//sliderNumber.attr("value",left);
	}
	
	function deactivate(event) {
		// Remove the event
		$(document).unbind("mousemove",active);
		$(document).trigger("slider-done", self);
	}
}

$(document).ready(function() {
	// Activate the slider
	new slider($(".dimmer"));
})


// IF YOU WANT TO CAPTURE THE SLIDER/DIMMER VALUE

// function to execute the slider - captures event and the slider object
// The slider object has a value property that is the current value of the slider.
function finishSlider(event,slider) {
	// Event object
	// console.log(event);
	
	// Slider object
	//console.log(slider);
	
	// Value of slider 
	//console.log(slider.value);
}

// EVENT TO WATCH THE SLIDER
$(document).on("slider-done", finishSlider)

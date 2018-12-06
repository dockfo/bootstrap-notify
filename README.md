# boot-strap-notify
Simple library written in plain vanilla JavaScript.

How to use.

Instantiate the Notify class with notify = new Notify({params}) and off you go. To display notifications call the method notify.show(). You can provide custom params to the class which are :
	
	notifyType		values : string  ('primary', 'secondary', 'success', 'info', 'warning', 'danger')
	hPosition		values : string  ('left', 'right')
	vPosition		values : string  ('top', 'bottom')
	insertPosition		values : string  ('first', 'last')
	hMargin			values : integer (min: 10, max: 20)
	vMargin			values : integer (min: 10, max: 20)
	notifyHeight		values : string or integer ('auto' or min: 100, max: 200)
	notifySpacing		values : integer (min: 5, max: 15)
	autoHide		values : boolean (true, false)
	autoHideTimeIndicator	values : boolean (true, false)
	autoHideTime		values : integer (min: 2000, max: 15000)
	hideOnClick		values : (true, false) 
	showTransition		values : ('slide', 'elastic', 'jelly', 'drop')
	showDuration		values : (min: 400,  max: 1500)
	hideTransition		values : ('rocket', 'slide')
	hideDuration		values : (min: 400,  max: 1500)
	notifyTheme		values : ('default')
	
	notifyType		- notification type
	hPosition		- display notification on the left or right side of the document body
	vPosition		- display notification at the top or at the bottom of the document body
	insertPosition		- display new notifications first or last
	hMargin			- distance in pixels from the top or bottom margin of the document body
	vMargin			- distance in pixels from the top or bottom margin of the document body
	notifyHeight		- true for auto height or height in pixels
	notifySpacing		- vertical spacing in pixels between notification
	autoHide		- true to autohide or false to manually close the notification
	autoHideTimeIndicator	- true display time remaining for closing the notification
	autoHideTime		- display duration in msec
	hideOnClick		- true hide notification on click   
	showTransition		- name of the show transition 
	showDuration		- show transition duration in mscec
	hideTransition		- name of the hide transition
	hideDuration		- hide transition duration in mscec
	notifyTheme		- name of the theme
					  
	
	
	

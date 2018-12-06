# boot-strap-notify
Simple library written in plain vanilla JavaScript.

How to use.
Instantiate the Notify class with notify = new Notify(params) and off you go. To display notifications call the method notify.show(params). You can provide custom params to the class which are :
	
	notifyType (values : string) display notifications as card or as block
	hPosition (values : string) display notification on the left or right side of the document body

vPosition (values : string) display notification at the top or at the bottom of the document body

insertPosition (values : string) display new notifications first or last

hMargin	(values : integer) distance in pixels from the top or bottom margin of the document body

vMargin (values : integer) distance in pixels from the top or bottom margin of the document body

notifyHeight (values : true or integer) true for auto height or height in pixels

notifySpacing (values : integer) vertical spacing in pixels between notification

autoHide (values : boolean) true to autohide or false to manually close the notification

autoHideTimeIndicator (values : boolean) true display time remaining for closing the notification

autoHideTime (values : integer) display duration in msec

hideOnClick (values : boolean) true hide notification on click   

showTransition (values : string) name of the show transition 

showDuration (values : integer) show transition duration in mscec

hideTransition (values : string) name of the hide transition

hideDuration (values : integer) hide transition duration in mscec

notifyTheme (values : string) name of the theme
					  
	
	
	

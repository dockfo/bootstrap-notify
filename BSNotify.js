*  @package      BSNotify v 0.4
 * @version      v 0.1
 * @link         https://github.com/dockfo/boot-strap-notify
*/

'use strict'

  class Notify {
    // start class

    //constructor
    constructor(params){

      //properties
      this.setup = function (params = null){      // initializing prperties
      // default values
          this.notifyType = 'card'                // values : 'card', 'block'
          this.hPosition = 'right';               // values : 'left', 'right'
          this.vPosition = 'top';                 // values : 'top', 'bottom'
          this.insertPosition = 'first'           // values : 'first', 'last'
          this.hMargin = 10;                      // values : pixels from the left or right margin of the document body
          this.vMargin = 10;                      // values : pixels from the top or bottom margin of the document body
          this.notifySpacing = 5;                 // values : pixels vertical spacing between notifications
          this.autoHide = true;                   // values : true, false
          this.autoHideTimeIndicator = true       // values : true, false
          this.autoHideTime = 8000;               // values : time in microseconds - display duration without the transitions time
          this.showTransition = 'slide';          // values : available show transitions : 'slide', 'jelly', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          this.showDuration = 800;                // values : time in microseconds - show transition duration
          this.hideTransition = 'slide';          // values : available hide trnsitions : 'slide', 'elastic', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          this.hideDuration = 800;                // values : time in microseconds - hide transition duration
          this.hideOnClick = true;                // values : true false
          this.pushDownClass = 'pushdown';
          this.pushDownDuration = 100;
      // user defined values on instantiating the Notify class
        if(params !== null && typeof(params) === "object"){       // check for validity of user values provided ...
          let _this = this;
          let userParams = this.checkUserOverrides(params);
          Object.keys(userParams).forEach(function(param){
            _this[param] = userParams[param];                     // ... and instantiating them
          });
        }
      };

      this.userOverrides = function(param, data = null){
        switch(param){
          case 'showClass' :
              return ('notify-show-' + this.showTransition);
            break;
          case 'hideClass' :
              return ('notify-hide-' + this.hideTransition);
            break;
          case 'pushDownClass' :
              return (this.pushDownClass);
            break;
          case 'showAnimation' :
              return (this.showTransition + ' ' + this.showDuration + 'ms linear both');
            break;
          case 'hideAnimation' :
              return (this.hideTransition + ' ' + this.hideDuration + 'ms linear both');
            break;
          case 'pushDownAnimation' :
              return (this.pushDownClass + ' ' + this.pushDownDuration + 'ms linear both');
            break;
          case 'notifyClass' :
              return ('notify-' + this.checkNotifyType(data));
            break;
          case 'notifySpacing' :
              if(this.vPosition === 'top'){
                return ('0 0 ' + this.notifySpacing + 'px 0');
              }else{
                return (this.notifySpacing + 'px 0 0 0');
              }
            break;
          default:
              console.warn('BSNotify v0.4 - param' + ' : \'' + param + '\' - Parameter does not exists.');    // warning in console in case of bad value provided
            return false;
        }
      };

      this.getParams = function(){
        return  { notifyType : this.notifyType,
        hPosition : this.hPosition,
        vPosition : this.vPosition,
        insertPosition : this.insertPosition,
        hMargin : this.hMargin,
        vMargin : this.vMargin,
        notifySpacing : this.notifySpacing,
        autoHide : this.autoHide,
        autoHideTimeIndicator : this.autoHideTimeIndicator,
        autoHideTime : this.autoHideTime,
        showTransition : this.showTransition,
        showDuration : this.showDuration,
        hideTransition : this.hideTransition,
        hideDuration : this.hideDuration,
        hideOnClick : this.hideOnClick,
        pushDownClass : this.pushDownClass,
        pushDownDuration : this.pushDownDuration};
      };

      this.createContainer = function(){                                      // create container for the notification divs
        if(!(document.getElementById('notifycontainer'))){
          let container = document.createElement('div');
          container.setAttribute('id', 'notifycontainer');
          container.classList.add('notifycontainer');
          container.style[this.hPosition] = this.hMargin + 'px';
          container.style[this.vPosition] = this.vMargin + 'px';
          document.body.insertBefore(container, document.body.childNodes[0]);
        }
      };

      this.checkUserOverrides = function(params){                               // check user overrides
          let userParams = {};
          let setupString = { notifyType            : [ 'card', 'block' ],
                              notifyTheme           : [ 'plain', ''],
                              hPosition             : [ 'left', 'right' ],
                              vPosition             : [ 'top', 'bottom' ],
                              insertPosition        : [ 'first', 'last'],
                              autoHide              : [ true, false ],
                              autoHideTimeIndicator : [ true, false ],
                              showTransition        : [ 'slide', 'elastic', 'jelly', 'drop', 'smack', 'spin', 'clock', 'grow', 'rocket' ],
                              hideTransition        : [ 'slide', 'elastic', 'jelly', 'drop', 'smack', 'spin', 'clock', 'grow', 'rocket' ],
                              hideOnClick           : [ true, false ]
                            };
          let setupNumeric = {  hMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for hMargin property
                                vMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for vMargin property
                                notifySpacing   : { min : 5,    max : 20 },       // minimum and maximum limits for notifySpacing property
                                autoHideTime    : { min : 2000, max : 15000 },    // minimum and maximum limits for autoHideTime property
                                showDuration    : { min : 400,  max : 1500 },     // minimum and maximum limits for showDuration property
                                hideDuration    : { min : 400,  max : 1500 }      // minimum and maximum limits for hMahideDurationrgin property
                              };
            Object.keys(params).forEach(function(param){
              if( (setupString.hasOwnProperty(param) && setupString[param].includes(params[param])) || (setupNumeric.hasOwnProperty(param) && typeof(params[param]) === 'number' && params[param] >= setupNumeric[param].min && params[param] <= setupNumeric[param].max  ) ){
                  userParams[param] = params[param];
              }else{
                console.warn('BSNotify v0.4 - ' + param + ' : \'' + params[param] + '\' - Parameter does not exists or wrong value is provided.')
              }

            });
          return userParams;
        };

      this.checkNotifyType = function(type){
          let notify = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
          if(notify.includes(type)){
            return type;
          }else{
            console.warn('BSNotify v0.4 - type' + ' : \'' + type + '\' - Notify type of \'' + type + '\' does not exists.');
            return 'danger';
          }
      };

      this.formatMessage = function(message, type){       // creating the message displayed inside notification div depending on notification type (primary, warning, danger etc.)
        let html = message;
        return html;                                      // returns html string
      }

      this.setup(params);
    }

    //methods

    show(message, type){
          this.createContainer();
          let params = this.getParams();
          let txtMessage = this.formatMessage(message, type);
          let showClass = this.userOverrides('showClass');
          let showAnimation = this.userOverrides('showAnimation');
          let hideClass = this.userOverrides('hideClass');
          let hideAnimation = this.userOverrides('hideAnimation');
          let notifyClass = this.userOverrides('notifyClass', type);
          let notifySpacing = this.userOverrides('notifySpacing');
          let pushDownClass = this.userOverrides('pushDownClass');
          let pushDownAnimation = this.userOverrides('pushDownAnimation');
          let container = document.getElementById('notifycontainer');
          let notify = document.createElement('div');

            if(container.hasChildNodes()){
                notify.classList.add(pushDownClass);
                notify.style.animation = pushDownAnimation;
                setTimeout(function(){
                  notify.classList.remove(pushDownClass);
                  notify.classList.add(notifyClass, showClass);
                  notify.style.animation = showAnimation;
                  notify.style.margin = notifySpacing;
                  notify.innerHTML = message;
                }, this.pushDownDuration)
            }else{
                notify.classList.add(notifyClass, showClass);
                notify.style.animation = showAnimation;
                notify.innerHTML = message;
            }
            if(this.vPosition === 'top'){
                container.insertBefore(notify, container.childNodes[0]);
            }else{
                container.appendChild(notify);
            }

              setTimeout(function(){
                notify.classList.remove(showClass);
              }, this.showDuration);

              setTimeout(function(){
                setTimeout(function(){
                  notify.classList.add(hideClass);
                  notify.style.animation = hideAnimation;
                  setTimeout(function(){
                    notify.parentNode.removeChild(notify);
                    if(!container.hasChildNodes()){
                      document.body.removeChild(container);
                    }
                  }, params.hideDuration);
                }, this.showDuration);

              }, this.autoHideTime + this.showDuration + this.hideDuration);
    }
    //end class
  }

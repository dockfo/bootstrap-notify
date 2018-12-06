/**
*  @package      BSNotify v 0.4
 * @version      v 0.1
 * @link         https://github.com/dockfo/boot-strap-notify
*/

'use strict'

  class Notify {
    // start class

    //constructor
    constructor(params){

    // properties
      this.setup = function (params = null){      // initializing prperties
    // default values
          this.notifyType = 'card'                // values : 'card', 'block'
          this.hPosition = 'right';               // values : 'left', 'right'
          this.vPosition = 'top';                 // values : 'top', 'bottom'
          this.insertPosition = 'first'           // values : 'first', 'last'
          this.hMargin = 10;                      // values : pixels -> from the left or right margin of the document body
          this.vMargin = 10;                      // values : pixels -> from the top or bottom margin of the document body
          this.notifyHeight = 100                 // values : true for auto height or number in pixels -> height of the notification
          this.notifySpacing = 10;                // values : pixels -> vertical spacing between notifications
          this.autoHide = true;                   // values : true, false
          this.autoHideTimeIndicator = true       // values : true, false
          this.autoHideTime = 8000;               // values : time in microseconds -> display duration without the transitions time
          this.hideOnClick = true;                // values : true false
          this.showTransition = 'slide';          // values : available show transitions -> 'slide', 'jelly', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          this.showDuration = 800;                // values : time in microseconds -> show transition duration
          this.hideTransition = 'rocket';         // values : available hide trnsitions -> 'slide', 'elastic', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          this.hideDuration = 800;                // values : time in microseconds -> hide transition duration
    // not user definable properties
          this.pushDownClass = 'pushdown';
          this.pushDownDuration = 100;
    // user defined values on instantiating the Notify class
        if(params !== null && typeof(params) === "object"){       // check for validity of user values provided ...
          let _this = this;
          let userParams = this.checkUserOverrides(params);
          Object.keys(userParams).forEach(function(param){
            _this[param] = userParams[param];                     // ... and setting them
          });
        }
      };

      this.checkUserOverrides = function(params){                               // check user provided overrides
          let userParams = {};
          let setupString = { notifyType            : [ 'card', 'block' ],
                              hPosition             : [ 'left', 'right' ],
                              vPosition             : [ 'top', 'bottom' ],
                              insertPosition        : [ 'first', 'last'],
                              notifyHeight          : [ 'auto' ],
                              autoHide              : [ true, false ],
                              autoHideTimeIndicator : [ true, false ],
                              showTransition        : [ 'slide', 'elastic', 'jelly', 'drop', 'smack', 'spin', 'clock', 'grow', 'rocket' ],
                              hideTransition        : [ 'slide', 'elastic', 'jelly', 'drop', 'smack', 'spin', 'clock', 'grow', 'rocket' ],
                              notifyTheme           : [ 'default'],
                              hideOnClick           : [ true, false ]
                            };
          let setupNumeric = {  hMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for hMargin property
                                vMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for vMargin property
                                notifyHeight    : { min : 100,  max : 200},       // minimum and maximum limits for notifyHeight property
                                notifySpacing   : { min : 5,    max : 15 },       // minimum and maximum limits for notifySpacing property
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

      this.userOverrides = function(param, data = null){
        switch(param){
          case 'showClass' :
              if(this.notifyType === 'card'){
                return ('notify-show-' + this.showTransition);
              }else if(this.notifyType === 'block'){
                return ('notify-block-show-' + this.showTransition);
              }
          case 'hideClass' :
              if(this.notifyType === 'card'){
                return ('notify-hide-' + this.hideTransition);
              }else if(this.notifyType === 'block'){
                return ('notify-block-hide-' + this.hideTransition);
              }
          case 'pushDownClass' :
              return (this.pushDownClass);
          case 'showAnimation' :
              if(this.notifyType === 'card'){
                return (this.showTransition + "-" + this.hPosition + ' ' + this.showDuration + 'ms linear both');
              }else if(this.notifyType === 'block'){
                return (this.showTransition + "-" + this.vPosition + ' ' + this.showDuration + 'ms linear both');
              }
          case 'hideAnimation' :
              if(this.notifyType === 'card'){
                return (this.hideTransition + "-" + this.hPosition + ' ' + this.hideDuration + 'ms linear both');
              }else if(this.notifyType === 'block'){
                return (this.hideTransition + "-" + this.vPosition + ' ' + this.hideDuration + 'ms linear both');
              }
          case 'pushDownAnimation' :
              return (this.pushDownClass + ' ' + this.pushDownDuration + 'ms linear both');
          case 'notifyClass' :
              if(this.notifyType === 'card'){
                return ('notify-' + this.checkNotifyType(data));
              }else if(this.notifyType === 'block'){
                return ('notify-block-' + this.checkNotifyType(data));
              }
          case 'notifySpacing' :
              if(this.vPosition === 'top'){
                return ('0 0 ' + this.notifySpacing + 'px 0');
              }else{
                return (this.notifySpacing + 'px 0 0 0');
              }
          case 'notifyHeight' :
              if(this.notifyType === 'card'){
                if(this.notifyHeight === 'auto'){
                  return ('auto');
                }else if(typeof(this.notifyHeight) === 'number'){
                  return (this.notifyHeight + 'px');
                }
              }else if(this.notifyType === 'block'){
                return ('60px');
              }
            break;
          default:
              console.warn('BSNotify v0.4 - param' + ' : \'' + param + '\' - Parameter does not exists.');    // warning in console in case of bad value provided
            return false;
        }
      };

      this.createContainer = function(){                                                                      // create container for the notification divs
        if(!(document.getElementById('notifycontainer-' + this.vPosition + this.hPosition))){
          let container = document.createElement('div');
          container.setAttribute('id', 'notifycontainer-' + this.vPosition + this.hPosition);
          container.classList.add('notifycontainer');
          container.style[this.hPosition] = this.hMargin + 'px';
          container.style[this.vPosition] = this.vMargin + 'px';
          document.body.insertBefore(container, document.body.childNodes[0]);
        }
      };

      this.createContainerBlock = function(){                                                                      // create container for the notification divs
        if(!(document.getElementById('notifycontainer-' + this.vPosition))){
          let container = document.createElement('div');
          container.setAttribute('id', 'notifycontainer-' + this.vPosition);
          container.classList.add('notifycontainer-block');
          container.style[this.vPosition] = '0px';
          document.body.insertBefore(container, document.body.childNodes[0]);
        }
      };

      this.checkNotifyType = function(type){
          let notify = ['primary', 'success', 'info', 'warning', 'danger'];
          if(notify.includes(type)){
            return type;
          }else{
            console.warn('BSNotify v0.4 - type' + ' : \'' + type + '\' - Notify type of \'' + type + '\' does not exists.');
            return 'danger';
          }
      };

      this.formatMessage = function(_message, type = 'danger', theme = 'default'){       // creating the message displayed inside notification div depending on notification type (primary, warning, danger etc.)
        let icon;
        let iconNotifyType;
        if(this.notifyType === 'card'){
          iconNotifyType = 'icon-card';
        }else if(this.notifyType === 'block'){
          iconNotifyType = 'icon-block';
        }
        switch(type){
          case 'primary':
              icon = 'glyphicon glyphicon-plus-sign';
            break;
          case 'success':
              icon = '  glyphicon glyphicon-ok-sign';
            break;
          case 'info':
              icon = 'glyphicon glyphicon-info-sign';
            break;
          case 'warning':
              icon = 'glyphicon glyphicon-question-sign';
            break;
          case 'danger':
              icon = 'glyphicon glyphicon-exclamation-sign';
            break;

        }

        let html = '<div class="container-fluid">'
                 +    '<div class="row">'
                 +       '<i class="' + icon + ' ' + iconNotifyType +'"></i>'
                 +      '<div class="col-sm-10">This is a \"' + this.vPosition + ' ' + this.hPosition + '\" notify with Bootstrap type : \"' + type + '\" and \"' + theme + '\" theme.</div>'
                 +      '</div>'
                 +    '</div>'
                 + '</div>';



        return html;                                                                    // returns html string
      }

      this.setup(params);
    }

    //methods

    show(message, type = 'danger',  theme = 'default'){

          if(this.notifyType === 'card'){
            // initialize vars
                this.createContainer();
                let _this = this;
                let txtMessage = this.formatMessage(message, type, theme);
                let showClass = this.userOverrides('showClass');
                let showAnimation = this.userOverrides('showAnimation');
                let hideClass = this.userOverrides('hideClass');
                let hideAnimation = this.userOverrides('hideAnimation');
                let notifyClass = this.userOverrides('notifyClass', type, theme);
                let notifySpacing = this.userOverrides('notifySpacing');
                let notifyHeight = this.userOverrides('notifyHeight');
                let pushDownClass = this.userOverrides('pushDownClass');
                let pushDownAnimation = this.userOverrides('pushDownAnimation');
                let container = document.getElementById('notifycontainer-' + this.vPosition + this.hPosition);
                let notify = document.createElement('div');

            // display notification
                  if(container.hasChildNodes()){                                        // add pushDown class to first notification
                      notify.classList.add(pushDownClass);
                      notify.style.animation = pushDownAnimation;
                      setTimeout(function(){
                        notify.classList.remove(pushDownClass);
                        notify.classList.add(notifyClass, showClass);
                        notify.style.animation = showAnimation;
                        notify.style.margin = notifySpacing;
                        notify.style.height = notifyHeight;
                        notify.innerHTML = txtMessage;
                      }, this.pushDownDuration)
                  }else{
                      notify.classList.add(notifyClass, showClass);                     // first notification without pushDown class
                      notify.style.animation = showAnimation;
                      notify.style.margin = notifySpacing;
                      notify.style.height = notifyHeight;
                      notify.innerHTML = txtMessage;
                  }
                  if(this.vPosition === 'top'){
                    if(this.insertPosition === 'first'){
                      container.insertBefore(notify, container.childNodes[0]);          // display every new notification in first position
                    }else{
                      container.appendChild(notify);
                    }
                  }else if(this.vPosition === 'bottom'){
                    if(this.insertPosition === 'first'){
                      container.appendChild(notify);
                    }else{
                      container.insertBefore(notify, container.childNodes[0]);
                    }
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
                      }, _this.hideDuration);
                    }, _this.showDuration);
                  }, this.autoHideTime + this.showDuration + this.hideDuration);
          }else if(this.notifyType === 'block'){
            this.createContainerBlock();
            //let _this = this;
            let txtMessage = this.formatMessage(message, type, theme);

            let showClass = this.userOverrides('showClass');
            let showAnimation = this.userOverrides('showAnimation');
            let hideClass = this.userOverrides('hideClass');
            let hideAnimation = this.userOverrides('hideAnimation');
            let notifyClass = this.userOverrides('notifyClass', type, theme);
            let notifySpacing = this.userOverrides('notifySpacing');
            let notifyHeight = this.userOverrides('notifyHeight');
            let pushDownClass = this.userOverrides('pushDownClass');
            let pushDownAnimation = this.userOverrides('pushDownAnimation');
            let container = document.getElementById('notifycontainer-' + this.vPosition);
            let notify = document.createElement('div');

            if(container.hasChildNodes()){                                        // add pushDown class to first notification
                notify.classList.add(pushDownClass);
                notify.style.animation = pushDownAnimation;
                setTimeout(function(){
                  notify.classList.remove(pushDownClass);
                  notify.classList.add(notifyClass, showClass);
                  notify.style.animation = showAnimation;
                  notify.style.margin = notifySpacing;
                  notify.style.height = notifyHeight;
                  notify.innerHTML = txtMessage;
                }, this.pushDownDuration)
            }else{
                notify.classList.add(notifyClass, showClass);                     // first notification without pushDown class
                notify.style.animation = showAnimation;
                notify.style.margin = notifySpacing;
                notify.style.height = notifyHeight;
                notify.innerHTML = txtMessage;
            }
            container.appendChild(notify);


          }

    }
    //end class
  }

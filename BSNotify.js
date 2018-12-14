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
      let _this = this;
      let setup = function (params = null){      // initializing prperties
    // default values
          _this.notifyType = 'card'                // values : 'card', 'block'
          _this.hPosition = 'right';               // values : 'left', 'right'
          _this.vPosition = 'top';                 // values : 'top', 'bottom'
          _this.insertPosition = 'first'           // values : 'first', 'last'
          _this.hMargin = 10;                      // values : pixels -> from the left or right margin of the document body
          _this.vMargin = 10;                      // values : pixels -> from the top or bottom margin of the document body
          _this.notifyHeight = 70                  // values : true for auto height or number in pixels -> height of the notification
          _this.notifySpacing = 10;                // values : pixels -> vertical spacing between notifications
          _this.autoHide = true;                   // values : true, false
          _this.autoHideInd = true;                // values : true, false
          _this.autoHideTime = 15000;              // values : time in microseconds -> display duration without the transitions time
          _this.hideOnClick = true;                // values : true false
          _this.showTransition = 'slide';          // values : available show transitions -> 'slide', 'jelly', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          _this.showDuration = 800;                // values : time in microseconds -> show transition duration
          _this.hideTransition = 'rocket';         // values : available hide trnsitions -> 'slide', 'elastic', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          _this.hideDuration = 1500;               // values : time in microseconds -> hide transition duration
          // not user definable properties
          _this.clearanceDuration = 200;

          _this.setParams(params);
      };

      setup(params);
    }

    //methods

    getParams(){
      return(_this);
    }

    setParams(params){
      // user defined values on instantiating the Notify class
      let _this = this;
      if(params !== null && typeof(params) === "object"){       // check for validity of user values provided ...
        //let _this = this;
        let userParams = function(params){                              // check user provided overrides
                          let userParams = {};
                          let setupString = { notifyType            : [ 'card', 'block' ],
                                              hPosition             : [ 'left', 'right' ],
                                              vPosition             : [ 'top', 'bottom' ],
                                              insertPosition        : [ 'first', 'last'],
                                              notifyHeight          : [ 'auto' ],                                // todo
                                              autoHide              : [ true, false ],                           // todo
                                              autoHideInd           : [ true, false ],
                                              showTransition        : [ 'slide', 'jelly', 'wall', 'random'],
                                              hideTransition        : [ 'rocket', 'random' ],
                                              notifyStyle           : [ 'default', 'random'],                    // todo
                                              hideOnClick           : [ true, false ]                            // todo
                                            };
                          let setupNumeric = {  hMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for hMargin property
                                                vMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for vMargin property
                                                notifyHeight    : { min : 50,  max : 200},        // minimum and maximum limits for notifyHeight property
                                                notifySpacing   : { min : 5,    max : 15 },       // minimum and maximum limits for notifySpacing property
                                                autoHideTime    : { min : 2000, max : 15000 },    // minimum and maximum limits for autoHideTime property
                                                showDuration    : { min : 400,  max : 2000 },     // minimum and maximum limits for showDuration property
                                                hideDuration    : { min : 400,  max : 2000 }      // minimum and maximum limits for hMahideDurationrgin property
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

        Object.keys(params = userParams(params)).forEach(function(param){
          _this[param] = params[param];                     // ... and setting them
        });
      }
    }

    show(message, type,  style = 'default'){
          let _this = this;
          let createContainer = function(){
                              if(_this.notifyType === 'card'){
                                if(!(document.getElementById('notifycontainer-' + _this.vPosition + _this.hPosition))){
                                  let container = document.createElement('div');
                                  container.setAttribute('id', 'notifycontainer-' + _this.vPosition + _this.hPosition);
                                  container.classList.add('notifycontainer');
                                  container.style[_this.hPosition] = _this.hMargin + 'px';
                                  container.style[_this.vPosition] = _this.vMargin + 'px';
                                  document.body.insertBefore(container, document.body.childNodes[0]);
                                }
                              } else if(_this.notifyType === 'block'){
                                if(!(document.getElementById('notifycontainer-' + _this.vPosition))){
                                  let container = document.createElement('div');
                                  container.setAttribute('id', 'notifycontainer-' + _this.vPosition);
                                  container.classList.add('notifycontainer-block');
                                  container.style[_this.vPosition] = '0px';
                                  document.body.insertBefore(container, document.body.childNodes[0]);
                                }
                              }
                            };

          let userOverrides = function(param, data = null){
            let checkNotifyType = function(type){
                                    let notify = ['primary', 'success', 'info', 'warning', 'danger'];
                                    if(notify.includes(type)){
                                      return type;
                                    }else{
                                      console.warn('BSNotify v0.4 - type' + ' : \'' + type + '\' - Notify type of \'' + type + '\' does not exists.');
                                      return 'danger';
                                    }
                                };
            switch(param){
              case 'showClass' :
                  if(_this.notifyType === 'card'){
                    return ('notify-show-' + _this.showTransition);
                  }else if(_this.notifyType === 'block'){
                    return ('notify-block-show-' + _this.showTransition);
                  }
              case 'hideClass' :
                  if(_this.notifyType === 'card'){
                    return ('notify-hide-' + _this.hideTransition);
                  }else if(_this.notifyType === 'block'){
                    return ('notify-block-hide-' + _this.hideTransition);
                  }
              case 'showAnimation' :
                  if(_this.notifyType === 'card'){
                    return (_this.showTransition + "-" + _this.hPosition + ' ' + _this.showDuration + 'ms linear forwards');
                  }else if(_this.notifyType === 'block'){
                    return (_this.showTransition + "-" + _this.vPosition + ' ' + _this.showDuration + 'ms linear forwards');
                  }
              case 'hideAnimation' :
                  if(_this.notifyType === 'card'){
                    return (_this.hideTransition + "-" + _this.hPosition + ' ' + _this.hideDuration + 'ms linear forwards');
                  }else if(_this.notifyType === 'block'){
                    return (_this.hideTransition + "-" + _this.vPosition + ' ' + _this.hideDuration + 'ms linear forwards');
                  }
              case 'notifyClass' :
                  if(_this.notifyType === 'card'){
                    return ('notify-' + checkNotifyType(data));
                  }else if(_this.notifyType === 'block'){
                    return ('notify-block-' + checkNotifyType(data));
                  }
              case 'notifySpacing' :
                  if(_this.vPosition === 'top'){
                    return ('0 0 ' + _this.notifySpacing + 'px 0');
                  }else{
                    return (_this.notifySpacing + 'px 0 0 0');
                  }
              case 'notifyHeight' :
                  if(_this.notifyType === 'card'){
                    if(_this.notifyHeight === 'auto'){
                      return ('auto');
                    }else if(typeof(_this.notifyHeight) === 'number'){
                      return (_this.notifyHeight + 'px');
                    }
                  }else if(_this.notifyType === 'block'){
                    return ('60px');
                  }
                break;
              default:
                  console.warn('BSNotify v0.4 - param' + ' : \'' + param + '\' - Parameter does not exists.');    // warning in console in case of bad value provided
                return false;
            }
          };

          let formatMessage = function(message, type = 'danger', style = 'default'){       // creating the message displayed inside notification div depending on notification type (primary, warning, danger etc.)
                            let icon;
                            let iconNotifyType;
                            if(_this.notifyType === 'card'){
                              iconNotifyType = 'icon-card';
                            }else if(_this.notifyType === 'block'){
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
                                     +      '<div class="progressbar"></div>'
                                     +    '</div>'
                                     +    '<div class="row" aligh="right">'
                                     +      '<div class="col-sm-12"><button type="button" class="close notifyclose" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                                     +       '</div>'
                                     +    '</div>'
                                     +    '<div class="row">'
                                     +       '<i class="' + icon + ' ' + iconNotifyType +'" style="font-size:' + _this.notifyHeight * 150/100 + 'px"></i>'
                                     +      '<div class="col-sm-10">This is a \"' + _this.vPosition + ' ' + _this.hPosition + '\" notify with Bootstrap type : \"' + type + '\" and \"' + style + '\" style.</div>'
                                     +      '</div>'
                                     + '</div>';



                            return html;                                                                    // returns html string
                          }

          if(this.notifyType === 'card'){
            // initialize vars
                createContainer();
                let txtMessage = formatMessage(message, type, style);
                let container = document.getElementById('notifycontainer-' + this.vPosition + this.hPosition);
                let notify = document.createElement('div');
                let _notify;
                let addShowTransition = function(){
                          notify.classList.add(userOverrides('notifyClass', type, style), userOverrides('showClass'));
                          notify.style.animation = userOverrides('showAnimation');
                          notify.style.margin = userOverrides('notifySpacing');
                          notify.style.height = userOverrides('notifyHeight');
                          notify.innerHTML = txtMessage;
                  }

                  if(this.vPosition === 'top'){
                    if(this.insertPosition === 'first'){
                        if(container.childNodes.length > 0){
                          container.insertBefore(notify, container.childNodes[0]);
                          _notify = container.firstChild;
                          let startTime = new Date().getTime();
                          let currentTime;
                          let endProgress = _this.clearanceDuration;
                          let percentProgress = 0;
                          let push = setInterval(function(){
                            currentTime = new Date().getTime();
                            percentProgress = (currentTime-startTime)/endProgress;
                            notify.style.height = Math.floor(_this.notifyHeight * percentProgress) + 'px';
                            notify.style.margin = '0 0 ' + Math.floor(_this.notifySpacing * percentProgress) + 'px 0';
                            if(currentTime-startTime >= endProgress){
                              clearInterval(push);
                              addShowTransition();
                            }
                          }, 10);
                        }else{
                          container.appendChild(notify);
                          addShowTransition();
                        }
                    }else{
                      container.appendChild(notify);
                      addShowTransition();
                    }
                  }else if(this.vPosition === 'bottom'){
                    if(this.insertPosition === 'first'){
                      container.appendChild(notify);
                      if(container.childNodes.length != 1){
                        let startTime = new Date().getTime();
                        let currentTime;
                        let endProgress = _this.clearanceDuration;
                        let percentProgress = 0;
                        let push = setInterval(function(){
                          currentTime = new Date().getTime();
                          percentProgress = (currentTime-startTime)/endProgress;
                          notify.style.height = Math.floor(_this.notifyHeight * percentProgress) + 'px';
                          notify.style.margin = Math.floor(_this.notifySpacing * percentProgress) + 'px 0 0 0';
                          if(currentTime-startTime >= endProgress){
                            clearInterval(push);
                            addShowTransition();
                          }
                        }, 10);
                      }else{
                        addShowTransition();
                      }
                    }else{
                      container.insertBefore(notify, container.childNodes[0]);
                      addShowTransition();
                    }
                  }
                  setTimeout(function(){
                    notify.classList.remove(userOverrides('showClass'));
                    notify.style.animation ='';
                    if(_this.autoHide === true){
                      if(_this.autoHideInd === true){
                        let progressBar = notify.getElementsByClassName('progressbar')[0];
                        if( progressBar !== null){
                          let startTime = new Date().getTime();
                          let currentTime;
                          let endProgress = _this.autoHideTime;
                          let percentProgress = 0;
                          let displayProgress = setInterval(function(){
                                currentTime = new Date().getTime();
                                percentProgress = (currentTime-startTime)*100/endProgress;
                                progressBar.style.width = percentProgress + '%';
                                  if(currentTime-startTime >= endProgress){
                                    clearInterval(displayProgress);
                                    progressBar.classList.add('progressbarfade');
                                  }
                              },  10);
                        }
                      };
                    }
                  }, this.showDuration + this.clearanceDuration);

                  if(this.autoHide === true){
                    setTimeout(function(){
                      setTimeout(function(){
                        notify.classList.add(userOverrides('hideClass'));
                        notify.style.animation = userOverrides('hideAnimation');
                        setTimeout(function(){
                            notify.style.animation ='';
                            notify.style.opacity = '0';
                            if(container.childNodes.length != 1){
                              let startTime = new Date().getTime();
                              let currentTime;
                              let endProgress = _this.clearanceDuration;
                              let percentProgress = 0;
                              let notifyOffsetHeight = notify.offsetHeight;
                              let margin;
                              let clearSpace = setInterval(function(){
                                currentTime = new Date().getTime();
                                percentProgress = (currentTime-startTime)/endProgress;
                                notify.style.height = notifyOffsetHeight - Math.floor(notifyOffsetHeight * percentProgress) + 'px';
                                margin = _this.notifySpacing - Math.floor(_this.notifySpacing * percentProgress);
                                if(_this.vPosition === 'top'){
                                  notify.style.margin = '0 0 ' + margin + 'px 0';
                                }else if(_this.vPosition === 'bottom'){
                                  notify.style.margin = margin + 'px 0 0 0';
                                }
                                if(currentTime-startTime >= endProgress){
                                  clearInterval(clearSpace);
                                }
                              }, 10);
                            }
                            setTimeout(function(){
                              notify.parentNode.removeChild(notify);
                              if(!container.hasChildNodes()){
                                document.body.removeChild(container);
                              }
                            }, _this.clearanceDuration)
                        }, _this.hideDuration);
                      }, _this.showDuration);
                    }, this.autoHideTime + this.clearanceDuration);
                  }else{
                    setTimeout(function(){
                      let notifyCloseButton;
                        notifyCloseButton = notify.getElementsByClassName('notifyclose');
                        let closeNotifcation = function(){
                          notify.classList.add(userOverrides('hideClass'));
                          notify.style.animation = userOverrides('hideAnimation');
                          setTimeout(function(){
                              notify.style.animation ='';
                              notify.style.opacity = '0';
                              if(container.childNodes.length != 1){
                                let startTime = new Date().getTime();
                                let currentTime;
                                let endProgress = _this.clearanceDuration;
                                let percentProgress = 0;
                                let notifyOffsetHeight = notify.offsetHeight;
                                let margin;
                                let clearSpace = setInterval(function(){
                                  currentTime = new Date().getTime();
                                  percentProgress = (currentTime-startTime)/endProgress;
                                  notify.style.height = notifyOffsetHeight - Math.floor(notifyOffsetHeight * percentProgress) + 'px';
                                  margin = _this.notifySpacing - Math.floor(_this.notifySpacing * percentProgress);
                                  if(_this.vPosition === 'top'){
                                    notify.style.margin = '0 0 ' + margin + 'px 0';
                                  }else if(_this.vPosition === 'bottom'){
                                    notify.style.margin = margin + 'px 0 0 0';
                                  }
                                  if(currentTime-startTime >= endProgress){
                                    clearInterval(clearSpace);
                                  }
                                }, 10);
                              }
                              setTimeout(function(){
                                notifyCloseButton[0].removeEventListener('click', closeNotifcation);
                                notify.parentNode.removeChild(notify);
                                if(!container.hasChildNodes()){
                                  document.body.removeChild(container);
                                }
                              }, _this.clearanceDuration)
                          }, _this.hideDuration);
                        };
                        notifyCloseButton[0].addEventListener('click', closeNotifcation);
                    }, this.showDuration + this.clearanceDuration);
                  }


          }else if(this.notifyType === 'block'){
            createContainer();
            //let _this = this;
            let txtMessage = formatMessage(message, type, style);

            let showClass = userOverrides('showClass');
            let showAnimation = userOverrides('showAnimation');
            let hideClass = userOverrides('hideClass');
            let hideAnimation = userOverrides('hideAnimation');
            let notifyClass = userOverrides('notifyClass', type, style);
            let notifySpacing = userOverrides('notifySpacing');
            let notifyHeight = userOverrides('notifyHeight');
            let clearanceClass = userOverrides('clearanceClass');
            let clearanceAnimation = userOverrides('clearanceAnimation');
            let container = document.getElementById('notifycontainer-' + this.vPosition);
            let notify = document.createElement('div');

            if(container.hasChildNodes()){                                        // add pushDown class to first notification
                notify.classList.add(clearanceClass);
                notify.style.animation = clearanceAnimation;
                setTimeout(function(){
                  notify.classList.remove(clearanceClass);
                  notify.classList.add(notifyClass, showClass);
                  notify.style.animation = showAnimation;
                  notify.style.margin = notifySpacing;
                  notify.style.height = notifyHeight;
                  notify.innerHTML = txtMessage;
                }, this.clearanceDuration)
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

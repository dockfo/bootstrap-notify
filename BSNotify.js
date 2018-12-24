/**
*  @package      BSNotify v 0.1
 * @version      v 0.1
 * @link         https://github.com/dockfo/boot-strap-notify
*/

'use strict'

  class BSNotify {
    // start class

    //constructor
    constructor(params){

    // properties
      let _this = this;
      let setup = function (params = null){      // initializing prperties
    // default values
          _this.notifyType = 'card'                // values : 'card', 'block', 'popup'
          _this.hPosition = 'right';               // values : 'left', 'right'
          _this.vPosition = 'top';                 // values : 'top', 'bottom'
          _this.insertPosition = 'first'           // values : 'first', 'last'
          _this.hMargin = 10;                      // values : pixels -> from the left or right margin of the document body
          _this.vMargin = 10;                      // values : pixels -> from the top or bottom margin of the document body
          _this.notifyHeight = 100                 // values : true for auto height or number in pixels -> height of the notification
          _this.notifySpacing = 10;                // values : pixels -> vertical spacing between notifications
          _this.autoHide = true;                   // values : true, false
          _this.autoHideProgressLine = true;       // values : true, false
          _this.displayTime = 150000;               // values : time in microseconds -> display duration without the transitions time
          _this.hideOnClick = true;                // values : true false
          _this.showTransition = 'slide';          // values : available show transitions -> 'slide', 'jelly', 'fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          _this.showDuration = 800;                // values : time in microseconds -> show transition duration
          _this.hideTransition = 'rocket';         // values : available hide trnsitions -> 'slide', 'elastic', fade', 'dissolve', 'shrink', 'grow' ... feel free to add new ones ;-)
          _this.hideDuration = 1500;               // values : time in microseconds -> hide transition duration
          // not user definable properties
          _this.clearanceDuration = 200;
          _this.progressBarToZero = true;
          _this.randomTransition = null;
          _this.autoNotifyHeight = null;
          _this.logInfo = false;
          // setting user definable properties
          _this.setParams(params);
      };

      setup(params);
    }

    //methods

    getPermitedValues(values){
      let _this = this;
      switch(values){
        case 'showTransition':
            return [ 'slide', 'jelly', 'wall', 'random'];
          break;
        case 'hideTransition':
            return [ 'rocket', 'random' ];
          break;
        default:
          (_this.logInfo) ?console.info('BSNotify v0.1 - You have to provide the parameter. ( example : getPermitedValues(\'notifyType\') )') : false ;
      }
    }

    getParams(){
        return(this);
    }

    setParams(params){
      // user defined values on instantiating the Notify class
      let _this = this;
      if(params !== null && typeof(params) === "object"){             // check for validity of user values provided ...
        let userParams = function(params){                            // check user provided overrides
                          let userParams = {};
                          let setupString = { notifyType            : [ 'card', 'block', 'dialog', 'popup' ],
                                              hPosition             : [ 'left', 'right' ],
                                              vPosition             : [ 'top', 'bottom' ],
                                              insertPosition        : [ 'first', 'last'],
                                              notifyHeight          : [ 'auto' ],                                // todo
                                              autoHide              : [ true, false ],
                                              autoHideProgressLine  : [ true, false ],
                                              hideOnClick           : [ true, false ],
                                              showTransition        : _this.getPermitedValues('showTransition'),
                                              hideTransition        : _this.getPermitedValues('hideTransition')
                                            };
                          let setupNumeric = {  hMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for hMargin property
                                                vMargin         : { min : 10,   max : 20 },       // minimum and maximum limits for vMargin property
                                                notifyHeight    : { min : 50,   max : 200},       // minimum and maximum limits for notifyHeight property
                                                notifySpacing   : { min : 5,    max : 15 },       // minimum and maximum limits for notifySpacing property
                                                displayTime     : { min : 2000, max : 150000 },    // minimum and maximum limits for displayTime property
                                                showDuration    : { min : 400,  max : 2000 },     // minimum and maximum limits for showDuration property
                                                hideDuration    : { min : 400,  max : 2000 }      // minimum and maximum limits for hMahideDurationrgin property
                                              };
              Object.keys(params).forEach(function(param){
                if( (setupString.hasOwnProperty(param) && setupString[param].includes(params[param])) || (setupNumeric.hasOwnProperty(param) && typeof(params[param]) === 'number' && params[param] >= setupNumeric[param].min && params[param] <= setupNumeric[param].max  ) ){
                  userParams[param] = params[param];
                }else{
                  console.warn('BSNotify v0.1 - ' + param + ' : \'' + params[param] + '\' - Parameter does not exists or wrong value is provided.');
                }
              });

            return userParams;
          };

        Object.keys(params = userParams(params)).forEach(function(param){
          _this[param] = params[param];                                        // ... and setting them
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
                                                          console.warn('BSNotify v0.1 - type' + ' : \'' + type + '\' - Notify type of \'' + type + '\' does not exists.');
                                                          return 'danger';
                                                        }
                                                      };

                                let selectRandomTransition = function(type){
                                                              let transitionsShow = _this.getPermitedValues('showTransition');
                                                              let transitionsHide = _this.getPermitedValues('hideTransition');
                                                              let transition;
                                                              let transitionSelect;
                                                                  if(type === 'show'){
                                                                    _this.randomTransition = transitionsShow[Math.floor(Math.random() * (transitionsShow.length - 1))];
                                                                  }else if(type === 'hide'){
                                                                    _this.randomTransition = transitionsHide[Math.floor(Math.random() * (transitionsHide.length - 1))];
                                                                  }
                                                            }

                                switch(param){
                                  case 'showClass' :
                                      if(_this.notifyType === 'card'){
                                        if(_this.showTransition === 'random'){
                                          selectRandomTransition('show')
                                          return ('notify-show-' + _this.randomTransition);
                                        }else{
                                            return ('notify-show-' + _this.showTransition);
                                        }
                                      }else if(_this.notifyType === 'block'){
                                        return ('notify-block-show-' + _this.showTransition);
                                      }
                                  case 'hideClass' :
                                      if(_this.notifyType === 'card'){
                                        if(_this.hideTransition === 'random'){
                                          selectRandomTransition('hide')
                                          return ('notify-hide-' + _this.randomTransition);
                                        }else{
                                          return ('notify-hide-' + _this.hideTransition);
                                        }
                                      }else if(_this.notifyType === 'block'){
                                        return ('notify-block-hide-' + _this.hideTransition);
                                      }
                                  case 'showAnimation' :
                                      if(_this.notifyType === 'card'){
                                        if(_this.showTransition === 'random'){
                                          return (_this.randomTransition + "-" + _this.hPosition + ' ' + _this.showDuration + 'ms linear forwards');
                                        }else{
                                          return (_this.showTransition + "-" + _this.hPosition + ' ' + _this.showDuration + 'ms linear forwards');
                                        }
                                      }else if(_this.notifyType === 'block'){
                                        return (_this.showTransition + "-" + _this.vPosition + ' ' + _this.showDuration + 'ms linear forwards');
                                      }
                                  case 'hideAnimation' :
                                      if(_this.notifyType === 'card'){
                                        if(_this.hideTransition === 'random'){
                                          return (_this.randomTransition + "-" + _this.hPosition + ' ' + _this.hideDuration + 'ms linear forwards');
                                        }else{
                                          return (_this.hideTransition + "-" + _this.hPosition + ' ' + _this.hideDuration + 'ms linear forwards');
                                        }
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
                                      console.log(_this.notifyHeight, _this.autoNotifyHeight)
                                      if(_this.notifyType === 'card'){
                                        if(_this.notifyHeight === 'auto'){
                                          console.log('auto');
                                          getNotifyHeight();
                                          return _this.autoNotifyHeight;
                                        }else if(typeof(_this.notifyHeight) === 'number'){
                                          console.log('number');
                                          return _this.notifyHeight;
                                        }
                                      }else if(_this.notifyType === 'block'){
                                        return ('60px');
                                      }
                                    break;
                                  default:
                                    console.warn('BSNotify v0.1 - param' + ' : \'' + param + '\' - Parameter does not exists.');    // warning in console in case of bad value provided
                                    return false;
                                }
                              };

          let getNotifyHeight = function (){
                                  let innerHtmlHeight  = '<div class="container-fluid">';
                                      innerHtmlHeight +=     '<div class="title">&nbsp;</div>';
                                      innerHtmlHeight +=   '<div class="row">';
                                      innerHtmlHeight +=     '<div class="col-sm-12 marginfix">&nbsp;</div>';
                                      innerHtmlHeight +=   '</div>';
                                      innerHtmlHeight +=   '<div class="row">';
                                      innerHtmlHeight +=      '<div class="col-sm-12 message">' + getMessageText().message + '</div>';
                                      innerHtmlHeight +=    '</div>';
                                      innerHtmlHeight +=  '</div>';
                                      let container = document.createElement('div');
                                      container.setAttribute('id','container');
                                      container.style.width = '400px';
                                      document.body.appendChild(container);

                                      let notify = document.createElement('div');
                                      notify.setAttribute('id','notify');
                                      notify.innerHTML = innerHtmlHeight;
                                      container.appendChild(notify);

                                      _this.autoNotifyHeight = document.getElementById('notify').offsetHeight;

                                      container.outerHTML = "";

                                        console.log(_this.autoNotifyHeight);
                                    }
          let getMessageText = function(){
                              let notifyTitle;
                              let notifyMessage;
                              let notifyAlign;
                              let titleDefault = { primary : 'Notice', success : 'Success', info : 'Info', warning : 'Warning', danger : 'Danger' };
                              let alignDefault = ['left', 'right', 'center', 'justify'];

                              if(typeof(message) === "object"){
                                if(message.title){
                                  notifyTitle = message.title;
                                }else{
                                  notifyTitle = titleDefault[type];
                                  //console.log(typeof(message, message));
                                  //console.warn('BSNotify v0.4 - Default title');
                                }
                                if(message.message){
                                  notifyMessage = message.message;
                                }else{
                                  notifyMessage = 'This is a \"' + _this.vPosition + ' ' + _this.hPosition + '\" notify with Bootstrap type : \"' + type + '\" and \"' + style + '\" style.';
                                  //console.warn('BSNotify v0.4 - Default title');
                                }
                                if(message.align){
                                  if(alignDefault.includes(message.align)){
                                    notifyAlign = message.align;
                                  }else{
                                    notifyAlign = 'left';
                                    //console.warn('BSNotify v0.4 - Default align');
                                  }
                                }else{
                                  notifyAlign = 'left';
                                  //console.warn('BSNotify v0.4 - Default align');
                                }
                              }else if(typeof(message) === "string"){
                                if(message !== ''){
                                  notifyMessage = message;
                                  notifyTitle = titleDefault[type];
                                  notifyAlign = 'left';
                                  //console.warn('BSNotify v0.4 - Default title');
                                  //console.warn('BSNotify v0.4 - Default align');
                                }else{
                                  notifyMessage = 'This is a \"' + _this.vPosition + ' ' + _this.hPosition + '\" notify with Bootstrap type : \"' + type + '\" and \"' + style + '\" style.';
                                  notifyTitle = titleDefault[type];
                                  notifyAlign = 'left';
                                  //console.warn('BSNotify v0.4 - Default message');
                                  //console.warn('BSNotify v0.4 - Default title');
                                  //console.warn('BSNotify v0.4 - Default align');
                                }
                              }else{
                                notifyMessage = 'This is a \"' + _this.vPosition + ' ' + _this.hPosition + '\" notify with Bootstrap type : \"' + type + '\" and \"' + style + '\" style.';
                                notifyTitle = titleDefault[type];
                                notifyAlign = 'left';
                                //console.warn('BSNotify v0.4 - Default message');
                                //console.warn('BSNotify v0.4 - Default title');
                                //console.warn('BSNotify v0.4 - Default align');
                              }
                              return {title : notifyTitle, message : notifyMessage, align : notifyAlign};
                            };

          let formatMessage = function(){       // creating the message displayed inside notification div depending on notification type (primary, warning, danger etc.)
                                let icon;
                                let iconNotifyType = (_this.notifyType === 'card')? 'icon-card' : ((_this.notifyType === 'block')? 'icon-block' : false );
                                let iconClose = (_this.hPosition === 'left')? 'float-right' : 'float-left';
                                let textColor = (type === 'primary' || type === 'success' || type === 'info' || type === 'danger')? 'white' : 'dark';
                                let messageText = getMessageText();

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

                                let innerHtml  = '<div class="container-fluid">';
                                    innerHtml +=   '<i class="' + icon + ' ' + iconNotifyType +'" style="font-size:' + _this.notifyHeight * 150/100 + 'px"></i>';
                                    innerHtml +=     '<div class="title">' + messageText.title + '</div>';
                                  if(_this.autoHide === false){
                                    innerHtml +=   '<div class="row">';
                                    innerHtml +=     '<div class="col-sm-12"><button type="button" class="close notifyclose ' + iconClose + '" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
                                    innerHtml +=   '</div>';
                                  }else{
                                    innerHtml +=   '<div class="row">';
                                    innerHtml +=     '<div class="col-sm-12 marginfix">&nbsp;</div>';
                                    innerHtml +=   '</div>';
                                  }
                                    innerHtml +=   '<div class="row">';
                                    innerHtml +=      '<div class="col-sm-12 message text-' + textColor + '" align="' + messageText.align + '">' + messageText.message + '</div>';
                                    innerHtml +=    '</div>';
                                  if(_this.autoHideProgressLine === true && _this.autoHide === true){
                                    innerHtml +=  '<div class="row">';
                                    innerHtml +=     '<div class="progressbar"></div>';
                                    innerHtml +=   '</div>';
                                  };
                                    innerHtml +=  '</div>';
                                return innerHtml;                                                                    // returns html string
                              }

          if(_this.notifyType === 'card'){
            // initialize vars
            let showClass = userOverrides('showClass');
            let showAnimation = userOverrides('showAnimation');
            let hideClass = userOverrides('hideClass');
            let hideAnimation = userOverrides('hideAnimation');
            let notifyClass = userOverrides('notifyClass', type, style);
            let notifySpacing = userOverrides('notifySpacing');
            let notifyHeight = userOverrides('notifyHeight');
    console.log(notifyHeight);
                createContainer();
                let txtMessage = formatMessage();
                let container = document.getElementById('notifycontainer-' + _this.vPosition + _this.hPosition);
                let notify = document.createElement('div');
                let addShowTransition = function(){
                          notify.classList.add(notifyClass, showClass);
                          notify.style.animation = showAnimation;
                          notify.style.margin = notifySpacing;
                          notify.style.height = notifyHeight + 'px';
                          console.log(notifyHeight);

                          notify.innerHTML = txtMessage;
                  }
                let closeNotification = function(){
                  let notifyCloseButton = notify.getElementsByClassName('notifyclose');
                  notifyCloseButton[0].removeEventListener('click', closeNotification);
                  notify.classList.add(hideClass);
                  notify.style.animation = hideAnimation;
                  setTimeout(function(){
                      if(container.childNodes.length > 0){
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
                };

                let closeNotificationOnClick = function(){
                  notify.removeEventListener('click', closeNotificationOnClick);
                  let progressBar = notify.getElementsByClassName('progressbar')[0];
                  if(progressBar){
                    progressBar.classList.remove('progressbarfadein');
                    progressBar.classList.add('progressbarfadeout');
                  }
                  clearTimeout(showDuration);
                  clearTimeout(hideDuration);
                  notify.classList.add(hideClass);
                  notify.style.animation = hideAnimation;
                  setTimeout(function(){
                      if(container.childNodes.length > 0){
                        let startTime = new Date().getTime();
                        let currentTime;
                        let endProgress = _this.clearanceDuration;
                        let percentProgress = 0;
                        let notifyOffsetHeight = notify.offsetHeight;
                        let margin;
                        let clearSpaceClick = setInterval(function(){
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
                            clearInterval(clearSpaceClick);
                          }
                        }, 10);
                      }
                      setTimeout(function(){
                        try {notify.parentNode.removeChild(notify);}
                        catch(err) {}
                        if(!container.hasChildNodes()){
                          try {document.body.removeChild(container);}
                          catch(err) {};
                        }
                      }, _this.clearanceDuration);
                  }, _this.hideDuration);
                };

                  if(_this.vPosition === 'top'){
                    if(_this.insertPosition === 'first'){
                        if(container.childNodes.length > 0){
                          container.insertBefore(notify, container.childNodes[0]);
                          let startTime = new Date().getTime();
                          let currentTime;
                          let endProgress = _this.clearanceDuration;
                          let percentProgress = 0;
                          let push = setInterval(function(){
                            currentTime = new Date().getTime();
                            percentProgress = (currentTime-startTime)/endProgress;
                            notify.style.height = Math.floor(notifyHeight * percentProgress) + 'px';
    //console.log(notifyHeight);
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
                  }else if(_this.vPosition === 'bottom'){
                    if(_this.insertPosition === 'first'){
                      container.appendChild(notify);
                      if(container.childNodes.length > 0){
                        let startTime = new Date().getTime();
                        let currentTime;
                        let endProgress = _this.clearanceDuration;
                        let percentProgress = 0;
                        let push = setInterval(function(){
                          currentTime = new Date().getTime();
                          percentProgress = (currentTime-startTime)/endProgress;
                          notify.style.height = Math.floor(notifyHeight * percentProgress) + 'px';
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
                    notify.classList.remove(showClass);
                    notify.style.animation ='';
                    if(_this.autoHide === true){
                      if(_this.hideOnClick === true){
                        notify.addEventListener('click', closeNotificationOnClick);
                      }
                      if(_this.autoHideProgressLine === true){
                        let progressBar = notify.getElementsByClassName('progressbar')[0];
                        progressBar.classList.add('progressbarfadein');
                        if( progressBar !== null){
                          let startTime = new Date().getTime();
                          let currentTime;
                          let endProgress = _this.displayTime;
                          let percentProgress = 0;
                          let displayProgress = setInterval(function(){
                                currentTime = new Date().getTime();
                                percentProgress = (currentTime-startTime)*100/endProgress;
                                progressBar.style.width =  (_this.progressBarToZero) ? (100 - percentProgress) + '%' : percentProgress + '%' ;
                                  if(currentTime-startTime >= endProgress){
                                    clearInterval(displayProgress);
                                    progressBar.classList.remove('progressbarfadein');
                                    progressBar.classList.add('progressbarfadeout');
                                  }
                              },  10);
                        }
                      };
                    }
                  }, _this.showDuration + _this.clearanceDuration);

                  if(_this.autoHide === true){
                    let autoHideDuration = setTimeout(function(){
                      let showDuration = setTimeout(function(){
                          notify.classList.add(hideClass);
                          notify.style.animation = hideAnimation;
                        let hideDuration = setTimeout(function(){
                              //notify.style.animation ='';
                              //notify.style.opacity = '0';
                              if(container.childNodes.length > 0){
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
                              let removeNodes = setTimeout(function(){
                                try {notify.parentNode.removeChild(notify);}
                                catch(err) {}
                                if(!container.hasChildNodes()){
                                  try {document.body.removeChild(container);}
                                  catch(err) {}
                                }
                              }, _this.clearanceDuration);
                          }, _this.hideDuration);
                        }, _this.showDuration);
                      }, _this.displayTime + _this.clearanceDuration);
                  }else{
                    setTimeout(function(){
                      let notifyCloseButton = notify.getElementsByClassName('notifyclose');
                      notifyCloseButton[0].addEventListener('click', closeNotification);
                    }, _this.showDuration + _this.clearanceDuration);
                  }


          }else if(_this.notifyType === 'block'){
            createContainer();
            //let _this = _this;
            let txtMessage = formatMessage();
            let showClass = userOverrides('showClass');
            let showAnimation = userOverrides('showAnimation');
            let hideClass = userOverrides('hideClass');
            let hideAnimation = userOverrides('hideAnimation');
            let notifyClass = userOverrides('notifyClass', type, style);
            let notifySpacing = userOverrides('notifySpacing');
            let notifyHeight = userOverrides('notifyHeight');
            let clearanceClass = userOverrides('clearanceClass');
            let clearanceAnimation = userOverrides('clearanceAnimation');
            let container = document.getElementById('notifycontainer-' + _this.vPosition);
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
                }, _this.clearanceDuration)
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

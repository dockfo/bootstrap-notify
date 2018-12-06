
  let notifyArray = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']

  document.addEventListener("click", inputElements, true, {passive:true});

  function inputElements(event){
      let trgElem = event.target;
      if(trgElem.tagName === 'BUTTON'){
        if(getExcludedElements().indexOf(trgElem.id) != -1 || trgElem.getAttribute('data-task') === 'local' ){
          if(trgElem.getAttribute('data-task') === 'local'){
            switch(trgElem.id){
              default :
                return false;
            }
          }else{
            switch(trgElem.id){
              default :
                return false;
            }
          }
        }else{
          switch(trgElem.id){
            case 'topleft' :
                let notifytopleft;
                if(notifytopleft === undefined){
                  let notifytopleft = new Notify({  notifyHeight : 'auto',
                                                    hideDuration : 1500,
                                                    autoHideTime : 2000,
                                                    hPosition : 'left',
                                                    vPosition : 'top'});
                  let random = Math.floor(Math.random()*10);
                  let rnd;
                  if(random > 5){
                    rnd = 10 - random;
                  }else{
                    rnd = random;
                  }
                notifytopleft.show(null,notifyArray[rnd]);
                }else{
                  notifytopleft.show();
                };
              break;
            case 'topright' :
                let notifytopright;
                if(notifytopright === undefined){
                  let notifytopright = new Notify({ hideDuration : 1500,
                                                    autoHideTime : 2000});
                  let random = Math.floor(Math.random()*10);
                  let rnd;
                  if(random > 5){
                    rnd = 10 - random;
                  }else{
                    rnd = random;
                  }
                notifytopright.show(null,notifyArray[rnd]);
                }else{
                  notifytopright.show();
                };
              break;
            default :
             return false;
          }
        }
      }else{
        switch(trgElem.id){
          default :
           return false;
        }
      }
        return false;
    }

    function getExcludedElements(){
      let excludes = [
                  ];
        return excludes;
    }

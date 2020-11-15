(()=>{"use strict";(()=>{const e=(e,t)=>Math.round(Math.random()*(t-e)+e);window.util={getRandomNumbers:e,getRandomItem:e=>e[Math.round(Math.floor(Math.random()*e.length))],getRandom:t=>t.slice(0,e(1,t.length)),createElement:(e,t)=>e.appendChild(t),setDisabled:(e,t)=>{for(let o of e)o.disabled=t},Url:{POST:"https://21.javascript.pages.academy/keksobooking",GET:"https://21.javascript.pages.academy/keksobooking/data"}}})(),window.data={PinSize:{WIDTH:65,HEIGHT:65,POINTER:5},Price:{MIN:1e4,MAX:5e4},Room:{MIN:1,MAX:3},MinPrice:{BUNGALOW:0,FLAT:1e3,HOUSE:5e3,PALACE:1e4},offerType:{flat:"Квартира",house:"Дом",palace:"Дворец",bungalow:"Бунгало"},MapX:{MIN:0,MAX:1200},MapY:{MIN:138,MAX:551},PinStart:{X:570,Y:375},TailSize:{WIDTH:10,HEIGHT:22},SmallPin:{WIDTH:50,HEIGHT:70}},(()=>{const e={OK:200},t=e=>{const t=document.createElement("div");return t.style="\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 800px;\n      height: 50%;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-radius: 15px;\n      background-color: rgba(0, 0, 0, 0.9);\n      color: #fff;\n      font-weight: 700;\n      line-height: 1.5;\n      z-index: 100",t.textContent=e,document.querySelector(".map").append(t),t};window.load={dataLoadingHandler:(o,n)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{r.status===e.OK?o(r.response):n(t(`Статус ответа: ${r.status} ${r.statusText}`))})),r.addEventListener("error",(()=>{n(t("Произошла ошибка соединения"))})),r.addEventListener("timeout",(()=>{n(t(`Запрос не успел выполниться за ${r.timeout} мс`))})),r.timeout=1e4,r.open("GET",window.util.Url.GET),r.send()},StatusCode:e,TIMEOUT_IN_MS:1e4}})(),(()=>{const e=document.querySelector("#address"),t=document.querySelector("#room_number"),o=document.querySelector("#capacity"),n=document.querySelector("#type"),r=document.querySelector("#price"),a=document.querySelector(".ad-form"),d=a.querySelector(".ad-form__reset"),i=a.querySelector(".ad-form__submit"),c=(t,o)=>{document.querySelector(".map--faded")?e.value=`${window.data.PinStart.X+window.data.PinSize.WIDTH/2-window.data.PinSize.POINTER/2},\n ${window.data.PinStart.Y}`:e.value=`${Math.floor(t+window.data.TailSize.WIDTH+window.data.TailSize.HEIGHT)},\n ${Math.floor(o+window.data.TailSize.HEIGHT)}`};c(),window.util.setDisabled(a.querySelectorAll("fieldset"),!0);const s=()=>{const e=document.querySelector(".map__filters");a.reset(),e.reset(),a.classList.add("ad-form--disabled"),document.querySelector(".map").classList.add("map--faded"),window.main.removePins(),window.util.setDisabled(a.querySelectorAll("fieldset"),!0),window.util.setDisabled(e,!0),window.main.removeCard(),document.querySelector(".map__pin--main").addEventListener("mousedown",window.pins.pinActivePageHandler),window.pins.setElementStart(),window.pins.setElementCoordinate(),window.picture.removePreview(),m()},l=()=>{let e="";i.removeEventListener("click",l),(t.value<o.value||"100"!==t.value&&"0"===o.value||"100"===t.value&&o.value>"0")&&(e="Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей"),t.setCustomValidity(e)};i.addEventListener("click",l);const u=(e,t,o)=>{e.setAttribute(t,o)},m=()=>{let e=0;switch(n.value){case"bungalow":e=window.data.MinPrice.BUNGALOW;break;case"flat":e=window.data.MinPrice.FLAT;break;case"house":e=window.data.MinPrice.HOUSE;break;case"palace":e=window.data.MinPrice.PALACE}u(r,"placeholder",e),u(r,"min",e)};m(),n.addEventListener("change",m);const p=document.querySelector("#timein"),w=document.querySelector("#timeout"),f=e=>{p.value=e.target.value,w.value=e.target.value};p.addEventListener("change",f),w.addEventListener("change",f),a.addEventListener("submit",(e=>{window.upload.dataSendingHandler(new FormData(a),(()=>{})),e.preventDefault()})),window.form={setActiveElement:()=>{a.classList.remove("ad-form--disabled")},priceValidationHandler:m,buttonRestartHandler:()=>{const e=t=>{t.preventDefault(),d.removeEventListener("click",e),s()};d.addEventListener("click",e)},writeAddress:c,restartPage:s}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pin--main"),o=()=>{window.form.writeAddress(t.offsetLeft,t.offsetTop+window.data.PinSize.WIDTH-2*window.data.PinSize.POINTER+window.data.PinSize.POINTER/2)},n=e=>{0===e.button&&(window.main.setActivePage(),window.form.writeAddress(t.offsetLeft-window.data.PinSize.POINTER/2,t.offsetTop+window.data.TailSize.HEIGHT/2-window.data.TailSize.WIDTH),t.removeEventListener("mousedown",n))};t.addEventListener("mousedown",(e=>{e.preventDefault();let n={x:e.clientX,y:e.clientY};const r=e=>{e.preventDefault(),o();const r=n.x-e.clientX,a=n.y-e.clientY;n={x:e.clientX,y:e.clientY};const d=t.offsetLeft-r,i=t.offsetTop-a;t.style.left=(e=>{const t=window.data.MapX.MAX-window.data.PinSize.WIDTH/2,o=window.data.MapX.MIN-window.data.PinSize.WIDTH/2;return e>t?t:e<o?o:e})(d)+"px",t.style.top=(e=>{const t=window.data.MapY.MIN-window.data.PinSize.WIDTH-window.data.TailSize.HEIGHT;return e>window.data.MapY.MAX?window.data.MapY.MAX:e<t?t:e})(i)+"px"},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)})),t.addEventListener("mousedown",n);const r=e=>{"Enter"===e.key&&(window.main.setActivePage(),window.form.writeAddress(t.offsetLeft,t.offsetTop),t.removeEventListener("keydown",r))};t.addEventListener("keydown",r),window.pins={getRenderElement:t=>{const o=e.cloneNode(!0),n=o.querySelector("img");return n.src=t.author.avatar,n.alt=t.offer.title,o.style.left=t.location.x-window.data.SmallPin.WIDTH+"px",o.style.top=t.location.y-window.data.SmallPin.HEIGHT+"px",o},pinActivePageHandler:n,setElementCoordinate:o,removeActiveElement:()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")},setElementStart:()=>{t.style.top=window.data.PinStart.Y+"px",t.style.left=window.data.PinStart.X+"px"}}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content,o=document.querySelector("#success").content,n=()=>{e.querySelector(".error")&&e.querySelector(".error").remove()},r=()=>{e.querySelector(".success")&&e.querySelector(".success").remove()},a=()=>{const o=t.cloneNode(!0);e.append(o),document.addEventListener("click",n),document.addEventListener("keydown",(e=>{"Escape"===e.key&&n()}))};window.upload={dataSendingHandler:(t,n)=>{const d=new XMLHttpRequest;d.responseType="json",d.addEventListener("load",(()=>{d.status===window.load.StatusCode.OK?(n(d.response),window.form.restartPage(),(()=>{const t=o.cloneNode(!0);e.append(t),document.addEventListener("click",r),document.addEventListener("keydown",(e=>{"Escape"===e.key&&r()}))})()):a()})),d.addEventListener("error",(()=>{a()})),d.addEventListener("timeout",(()=>{a()})),d.timeout=window.load.TIMEOUT_IN_MS,d.open("POST",window.util.Url.POST),d.send(t)}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),300)}},(()=>{const e="any",t=document.querySelector(".map__filters"),o=document.querySelector("#housing-type"),n=document.querySelector("#housing-price"),r=document.querySelector("#housing-rooms"),a=document.querySelector("#housing-guests");window.util.setDisabled(t,!0);let d=[];window.load.dataLoadingHandler((e=>{d=e,i()}));const i=()=>{const e=window.debounce((()=>{window.main.removePins(),window.main.removeCard(),window.main.createElements()}));t.addEventListener("change",(()=>{e()}))};window.filter={getRenderMapAd:()=>d.filter((d=>{return(d.offer.type===o.value||o.value===e)&&(l=d.offer.price,n.value===e||l<window.data.Price.MIN&&"low"===n.value||l>window.data.Price.MAX&&"high"===n.value||l>=window.data.Price.MIN&&l<=window.data.Price.MAX&&"middle"===n.value)&&(i=d,r.value===e||i.offer.rooms===Number(r.value))&&(s=d.offer.guests,a.value===e||s===Number(a.value))&&(c=d.offer.features,Array.from(t.querySelectorAll('input[type="checkbox"]:checked')).every((e=>c.includes(e.value))));var i,c,s,l})).slice(0,5)}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector("#images"),r=document.querySelector(".ad-form__photo");r.style.display="flex",r.style.alignItems="center",r.style.padding="13px 15px",r.insertAdjacentHTML("afterbegin",'<img width="40">');const a=r.firstChild,d=(t,o)=>{t.addEventListener("change",(()=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(n)}}))};d(t,o),d(n,a),window.picture={removePreview:()=>{o.src="img/muffin-grey.svg",a.src=""}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".popup"),t=e=>{"Escape"===e.key&&o()},o=()=>{const e=document.querySelector(".map__card");e&&(window.pins.removeActiveElement(),e.remove(),document.removeEventListener("keydown",t))};window.card={getRenderElement:t=>{const n=e.cloneNode(!0),r=n.querySelector(".popup__photos").querySelector(".popup__photo"),a=n.querySelector(".popup__close");return n.querySelector(".popup__photos").removeChild(r),n.querySelector(".popup__title").textContent=t.offer.title,n.querySelector(".popup__text--address").textContent=t.offer.address,n.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=window.data.offerType[t.offer.type],n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} ${(e=>{let t="комната";return 1!==e.offer.rooms&&(t="комнаты"),0!==e.offer.rooms&&35!==e.offer.rooms||(t="комнат"),t})(t)} для ${t.offer.guests} ${(e=>1!==e.offer.guests?"гостей":"гостя")(t)}`,n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,n.querySelector(".popup__features").appendChild((e=>{const t=document.createDocumentFragment();return e.forEach((e=>{const o=document.createElement("li");o.classList.add("popup__feature"),o.classList.add("popup__feature--"+e),t.appendChild(o)})),t})(t.offer.features)),n.querySelector(".popup__description").textContent=t.offer.description,n.querySelector(".popup__photos").appendChild((e=>{const t=document.createDocumentFragment(),o=document.querySelector("#card").content.querySelector(".popup__photo");return e.forEach((e=>{const n=o.cloneNode(!0);n.src=e,t.appendChild(n)})),t})(t.offer.photos)),n.querySelector(".popup__avatar").src=t.author.avatar,a.addEventListener("click",(()=>{o()})),n},popupCloseHandler:o,escPressHandler:t}})(),(()=>{const e=document.querySelector(".map__filters-container"),t=document.querySelector(".map"),o=document.querySelector(".map__pins"),n=()=>{const e=document.createDocumentFragment();window.filter.getRenderMapAd();for(let t of window.filter.getRenderMapAd()){const o=window.pins.getRenderElement(t);r(o,t),e.appendChild(o)}window.util.createElement(o,e)},r=(o,n)=>{o.addEventListener("click",(()=>{const r=window.card.getRenderElement(n);document.querySelector(".map__card")&&window.card.popupCloseHandler(),document.addEventListener("keydown",window.card.escPressHandler),window.pins.removeActiveElement(),o.classList.add("map__pin--active"),t.insertBefore(r,e)}))};window.main={setActivePage:()=>{n(),t.classList.remove("map--faded"),window.util.setDisabled(document.querySelector(".ad-form").querySelectorAll("fieldset"),!1),window.util.setDisabled(document.querySelector(".map__filters"),!1),window.form.setActiveElement(),window.form.buttonRestartHandler(),window.form.priceValidationHandler()},removePins:()=>{document.querySelectorAll('.map__pins [type="button"]').forEach((e=>e.remove()))},removeCard:()=>{const e=document.querySelector(".map__card");e&&e.remove()},createElements:n}})()})();
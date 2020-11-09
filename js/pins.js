'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`)
                              .content
                              .querySelector(`.map__pin`);
  const mapPinHandle = document.querySelector(`.map__pin--main`);
  const pinCoordinate = () => {
    window.util.writeAddress(mapPinHandle.offsetLeft, mapPinHandle.offsetTop);
  };
  pinCoordinate();

  const removeActivePin = () => {
    let onMapActivePin = document.querySelector(`.map__pin--active`);
    if (onMapActivePin) {
      onMapActivePin.classList.remove(`map__pin--active`);
    }
  };

  const getRenderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementSelector = pinElement.querySelector(`img`);
    pinElementSelector.src = pin.author.avatar;
    pinElementSelector.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - window.data.PinSize.WIDTH}px`;
    pinElement.style.top = `${pin.location.y - window.data.PinSize.HEIGHT}px`;
    return pinElement;
  };

  const onPinMainActive = (evt) => {
    if (evt.button === 0) {
      window.main.setActivePage();
      window.util.onPinStart();
      mapPinHandle.removeEventListener(`mousedown`, onPinMainActive);
    }
  };

  const checkXPin = (x) => {
    const maxX = window.data.MapX.MAX - window.data.PinSize.WIDTH;
    const minX = window.data.MapX.MIN;
    if (x > maxX) {
      return maxX;
    }

    if (x < minX) {
      return minX;
    }
    return x;
  };

  const checkYPin = (y) => {
    const minY = window.data.MapY.MIN - window.data.PinSize.HEIGHT;
    if (y > window.data.MapY.MAX) {
      return window.data.MapY.MAX;
    }

    if (y < minY) {
      return minY;
    }
    return y;
  };

  mapPinHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      pinCoordinate();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newX = mapPinHandle.offsetLeft - shift.x;
      const newY = mapPinHandle.offsetTop - shift.y;

      mapPinHandle.style.left = `${checkXPin(newX)}px`;
      mapPinHandle.style.top = `${checkYPin(newY)}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  mapPinHandle.addEventListener(`mousedown`, onPinMainActive);

  const onPinMainEvent = (evt) => {
    if (evt.key === `Enter`) {
      window.main.setActivePage();
      window.util.writeAddress(mapPinHandle.offsetLeft, mapPinHandle.offsetTop);
      mapPinHandle.removeEventListener(`keydown`, onPinMainEvent);
    }
  };

  mapPinHandle.addEventListener(`keydown`, onPinMainEvent);

  window.pins = {
    getRenderPin,
    onPinMainActive,
    pinCoordinate,
    removeActivePin
  };
})();

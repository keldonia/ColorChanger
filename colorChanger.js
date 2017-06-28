var ColorChanger = function () {
  var second = 1000;
  var _usedColors = {};
  var _startTime = new Date();
  var _endTime = new Date(_startTime.valueOf() + (10 * second));
  var _lastChange = _startTime;
  var changeInterval;

  var randomColor = function () {
    // NOTE: 16777215 is equal to ffffff in hex
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  var randomColorNoRepeat = function () {
    var color = randomColor();

    /*
    * NOTE: I used this check as the likihood of a repeat is less than
    * 3/1E6 and the calculation is not particularly expensive nor is
    * the check.
    */
    while (_usedColors[color]) {
      color = randomColor();
    }

    _usedColors[color] = true;
    return color;
  };

  var changeColor = function () {
    var color = randomColorNoRepeat();
    var body = document.getElementsByTagName('body')[0];

    _lastChange = new Date();
    body.style.backgroundColor = color;
  };

  /*
  * NOTE: setInterval is used because if I had set it to occur
  * every second if the page was inactive the ms in these timeouts
  * diverages -- each ms for the interval can be 2 ms in real time...
  */
  changeInterval = window.setInterval(
    function () {
      if (new Date() > _endTime) {
        window.clearInterval(changeInterval);
        return;
      }
      if (new Date() >= new Date(_lastChange.valueOf() + second)) {
        changeColor();
      }
    },
    10
  );

};

module.exports = ColorChanger;

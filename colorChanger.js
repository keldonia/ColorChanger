var ColorChanger = function () {
  var second = 1000;
  var _usedColors = {};
  var _startTime = new Date();
  var _endTime = new Date(_startTime.valueOf() + (10 * second));
  var _lastChange = _startTime;
  var that = this;

  var randomColor = function () {
    // NOTE: 16777215 is equal to ffffff in hex
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  var randomColorNoRepeat = function () {
    var color = randomColor();

    while (_usedColors[color]) {
      color = randomColor();
    }

    _usedColors[color] = true;
    return color;
  }

  /*
  * NOTE: setInterval is used because if I had set it to occur
  * every second if the page was inactive the ms in these timeouts
  * diverages -- each ms for the interval can be 2 ms in real time...
  */
  this.changeInterval = window.setInterval(
    function () {
      if (new Date() > _endTime) {
        window.clearInterval(that.changeInterval);
        return;
      }
      if (new Date() >= new Date(_lastChange.valueOf() + second)) {
        var color = randomColorNoRepeat();
        var body = document.getElementsByTagName('body');

        _lastChange = new Date();
        body.style.backgroundColor = color;
      }
    },
    10
  );

};

module.exports = ColorChanger;

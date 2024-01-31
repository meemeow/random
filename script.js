let buttons = Array.from(document.querySelectorAll('.myButton'));
let overlay = document.querySelector('#overlay');
let nyanCat = document.getElementById('nyan-cat');
let sparksCombo = document.querySelector('.sparks-combo');
let currentFrame = 1;

function cycleFrames (_nyanCat, _currentFrame) {
    _nyanCat.classList = []
    _nyanCat.classList.add(`frame${_currentFrame}`)
}

function replicateSparks(_sparksRow) {
    const numberOfRowsToCoverEntireScreen = Math.ceil(
      document.body.offsetHeight / _sparksRow.offsetHeight
    );
  
    const newSparksRows = document.createElement("div");
  
    for (let a = 0; a < numberOfRowsToCoverEntireScreen - 1; a++) {
      const clonedSparksRow = _sparksRow.cloneNode(true);
      clonedSparksRow.querySelectorAll('.sparks-combo').forEach(sparksCombo => {
        sparksCombo.style.display = "block"; // or sparksCombo.style.visibility = "visible";
      });
      newSparksRows.appendChild(clonedSparksRow);
    }
  
    document.body.prepend(newSparksRows);
  }
  
  function startNyanCatAnimation() {
    // Display all sparks
    document.querySelectorAll('.sparks-combo').forEach(el => el.style.display = 'block');
    document.querySelectorAll('#wave-a').forEach(el => el.style.display = 'block');
    document.querySelectorAll('#wave-b').forEach(el => el.style.display = 'block');
    nyanCat.style.display = 'block';
  
    // Replicate all sparks
    document.querySelectorAll('.sparks-combo').forEach(sparksCombo => {
      replicateSparks(sparksCombo);
    });
  
    setInterval(function () {
      currentFrame = (currentFrame % 6) + 1;
      cycleFrames(nyanCat, currentFrame);
    }, 100);
  }



// Array of button classes
var buttonClasses = ['myButton1', 'myButton2', 'myButton3', 'myButton4', 'myButton5', 'myButton6', 'myButton7', 'myButton8', 'myButton9', 'myButton10'];

// Show the first class of buttons
showButtons(buttonClasses[0]);

// Function to show buttons of a certain class
function showButtons(buttonClass) {
  var buttons = document.getElementsByClassName(buttonClass);
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'block';
    buttons[i].style.position = 'absolute';
    buttons[i].style.left = getRandomPosition(window.innerWidth - buttons[i].offsetWidth) + 'px';
    buttons[i].style.top = getRandomPosition(window.innerHeight - buttons[i].offsetHeight) + 'px';
    buttons[i].addEventListener('click', function() {
      this.style.display = 'none';
      var allHidden = true;
      for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].style.display !== 'none') {
          allHidden = false;
          break;
        }
      }
      if (allHidden) {
        var nextIndex = buttonClasses.indexOf(buttonClass) + 1;
        if (nextIndex < buttonClasses.length) {
          showButtons(buttonClasses[nextIndex]);
        } else {
          // Display nyan animation
          // Assuming you have a function called displayNyanAnimation
          startNyanCatAnimation();
        }
      }
    });
  }
}

// Function to get a random position within a range
function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

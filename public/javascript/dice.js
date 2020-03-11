const faces = [
  'translateZ(-2.5rem) rotate3d(0, 0, 0, 0deg);',
  'translateZ(-2.5rem) rotate3d(0, 1, 0, -90deg);',
  'translateZ(-2.5rem) rotate3d(1, 0, 0, -90deg);',
  'translateZ(-2.5rem) rotate3d(1, 0, 0, 90deg);',
  'translateZ(-2.5rem) rotate3d(0, 1, 0, 90deg);',
  'translateZ(-2.5rem) rotate3d(0, 1, 0, 180deg);'
];
const updateDiceFace = function({ values }) {
  const dices = Array.from(document.querySelectorAll('div[id^="cube"]'));
  dices.forEach((dice, index) => {
    dice.className = `show${values[index]}`;
    setTimeout(() => {
      dice.className = '';
      dice.setAttribute('style', `transform :${faces[values[index] - 1]}`);
      const diceValue = values[0] + values[1];
      getPossiblePositions(diceValue);
    }, 2200);
  });
};

const getDicesValue = () => {
  const callBack = function({ values }) {
    document.querySelector('#dice1').src = `./images/dice/dice${values[0]}.png`;
    document.querySelector('#dice2').src = `./images/dice/dice${values[1]}.png`;
  };
  sendRequest('GET', '/rollDice', '', callBack);
};

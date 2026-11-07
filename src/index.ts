const main = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

const description = document.createElement('p');
description.textContent = 'Guess the secret number with unique digits.';

const settingsTitle = document.createElement('h2');
settingsTitle.textContent = 'Game settings';

const settingsForm = document.createElement('form');

const baseLabel = document.createElement('label');
baseLabel.htmlFor = 'base';
baseLabel.textContent = 'Numeral system';

const baseSelect = document.createElement('select');
baseSelect.id = 'base';
baseSelect.name = 'base';

const binaryOption = document.createElement('option');
binaryOption.value = '2';
binaryOption.textContent = 'Binary';

const octalOption = document.createElement('option');
octalOption.value = '8';
octalOption.textContent = 'Octal';

const decimalOption = document.createElement('option');
decimalOption.value = '10';
decimalOption.textContent = 'Decimal';

const hexadecimalOption = document.createElement('option');
hexadecimalOption.value = '16';
hexadecimalOption.textContent = 'Hexadecimal';

baseSelect.append(binaryOption, octalOption, decimalOption, hexadecimalOption);
settingsForm.append(baseLabel, baseSelect);
main.append(title, description, settingsTitle, settingsForm);
document.body.append(main);

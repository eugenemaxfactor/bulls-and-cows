import { generateSecret } from './game/generate-secret.js';

let secret = '';

function handleSettingsSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const selectedBase = Number(baseSelect.value);
  const selectedLength = Number(lengthSelect.value);

  secret = generateSecret(selectedLength, selectedBase);
  settingsSummary.textContent = `A ${secret.length}-digit secret is ready.`;
}

function updateLengthOptions(): void {
  const isBinary = baseSelect.value === '2';

  threeDigitsOption.disabled = isBinary;
  fourDigitsOption.disabled = isBinary;
  fiveDigitsOption.disabled = isBinary;
  sixDigitsOption.disabled = isBinary;

  if (isBinary) {
    lengthSelect.value = '2';
  }
}

const main = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

const description = document.createElement('p');
description.textContent = 'Guess the secret number with unique digits.';

const settingsTitle = document.createElement('h2');
settingsTitle.textContent = 'Game settings';

const settingsForm = document.createElement('form');
settingsForm.addEventListener('submit', handleSettingsSubmit);

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

const lengthLabel = document.createElement('label');
lengthLabel.htmlFor = 'length';
lengthLabel.textContent = 'Secret length';

const lengthSelect = document.createElement('select');
lengthSelect.id = 'length';
lengthSelect.name = 'length';

const twoDigitsOption = document.createElement('option');
twoDigitsOption.value = '2';
twoDigitsOption.textContent = '2 digits';

const threeDigitsOption = document.createElement('option');
threeDigitsOption.value = '3';
threeDigitsOption.textContent = '3 digits';

const fourDigitsOption = document.createElement('option');
fourDigitsOption.value = '4';
fourDigitsOption.textContent = '4 digits';

const fiveDigitsOption = document.createElement('option');
fiveDigitsOption.value = '5';
fiveDigitsOption.textContent = '5 digits';

const sixDigitsOption = document.createElement('option');
sixDigitsOption.value = '6';
sixDigitsOption.textContent = '6 digits';

lengthSelect.append(
  twoDigitsOption,
  threeDigitsOption,
  fourDigitsOption,
  fiveDigitsOption,
  sixDigitsOption,
);

baseSelect.addEventListener('change', updateLengthOptions);
updateLengthOptions();

const startButton = document.createElement('button');
startButton.type = 'submit';
startButton.textContent = 'Start game';

const settingsSummary = document.createElement('p');

settingsForm.append(
  baseLabel,
  baseSelect,
  lengthLabel,
  lengthSelect,
  startButton,
);
main.append(title, description, settingsTitle, settingsForm, settingsSummary);
document.body.append(main);

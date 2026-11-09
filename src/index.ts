import { countPossibleSecrets } from './game/count-possible-secrets.js';
import { createDigitValidator } from './game/create-digit-validator.js';
import { evaluateGuess } from './game/evaluate-guess.js';
import { generateSecret } from './game/generate-secret.js';
import { isValidGuess } from './game/is-valid-guess.js';

interface GuessHistoryEntry {
  guess: string;
  bulls: number;
  cows: number;
}

interface GameRecord {
  attempts: number;
  durationInSeconds: number;
  length: number;
  base: number;
}

const recordsStorageKey = 'bulls-and-cows-records';
const recordsLimit = 10;

let secret = '';
let guessHistory: GuessHistoryEntry[] = [];
let roundStartedAt = 0;
let gameRecords: GameRecord[] = [];

const savedRecords = localStorage.getItem(recordsStorageKey);

if (savedRecords) {
  gameRecords = (JSON.parse(savedRecords) as GameRecord[])
    .sort(compareGameRecords)
    .slice(0, recordsLimit);
}

function createOption(value: string, text: string): HTMLOptionElement {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;

  return option;
}

function handleSettingsSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const selectedBase = Number(baseSelect.value);
  const selectedLength = Number(lengthSelect.value);

  secret = generateSecret(selectedLength, selectedBase);
  roundStartedAt = Date.now();
  baseSelect.disabled = true;
  lengthSelect.disabled = true;
  startButton.disabled = true;
  settingsSummary.textContent = `A ${secret.length}-digit secret is ready.`;
  guessInput.maxLength = selectedLength;
  guessTitle.hidden = false;
  guessLabel.hidden = false;
  guessInput.hidden = false;
  checkButton.hidden = false;
  historyTitle.hidden = false;
  historyList.hidden = false;
}

function updatePossibleSecrets(): void {
  const selectedBase = Number(baseSelect.value);
  const selectedLength = Number(lengthSelect.value);
  const possibleSecrets = countPossibleSecrets(selectedLength, selectedBase);

  possibleSecretsMessage.textContent = `Possible secrets: ${possibleSecrets}`;
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

  updatePossibleSecrets();
}

function handleGuessInput(): void {
  const selectedBase = Number(baseSelect.value);
  const isValidDigit = createDigitValidator(selectedBase);
  const guessCharacters = guessInput.value.split('');
  const validCharacters = guessCharacters.filter(isValidDigit);

  guessInput.value = validCharacters.join('');
}

function createHistoryListItem(entry: GuessHistoryEntry): HTMLLIElement {
  const historyItem = document.createElement('li');
  historyItem.textContent = `${entry.guess}: ${entry.bulls} bulls, ${entry.cows} cows`;

  return historyItem;
}

function renderGuessHistory(): void {
  const historyItems = guessHistory.map(createHistoryListItem);

  historyList.replaceChildren(...historyItems);
}

function compareGameRecords(
  firstRecord: GameRecord,
  secondRecord: GameRecord,
): number {
  if (firstRecord.attempts !== secondRecord.attempts) {
    return firstRecord.attempts - secondRecord.attempts;
  }

  return firstRecord.durationInSeconds - secondRecord.durationInSeconds;
}

function createGameRecordListItem(record: GameRecord): HTMLLIElement {
  const recordItem = document.createElement('li');
  recordItem.textContent = `${record.length} digits, base ${record.base}: ${record.attempts} attempts, ${record.durationInSeconds} seconds`;

  return recordItem;
}

function renderGameRecords(): void {
  const recordItems = gameRecords.map(createGameRecordListItem);

  recordsList.replaceChildren(...recordItems);
}

function hasGuessBeenUsed(
  history: GuessHistoryEntry[],
  guess: string,
): boolean {
  const normalizedGuess = guess.toLowerCase();

  function isSameGuess(entry: GuessHistoryEntry): boolean {
    return entry.guess === normalizedGuess;
  }

  return history.some(isSameGuess);
}

function handleCheckButtonClick(): void {
  const selectedBase = Number(baseSelect.value);
  const selectedLength = Number(lengthSelect.value);
  const guessIsValid = isValidGuess(
    guessInput.value,
    selectedLength,
    selectedBase,
  );

  if (guessIsValid) {
    const guessWasUsed = hasGuessBeenUsed(guessHistory, guessInput.value);

    if (guessWasUsed) {
      guessMessage.textContent = 'This guess has already been used.';
      return;
    }

    const guessResult = evaluateGuess(secret, guessInput.value);
    const historyEntry: GuessHistoryEntry = {
      guess: guessInput.value.toLowerCase(),
      bulls: guessResult.bulls,
      cows: guessResult.cows,
    };

    guessHistory = [...guessHistory, historyEntry];
    renderGuessHistory();

    if (guessResult.bulls === secret.length) {
      const roundFinishedAt = Date.now();
      const roundDurationInSeconds = Math.floor(
        (roundFinishedAt - roundStartedAt) / 1000,
      );
      const gameRecord: GameRecord = {
        attempts: guessHistory.length,
        durationInSeconds: roundDurationInSeconds,
        length: selectedLength,
        base: selectedBase,
      };

      gameRecords = [...gameRecords, gameRecord]
        .sort(compareGameRecords)
        .slice(0, recordsLimit);
      localStorage.setItem(recordsStorageKey, JSON.stringify(gameRecords));
      renderGameRecords();

      guessMessage.textContent = `You guessed the secret number in ${guessHistory.length} attempts and ${roundDurationInSeconds} seconds!`;
      guessInput.disabled = true;
      checkButton.disabled = true;
      newGameButton.hidden = false;
    } else {
      guessMessage.textContent = `Bulls: ${guessResult.bulls}, cows: ${guessResult.cows}.`;
    }
  } else {
    guessMessage.textContent = 'Enter the correct number of unique digits.';
  }
}

function handleNewGameButtonClick(): void {
  secret = '';
  guessHistory = [];
  roundStartedAt = 0;
  baseSelect.disabled = false;
  lengthSelect.disabled = false;
  startButton.disabled = false;
  settingsSummary.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessTitle.hidden = true;
  guessLabel.hidden = true;
  guessInput.hidden = true;
  checkButton.disabled = false;
  checkButton.hidden = true;
  guessMessage.textContent = '';
  historyTitle.hidden = true;
  historyList.hidden = true;
  historyList.replaceChildren();
  newGameButton.hidden = true;
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

const binaryOption = createOption('2', 'Binary');
const octalOption = createOption('8', 'Octal');
const decimalOption = createOption('10', 'Decimal');
const hexadecimalOption = createOption('16', 'Hexadecimal');

baseSelect.append(binaryOption, octalOption, decimalOption, hexadecimalOption);

const lengthLabel = document.createElement('label');
lengthLabel.htmlFor = 'length';
lengthLabel.textContent = 'Secret length';

const lengthSelect = document.createElement('select');
lengthSelect.id = 'length';
lengthSelect.name = 'length';

const twoDigitsOption = createOption('2', '2 digits');
const threeDigitsOption = createOption('3', '3 digits');
const fourDigitsOption = createOption('4', '4 digits');
const fiveDigitsOption = createOption('5', '5 digits');
const sixDigitsOption = createOption('6', '6 digits');

lengthSelect.append(
  twoDigitsOption,
  threeDigitsOption,
  fourDigitsOption,
  fiveDigitsOption,
  sixDigitsOption,
);

baseSelect.addEventListener('change', updateLengthOptions);
lengthSelect.addEventListener('change', updatePossibleSecrets);

const startButton = document.createElement('button');
startButton.type = 'submit';
startButton.textContent = 'Start game';

const settingsSummary = document.createElement('p');

const possibleSecretsMessage = document.createElement('p');
updateLengthOptions();

const guessTitle = document.createElement('h2');
guessTitle.textContent = 'Your guess';
guessTitle.hidden = true;

const guessLabel = document.createElement('label');
guessLabel.htmlFor = 'guess';
guessLabel.textContent = 'Your guess';
guessLabel.hidden = true;

const guessInput = document.createElement('input');
guessInput.id = 'guess';
guessInput.name = 'guess';
guessInput.type = 'text';
guessInput.autocomplete = 'off';
guessInput.hidden = true;
guessInput.addEventListener('input', handleGuessInput);

const checkButton = document.createElement('button');
checkButton.type = 'button';
checkButton.textContent = 'Check guess';
checkButton.hidden = true;
checkButton.addEventListener('click', handleCheckButtonClick);

const guessMessage = document.createElement('p');

const historyTitle = document.createElement('h2');
historyTitle.textContent = 'Guess history';
historyTitle.hidden = true;

const historyList = document.createElement('ul');
historyList.hidden = true;

const recordsTitle = document.createElement('h2');
recordsTitle.textContent = 'Best results';

const recordsList = document.createElement('ol');

const newGameButton = document.createElement('button');
newGameButton.type = 'button';
newGameButton.textContent = 'New game';
newGameButton.hidden = true;
newGameButton.addEventListener('click', handleNewGameButtonClick);

settingsForm.append(
  baseLabel,
  baseSelect,
  lengthLabel,
  lengthSelect,
  startButton,
);
main.append(
  title,
  description,
  settingsTitle,
  settingsForm,
  possibleSecretsMessage,
  settingsSummary,
  guessTitle,
  guessLabel,
  guessInput,
  checkButton,
  guessMessage,
  historyTitle,
  historyList,
  newGameButton,
  recordsTitle,
  recordsList,
);
document.body.append(main);
renderGameRecords();

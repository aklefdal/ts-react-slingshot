import { roundNumber } from './mathHelper';

function getCurrencyFormattedNumber(value) {
  if (value === null) {
    return '';
  }

  value = this.getFormattedNumber(value);
  return `$${value}`;
}

function getFormattedNumber(value: number): string {
  if (value === 0) {
    return '0';
  }

  if (!value) {
    return '';
  }

  if (!this.isInt(this.scrubFormatting(value))) {
    return ''; // if it's not a number after scrubbing formatting, just return empty.
  }

  const roundedValue = roundNumber(value, 2); // round if more than 2 decimal points

  // add commas for 1,000's.
  // RegEx from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const formattedRoundedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const roundedValueContainsDecimalPlace = (formattedRoundedValue.indexOf('.') !== -1);

  if (roundedValueContainsDecimalPlace) {
    const numbersToTheRightOfDecimal = formattedRoundedValue.split('.')[1];

    switch (numbersToTheRightOfDecimal.length) {
      case 0:
        return formattedRoundedValue.replace('.', ''); // no decimal necessary since no numbers after decimal

      case 1:
        return `${formattedRoundedValue}0`;

      default:
        return formattedRoundedValue;
    }
  }

  return formattedRoundedValue;
}

function isInt(n: any): boolean {
  if (n === '' || n === null) {
    return false;
  }

  return n % 1 === 0;
}

function scrubFormatting(value: string): string {
  return `${value}`.replace(/[$,\.]/ig, '');
}

const numberFormatter = {
  getCurrencyFormattedNumber,
  getFormattedNumber,
  isInt,
  scrubFormatting
};

export default numberFormatter;

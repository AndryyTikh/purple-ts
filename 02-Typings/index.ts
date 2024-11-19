// Решил если импортировать через require, то так попробовать типизировать, т.к. исходников функций не имеем))
var makeOrdinal = require('./makeOrdinal') as (arg: string) => string;
var isFinite = require('./isFinite') as (arg: number) => boolean;
var isSafeNumber = require('./isSafeNumber') as (arg: number) => boolean;

enum BIG_NUMBERS {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1000000,
    ONE_BILLION = 1000000000,           //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000,       //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
    MAX = 9007199254740992,             // 9.007.199.254.740.992 (15)
}

// Можно использовать enum, но более очевидным вариантом кажется массив
const LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
// Можно использовать enum, но более очевидным вариантом кажется массив
const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number: number | string, asOrdinal: boolean): string {
    var words: string;
    // parseInt первым аргументом принимает строку
    var num = parseInt(String(number), 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words: string[] = []): string {
    var remainder: number = 0
    var word: string = ''

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }

    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < BIG_NUMBERS.ONE_HUNDRED) {
        remainder = number % BIG_NUMBERS.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / BIG_NUMBERS.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < BIG_NUMBERS.ONE_THOUSAND) {
        remainder = number % BIG_NUMBERS.ONE_HUNDRED;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_HUNDRED)) + ' hundred';

    } else if (number < BIG_NUMBERS.ONE_MILLION) {
        remainder = number % BIG_NUMBERS.ONE_THOUSAND;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_THOUSAND)) + ' thousand,';

    } else if (number < BIG_NUMBERS.ONE_BILLION) {
        remainder = number % BIG_NUMBERS.ONE_MILLION;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_MILLION)) + ' million,';

    } else if (number < BIG_NUMBERS.ONE_TRILLION) {
        remainder = number % BIG_NUMBERS.ONE_BILLION;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_BILLION)) + ' billion,';

    } else if (number < BIG_NUMBERS.ONE_QUADRILLION) {
        remainder = number % BIG_NUMBERS.ONE_TRILLION;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_TRILLION)) + ' trillion,';

    } else if (number <= BIG_NUMBERS.MAX) {
        remainder = number % BIG_NUMBERS.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / BIG_NUMBERS.ONE_QUADRILLION)) +
            ' quadrillion,';
    }

    words.push(word);
    return generateWords(remainder, words);
}

module.exports = toWords;
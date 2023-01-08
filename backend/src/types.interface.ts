export interface ShortResponse {
  statusCode: number,
  message: string,
  data: string
}

export interface ErrorResponse {
  statusCode: number,
  message: string
}

export const isValidUrl = (url: string) : boolean => {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null);
};

/**
 * function to generate unique id's with set prefixes.
 * @param {string} prefix - prefix to be added to the id.
 * @param {number} length - length of the id including prefix.
 * @returns {string} - unique id.
 */
export const generateObjectId = (
  prefix: string | undefined = '',
  length = 8 
): string => {
  let id = prefix || '';

  // Always start the id with a char
  id += (Math.floor(Math.random() * 25) + 10).toString(36);

  // Add a timestamp in milliseconds (base 36) for uniqueness
  id += new Date().getTime().toString(36);

  // Similar to above, complete the Id using random, alphanumeric characters
  do {
    id += Math.floor(Math.random() * 35).toString(36);
  } while (id.length < length);

  return id;
};

export const base62 = {
  charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

  encode: (integer: number)  => {
    // if (integer === 0) {
    //   return 0;
    // }
    let s = [];
    while (integer > 0) {
      s = [base62.charset[integer % 62], ...s];
      integer = Math.floor(integer / 62);
    }
    return s.join('');
  },

  decode: (chars: string) => chars.split('').reverse()
    .reduce((prev, curr, i) => prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};
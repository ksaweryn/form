import { randomPassword } from './textUtil';
import {
  EMAIL_REGEX,
  INVALID_USERNAME_CHARACTERS_REGEX,
  PASSWORD_REGEX,
} from './regexUtil';

describe('Password regex validation', () => {
  test('should generate valid password', () => {
    const password = randomPassword();

    expect(password.match(PASSWORD_REGEX)).toBeTruthy();
  });
  test('not valid password if only letters', () => {
    const password = 'anyText';

    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
  test('not valid password if only numbers', () => {
    const password = '134245335345354';

    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
  test('not valid password if only special characters', () => {
    const password = '!@@#$%#$%>@#$>@#>$@?__=';

    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
  test('not valid password if no upper case letters', () => {
    const password = 'qweqw!@#!123';

    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
  test('not valid password if no lower case letters', () => {
    const password = 'Q12312!@#!@#!@_=+';

    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
  test('not valid password if length less than 8 characters', () => {
    const password = 'Q1!f=+2';
    expect(password.match(PASSWORD_REGEX)).toBeFalsy();
  });
});

describe('Username regex validation', () => {
  test('valid username', () => {
    const username = 'anyValidTextWithNumbers90';
    expect(username.match(INVALID_USERNAME_CHARACTERS_REGEX)).toBeFalsy();
  });
  test('valid username with onlyNumbers', () => {
    const username = `${Math.ceil(Math.random() * 10)}`;
    expect(username.match(INVALID_USERNAME_CHARACTERS_REGEX)).toBeFalsy();
  });
  test('invalid username with special character', () => {
    const username = 'anySpecialCharacter';
    const specialCharacters = '!"§$%&/()=?\u{20ac}';
    const specialCharacter = specialCharacters.substring(
      Math.floor(specialCharacters.length * Math.random()),
      1
    );
    expect(
      `${username}${specialCharacter}`.match(INVALID_USERNAME_CHARACTERS_REGEX)
    ).toBeTruthy();
  });
});

describe('Email regex validation', () => {
  test('valid email', () => {
    const email = 'username@anydomain.something';
    expect(email.match(EMAIL_REGEX)).toBeTruthy();
  });
  test('invalid email not @', () => {
    const email = 'usernameanydomain.something';
    expect(email.match(EMAIL_REGEX)).toBeFalsy();
  });
  test('invalid email not correct domain part', () => {
    const email = 'username@anydomain.';
    expect(email.match(EMAIL_REGEX)).toBeFalsy();
  });
  test('invalid email not user part', () => {
    const email = '@anydomain.something';
    expect(email.match(EMAIL_REGEX)).toBeFalsy();
  });
  test('invalid email with white space on domain', () => {
    const email = 'username@anydomain. something';
    expect(email.match(EMAIL_REGEX)).toBeFalsy();
  });
  test('invalid email with white space on username', () => {
    const email = 'user name@anydomain.something';
    expect(email.match(EMAIL_REGEX)).toBeFalsy();
  });
});

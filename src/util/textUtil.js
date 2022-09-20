import { generate } from '@wcj/generate-password';

export const getLastCharacterTyped = (value) => {
  const lastCharacter = value.slice(-1);
  if (lastCharacter === ' ') return 'a white space';
  return lastCharacter;
};

export const randomPassword = () =>
  generate({
    length: 20,
  });

export const capitalize = (value) => {
  if (typeof value !== 'string') return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
  return ''
}

export const SplitWords = (value) => {
  value = value.split('/')[1];
  const regex = /-/;
  let list = ['faqlist', 'addfaq', 'updatefaq', 'addcategory']
  if (typeof value !== 'string') return ''

  if (value === 'faqlist') return 'FAQ LIST'
  if (value === 'addfaq') return 'ADD FAQ'
  if (value === 'updatefaq') return 'UPDATE FAQ'
  if (value === 'addcategory') return 'ADD CATEGORY'

  if (regex.test(value)) {
    const searchString = "-";
    const replacementString = " ";

    const regex = new RegExp(searchString, 'g');

    const modifiedString = value.replace(regex, replacementString);
    return modifiedString.toUpperCase()
  }

  // Use regular expression to split on capital letters
  const wordsArray = value.split(/(?=[A-Z])/);

  // Join the words with a space to form a sentence
  const sentence = wordsArray.join(' ');
  return sentence.toUpperCase()
}
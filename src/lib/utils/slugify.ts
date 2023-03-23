export const slugify = (str: string) => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const extractParams = (_slug: string): [boolean, Array<string>] => {
  console.log('found slug', _slug)
  const matches = _slug.match(/^(\d+)-(.+)$/)
  if (!matches) {
    return [false, []]
  }
  const [, id, slug] = matches
  return [true, [id, slug]]
}
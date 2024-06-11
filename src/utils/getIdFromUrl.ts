function getIdFromUrl(url: string): string | null {
  const id = url.split('/').at(-1);
  return id ? id : null;
}

export { getIdFromUrl };

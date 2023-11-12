const FILE_SERVER = process.env.NEXT_PUBLIC_FILE_SERVER ?? "";

export function fsUrl(uri: string) {
  return `${FILE_SERVER}${uri}`;
}

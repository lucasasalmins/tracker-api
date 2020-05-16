
/**
 * Given a ReadSteam, return a file buffer
 */
export const bufferFromReadStream = (createReadStream: Function): Promise<any> => {
  const stream = createReadStream()

  return new Promise((resolve, reject) => {
    const file = []
    stream.on('data', (chunk) => { file.push(chunk) })
    stream.on('error', (e) => { reject(e) })
    stream.on('end', () => { resolve(file[0]) })
  })
}

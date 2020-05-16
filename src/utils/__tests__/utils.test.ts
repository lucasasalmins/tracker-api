
import * as fs from 'fs'
import * as path from 'path'
import * as Utils from '../index'

it('bufferFromReadStream', async () => {
  const dqRulesPath = path.join('src', 'db', 'data_quality_rules.csv')
  const readStream = () => fs.createReadStream(dqRulesPath)

  expect(await Utils.bufferFromReadStream(readStream)).toBeInstanceOf(Buffer)
})
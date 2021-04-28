const fs = require('fs')
const { solution } = require('./solution')

const limit = 120
const lines = 8

const min = 20
const max = limit 

function minToTimeString(mins) {
	const hr = Math.floor(mins / 60)
	const m = mins % 60
	const str = (!!hr ? `${hr} hr ` : '') + (!!m ? `${m} min`: '')
	return str
}

function makeModules() {
	const modules = [] 
	for(let i = 0; i < lines; i++) {
		const time = Math.floor(Math.random() * (max - min) + min)
		modules.push(minToTimeString(time))
	}
	return modules
}

function writeFile(modules) {
	return new Promise((resolve, reject) => {
		const stringifiedModules = modules.join('\n')
		const dataString = limit + '\n' + lines + '\n'
		const data = dataString + stringifiedModules
		fs.appendFile('data.txt', data, (err) => {
			if(err) {
				reject(err)
			} else {
				resolve(data.length)
			}
		})
	})
}

const readDataAndCallSolution = () => {
  fs.readFile('data.txt', 'utf8', (err,data) => {
    console.log('finished reading\n')
    if(err) {
      console.warn(err)
    } else {
      const splitData = data.trim().split('\n')
      const moduleArray = splitData.slice(2)
      console.log('solution is:')
      console.log(solution(moduleArray, splitData[0], splitData[1]))
    }
  })
}

const modulesToWrite = makeModules()
writeFile(modulesToWrite).then((written) => {
  console.log('finished writing\n')
  readDataAndCallSolution()
})

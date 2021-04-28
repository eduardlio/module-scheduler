const fs = require('fs')

const limit = 120
const lines = 8
const min = 20
const max = 90
// max is the limit

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

const expr = /(\d+ hr)?(?:\s)?(\d+ min)?/;
function timeStringToMins(str) {
	const result = expr.exec(str)
	if(result) {
		const [_, hrStr, minStr] = result
		const hours = hrStr ? parseInt(hrStr.split(' ')[0], 10) * 60 : 0
		const mins = minStr ? parseInt(minStr.split(' ')[0], 10) : 0
		return hours + mins
	} else {
		return 0
	}
}

function solution(data, limit, lines) {
	const days = []

	let buffer = []
	let daySum = 0

	let cursor = 0;
	while(cursor < lines) {
		const moduleTime = timeStringToMins(data[cursor])
		console.log(moduleTime)

		if((daySum + moduleTime) > limit) {
			days.push(buffer)
			buffer = []
			daySum = 0
		}

		buffer.push(moduleTime)
		daySum += moduleTime

		cursor++
	}
	days.push(buffer)
	console.log(days)
	return days.length
}

const modulesToWrite = makeModules()
writeFile(modulesToWrite).then((written) => {
	console.log('finished writing\n')
	if(1) {
		fs.readFile('data.txt', 'utf8', (err,data) => {
			console.log('finished reading\n')
			if(err) {
				console.warn(err)
			} else {
				const splitData = data.trim().split('\n')
				const moduleArray = splitData.slice(2)
				console.log(moduleArray)
				console.log('solution is:')
				console.log(solution(moduleArray, splitData[0], splitData[1]))
			}
		})
	}
})

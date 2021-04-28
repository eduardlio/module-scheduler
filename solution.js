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
  return days.length
}
module.exports = {
  solution
}

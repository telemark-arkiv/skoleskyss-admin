'use strict'

module.exports = data => {
  let stats = []

  if (data.total && data.total.total) {
    stats.push({name: 'Totalt antall søknader', count: data.total.total || 0})
  } else {
    stats.push({name: 'Totalt antall søknader', count: 0})
  }
  if (data.schools && Array.isArray(data.schools)) {
    data.schools.forEach(item => {
      if (item._id !== null) {
        stats.push({name: item._id, count: item.total})
      }
    })
  }
  if (data.categories && Array.isArray(data.categories)) {
    data.categories.forEach(item => {
      if (item._id !== null) {
        stats.push({name: item._id, count: item.total})
      }
    })
  }

  return stats
}

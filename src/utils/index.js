const utils = {
	getMonthName: function(name) {
		const monthName = {
			Jan: 'Jan',
			Feb: 'Feb',
			Mar: 'Mär',
			Apr: 'Apr',
			May: 'Mai',
			Jun: 'Jun',
			Jul: 'Jul',
			Aug: 'Aug',
			Sep: 'Sep',
			Oct: 'Okt',
			Nov: 'Nov',
			Dec: 'Dez',
			January: 'Januar',
			February: 'Februar',
			March: 'März',
			April: 'April',
			June: 'Juni',
			July: 'Juli',
			August: 'August',
			September: 'September',
			October: 'Oktober',
			November: 'November',
			December: 'Dezember',
		}
		return monthName[name]
	},
	formatDate: function(startDate) {
		const startDay = startDate.split(' ')[0] || ''
		const startMonth = startDate.split(' ')[1] || ''
		const startYear = startDate.split(' ')[2] || ''
		return [startDay, this.getMonthName(startMonth), startYear].join(' ')
	},
	ScrollTo: function(e) {
		e.preventDefault()
		const target = e.target.dataset.target
		const element = document.getElementById(target)
		element.scrollIntoView({ behavior: 'smooth', block: 'start' })
	},
	getColor: function(name) {
		const colorClass = {
			textMuted: 'text-gray-700',
		}
		return colorClass[name]
	},
}

export { utils }

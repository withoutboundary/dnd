'use strict'

import lodash from 'lodash'
import moment from 'moment'

class Calendar {
	constructor(calendarId, apiKey) {
		this.calendarId = calendarId
		this.apiKey = apiKey
		this.week = moment().startOf('isoWeek')
	}

	generateUrl() {
		const parts = [
			'https://content.googleapis.com/calendar/v3/calendars/',
			encodeURIComponent(this.calendarId),
			'/events?timeMin=',
			this.week.toISOString(),
			'&timeMax=',
			this.week.clone().add(1, 'week').toISOString(),
			'&orderBy=startTime&singleEvents=true&key=',
			this.apiKey,
		]

		return parts.join('')
	}

	thisWeek() {
		this.week = moment().startOf('isoWeek')
	}

	previousWeek() {
		this.week.subtract(1, 'week')
	}

	nextWeek() {
		this.week.add(1, 'week')
	}

	getEvents() {
		return new Promise((resolve, reject) => {
			const config = {
				method: 'GET',
				headers: new Headers(),
				mode: 'cors',
				credentials: 'omit'
			}

			fetch(this.generateUrl(), config)
				.then(function(response) {
					return response.json()
				})
				.then(function(response) {
					const events = []

					lodash.forEach(response.items, item => {
						events.push(formatEventItem(item))
					})

					resolve(events)
				})
		})
	}
}

function formatEventItem(item) {
	return lodash.merge({
		game: item.summary,
		start: moment(item.start.dateTime),
		finish: moment(item.end.dateTime),
	}, parseDescription(item.description))
}

/*
GM: John Smith
System: D&D 5e
Available: Yes
Facilities: N/A
Logo: logo-d&d.png
 */

function parseDescription(desc) {
	const parsed = {
		gm: '',
		system: '',
		available: false,
		facilities: '',
		img: 'images/',
	}

	desc.split("\n").forEach(line => {
		const parts = line.split(':')

		switch (parts[0].toLowerCase().trim()) {
			case 'gm':
				parsed.gm = parts[1].trim()
				break
			case 'system':
				parsed.system = parts[1].trim()
				break
			case 'available':
				parsed.available = parts[1].toLowerCase().trim() === 'yes' ? true : false
				break
			case 'facilities':
				parsed.facilities = parts[1].trim()
				break
			case 'logo':
				parsed.img += parts[1].trim()
				break
		}
	})

	return parsed
}

export { Calendar }

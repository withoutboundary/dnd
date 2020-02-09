'use strict'

import lodash from 'lodash'
import moment from 'moment'

class Calendar {
	constructor(calendarId, apiKey) {
		this.calendarId = calendarId
		this.apiKey = apiKey
	}

	generateUrl(start, finish) {
		const parts = [
			'https://content.googleapis.com/calendar/v3/calendars/',
			encodeURIComponent(this.calendarId),
			'/events?timeMin=',
			start.toISOString(),
			'&timeMax=',
			finish.toISOString(),
			'&orderBy=startTime&singleEvents=true&key=',
			this.apiKey,
		]

		return parts.join('')
	}

	getEvents(start, finish) {
		return new Promise((resolve, reject) => {
			const config = {
				method: 'GET',
				headers: new Headers(),
				mode: 'cors',
				credentials: 'omit'
			}

			fetch(this.generateUrl(start, finish), config)
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
	const start = moment(item.start.dateTime)
	return lodash.merge({
		game: item.summary,
		start: start,
		time: start.minutes() === 0 ? start.format('ha') : start.format('h:mma'),
		finish: moment(item.end.dateTime),
	}, parseDescription(item.description || ''))
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
		img: false,
	}

	lodash.forEach(desc.split("\n"), line => {
		const parts = line.split(':')

		switch (parts[0].toLowerCase().trim()) {
			case 'gm':
				parsed.gm = parts[1].trim()
				break
			case 'system':
				parsed.system = parts[1].trim()
				break
			case 'availability':
				parsed.available = parts[1].toLowerCase().trim() === 'yes' ? true : false
				break
			case 'facilities':
				parsed.facilities = parts[1].trim()
				break
			case 'logo':
				parsed.img = parts[1].trim()
				break
			case '===':
				// exit early
				return false
			default:
				// do nothing
				break;
		}
	})

	return parsed
}

export { Calendar }

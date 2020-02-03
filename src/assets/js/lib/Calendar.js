'use strict';

import lodash from 'lodash';
import moment from 'moment';

class Calendar {
	constructor(calendarId, apiKey) {
		this.calendarId = calendarId;
		this.apiKey = apiKey;
		this.week = moment().startOf('isoWeek');
	}

	generateUrl() {
		const parts = [
			'https://content.googleapis.com/calendar/v3/calendars/',
			this.calendarId,
			'/events?timeMin=',
			this.week.toISOString(),
			'&timeMax=',
			this.week.clone().add(1, 'week').toISOString(),
			'&orderBy=startTime&singleEvents=true&key=',
			this.apiKey,
		];

		return parts.join('');
	}

	thisWeek() {
		this.week = moment().startOf('isoWeek');
	}

	previousWeek() {
		this.week.subtract(1, 'week');
	}

	nextWeek() {
		this.week.add(1, 'week');
	}

	getEvents() {
		var config = { method: 'GET',
									 headers: new Headers(),
									 mode: 'cors',
									 credentials: 'omit' };

		fetch(this.generateUrl(), config)
			.then(function(response) {
				return response.json();
			})
			.then(function(response) {
				lodash.forEach(response.items, function(item) {
					console.log(formatEventItem(item));
				});
			});
	}
}

function formatEventItem(item) {
	return item;
};

export { Calendar };

'use strict'

import Vue from 'vue'
import { Calendar } from 'lib/Calendar'
import domtoimage from 'dom-to-image'
import Schedule from 'components/exiles/Schedule'

const calendar = new Calendar(
	'64v9bnr8pq5cf32jmm076r1gr8@group.calendar.google.com',
	'AIzaSyDDbUg1MbLU9xW4LziSj2lEJBt8cTBdbDY'
)

const ExilesApp = new Vue({
	el: '#exiles',
	components: {
		'c-exiles-schedule': Schedule,
	},
	data: function() {
		return {
			imageSrcWeek: null,
			imageSrcWeekend: null,
			dateWeek: 'April 3rd &ndash; April 6th',
			dateWeekend: 'April 7th &ndash; April 9th',
			week: {
				sections: [
					{
						label: 'Monday',
						items: [],
					},
					{
						label: 'Tuesday',
						items: [],
					},
					{
						label: 'Wednesday',
						items: [],
					},
					{
						label: 'Thursday',
						items: [],
					},
				],
			},
			weekend: {
				sections: [
					{
						label: 'Friday',
						items: [],
					},
					{
						label: 'Saturday',
						items: [],
					},
					{
						label: 'Sunday',
						items: [],
					},
				],
			},
		}
	},
	methods: {
		generate() {
			this.imageSrcWeek = null
			this.imageSrcWeekend = null

			const scaling = {
				width: this.$refs.week.$el.clientWidth * 4,
				height: this.$refs.week.$el.clientHeight * 4,
				style: {
					transform: 'scale(4)',
					transformOrigin: 'top left'
				}
			}

			domtoimage.toPng(this.$refs.week.$el, scaling)
				.then(dataUrl => {
					this.imageSrcWeek = dataUrl
				})
				.catch(function(error) {
					console.error('oops, something went wrong!', error)
				})

			domtoimage.toPng(this.$refs.weekend.$el, scaling)
				.then(dataUrl => {
					this.imageSrcWeekend = dataUrl
				})
				.catch(function(error) {
					console.error('oops, something went wrong!', error)
				})
		},
		getEvents() {
			calendar.getEvents().then(this.parseEvents)
		},
		parseEvents(events) {
			const mapDay = {
				monday: 0,
				tuesday: 1,
				wednesday: 2,
				thursday: 3,
				friday: 0,
				saturday: 1,
				sunday: 2,
			}

			events.forEach(event => {
				const day = event.start.format('dddd').toLowerCase()
				let part = null

				switch (day) {
					case 'monday':
					case 'tuesday':
					case 'wednesday':
					case 'thursday':
						part = 'week'
						break;
					case 'friday':
					case 'saturday':
					case 'sunday':
						part = 'weekend'
						break;
				}

				console.log(this[part])

				this[part].sections[mapDay[day]].items.push({
					available: event.available,
					facilities: event.facilities,
					finish: event.finish,
					game: event.game,
					gm: event.gm,
					img: event.img,
					start: event.start,
					system: event.system,
					time: event.time,
				})
			})
		}
	},
})
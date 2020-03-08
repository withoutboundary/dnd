'use strict'

import copy from 'copy-to-clipboard'
import domtoimage from 'dom-to-image'
import lodash from 'lodash'
import moment from 'moment'
import Schedule from 'components/exiles/Schedule'
import Vue from 'vue'
import { Calendar } from 'lib/Calendar'

const calendar = new Calendar(
	//'64v9bnr8pq5cf32jmm076r1gr8@group.calendar.google.com',
	'exiles.schedule@gmail.com',
	'AIzaSyDDbUg1MbLU9xW4LziSj2lEJBt8cTBdbDY'
)

const ExilesApp = new Vue({
	el: '#exiles',
	components: {
		'c-exiles-schedule': Schedule,
	},
	data() {
		return {
			startOfWeek: null,
			imageSrcWeek: null,
			imageSrcWeekend: null,
			theme: '',
			events: [],
			week: null,
			weekend: null,
			openingTimes: {},
			days: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			defaultWeek: {
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
			defaultWeekend: {
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
			}
		}
	},
	mounted() {
		this.week = lodash.cloneDeep(this.defaultWeek)
		this.weekend = lodash.cloneDeep(this.defaultWeekend)
	},
	computed: {
		dateWeek() {
			if (!this.startOfWeek) {
				return null
			}

			const monday = this.startOfWeek.clone()
			const thursday = monday.clone().add(3, 'day')

			return monday.format('MMMM Do') + ' &ndash; ' + thursday.format('MMMM Do')
		},
		dateWeekend() {
			if (!this.startOfWeek) {
				return null
			}

			const friday = this.startOfWeek.clone().add(4, 'day')
			const sunday = friday.clone().add(2, 'day')

			return friday.format('MMMM Do') + ' &ndash; ' + sunday.format('MMMM Do')
		},
	},
	methods: {
		generate() {
			this.imageSrcWeek = null
			this.imageSrcWeekend = null

			domtoimage.toPng(this.$refs.week.$el)
				.then(dataUrl => {
					this.imageSrcWeek = dataUrl
				})
				.catch(function(error) {
					console.error('oops, something went wrong!', error)
				})

			domtoimage.toPng(this.$refs.weekend.$el)
				.then(dataUrl => {
					this.imageSrcWeekend = dataUrl
				})
				.catch(function(error) {
					console.error('oops, something went wrong!', error)
				})
		},
		getEvents() {
			this.events = []
			this.week = lodash.cloneDeep(this.defaultWeek)
			this.weekend = lodash.cloneDeep(this.defaultWeekend)

			calendar.getEvents(
				this.startOfWeek,
				this.startOfWeek.clone().add(1, 'week')
			).then(this.parseEvents)
		},
		parseEvents(events) {
			this.events = events

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

				this[part].sections[mapDay[day]].items.push({
					available: event.available,
					facilities: event.facilities,
					finish: event.finish,
					game: event.game,
					gm: event.gm,
					img: event.img ? 'images/logos/' + event.img : false,
					start: event.start,
					system: event.system,
					time: event.time,
				})

				if (this.openingTimes[day]) {
					const current = moment(this.openingTimes[day])
					const test = moment(event.time)

					if (test.isBefore(current)) {
						this.openingTimes[day] = event.time
					}
				} else {
					this.openingTimes[day] = event.time
				}
			})
		},
		thisWeek() {
			this.startOfWeek = moment().startOf('isoWeek')
			this.getEvents();
		},
		previousWeek() {
			this.startOfWeek = moment().startOf('isoWeek')
			this.startOfWeek.subtract(1, 'week')
			this.getEvents();
		},
		nextWeek() {
			this.startOfWeek = moment().startOf('isoWeek')
			this.startOfWeek.add(1, 'week')
			this.getEvents();
		},
		copyVolunteers() {
			copy(this.$refs.volunteers.innerText)
		},
		copyClub() {
			copy(this.$refs.club.innerText)
		},
	},
})
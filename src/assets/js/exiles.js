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
			date: 'April 3rd &ndash; April 6th',
			week: {
				/*sections: [
					{
						label: 'Monday',
						items: [],
					},
					{
						label: 'Tuesday',
						items: [
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '4pm',
								available: false,
							},
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '6pm',
								available: false,
							},
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '6pm',
								available: true,
							},
						],
					},
					{
						label: 'Wednesday',
						items: [
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '4pm',
								available: true,
							},
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '6pm',
								available: false,
							},
							{
								img: 'images/logo-d&d.png',
								game: 'Tales of an Orc-hestra',
								gm: 'John Smith',
								system: 'D&D 5e',
								time: '6pm',
								available: false,
							},
						],
					},
					{
						label: 'Thursday',
						items: [],
					},
				],*/
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
			calendar.getEvents().then(events => {
				console.log(events)
			})
		},
	},
})
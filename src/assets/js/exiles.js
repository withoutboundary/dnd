'use strict';

import Vue from 'vue';
import { Calendar } from 'lib/Calendar';
import domtoimage from 'dom-to-image';
import Schedule from 'components/exiles/Schedule';

const calendar = new Calendar(
	'64v9bnr8pq5cf32jmm076r1gr8%40group.calendar.google.com',
	'AIzaSyDDbUg1MbLU9xW4LziSj2lEJBt8cTBdbDY'
);
calendar.getEvents();

const ExilesApp = new Vue({
	el: '#exiles',
	components: {
		'c-exiles-schedule': Schedule,
	},
	data: function() {
		return {
			imageSrc: '',
			date: 'April 3rd &ndash; April 6th',
			weekly: {
				sections: [
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
				],
			},
		};
	},
	methods: {
		generate: function() {
			var self = this;

			self.imageSrc = '';

			domtoimage.toPng(this.$refs.weekly.$el)
				.then(function(dataUrl) {
					self.imageSrc = dataUrl;
				})
				.catch(function(error) {
					console.error('oops, something went wrong!', error);
				});
		},
	},
});
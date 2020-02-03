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
			date: 'Mon APR 3rd to Fri APR 7th',
			weekly: {
				sections: [
					{
						label: 'Wednesday',
						items: [
							{
								img: 'http://placehold.it/75x30',
								title: 'Title\nSecond line',
								time: '7pm',
								status: 'available',
							},
						],
					},
					{
						label: 'Tuesday',
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
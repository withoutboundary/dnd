<template>
	<div class="c-exiles-schedule">
		<header>
			<h1>Exiles Events</h1>
			<p>{{ date }}</p>
		</header>
		<section v-for="section in sections">
			<aside>{{ section.label }}</aside>

			<ul v-if="section.items.length">
				<li v-for="item in section.items">
					<div class="columns is-gapless">
						<div class="column is-narrow">
							<img :src="item.img">
						</div>
						<div class="column">
							<p class="game" v-html="multiline(item.title)"></p>
						</div>
						<div class="column is-narrow">
							<p class="time">{{ item.time }}</p>
						</div>
						<div class="column is-narrow">
							<i class="fa fa-star" :class="statusClass(item.status)"></i>
						</div>
					</div>
				</li>
			</ul>
			<p v-else class="nothing">Nothing scheduled</p>
		</section>
		<section class="legend">
			<aside>Legend</aside>

			<p><i class="fa fa-star available"></i>You are welcome to contact the Games Master or turn up on the day to discuss joining their game.</p>
			<p><i class="fa fa-star full"></i>These games might be full but please contact the Games Master listed to register your interest in joining their game.</p>
		</section>
	</div>
</template>

<script>

	export default {
		data: function() {
			return {};
		},
		props: {
			sections: Array,
			date: String,
		},
		methods: {
			multiline: function(str) {
				return str.split('\n').join('<br />');
			},
			statusClass: function(status) {
				const c = {};
				c[status] = true;
				return c;
			},
		},
	};

</script>
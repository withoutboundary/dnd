<template>
	<div class="c-exiles-schedule" :class="themeClass">
		<div class="pattern"></div>
		<div class="tentacle tentacle-1"></div>
		<div class="tentacle tentacle-2"></div>
		<div class="tentacle tentacle-3"></div>
		<header>
			<div class="pattern"></div>
			<div class="skull"></div>
			<h1>Exiles Gaming Club Events</h1>
			<p v-html="date"></p>
		</header>
		<section v-for="section in sections">
			<aside>{{ section.label }}</aside>

			<ul v-if="section.items.length">
				<li v-for="(item, i) in section.items">
					<p v-if="i === 0" class="opening-time has-text-centered">Club will be open from approx {{ item.time }}</p>
					<div class="details">
						<div class="image">
							<img v-if="item.img" :src="item.img">
						</div>
						<div class="description">
							<p class="game">
								<strong>{{ item.game }}</strong><br/>
								{{ item.system }} ({{ item.gm }})
							</p>
						</div>
						<div class="time" :class="{ 'has-facilities': facilities(item.facilities) }">
							<p class="time">{{ item.time }}<br/>{{ facilities(item.facilities) }}</p>
						</div>
						<div class="availability">
							<i v-if="item.available" class="fa fa-star available"></i>
						</div>
					</div>
				</li>
			</ul>
			<p v-else class="nothing">Nothing scheduled</p>
		</section>
		<!-- <section class="legend">
			<aside>Legend</aside>

			<p><i class="fa fa-star available"></i>You are welcome to contact the Games Master or turn up on the day to discuss joining their game.</p>
			<p><i class="fa fa-star full"></i>These games might be full but please contact the Games Master listed to register your interest in joining their game.</p>
		</section> -->
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
			theme: String,
		},
		computed: {
			themeClass() {
				return this.theme ? 'theme-' + this.theme : false
			},
		},
		methods: {
			facilities(facilities) {
				if (!facilities || facilities.toLowerCase() === 'n/a') {
					return ''
				}

				return facilities
			}
		},
	};

</script>
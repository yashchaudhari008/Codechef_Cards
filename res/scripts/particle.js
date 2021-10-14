/* ---- particles.js config ---- */

particlesJS('particles-js', {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: [ '#2EB67D', '#ECB22E', '#E01E5B', '#36C5F0' ]
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#fff'
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: 'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png',
				width: 100,
				height: 100
			}
		},
		
		opacity: {
			value: 1,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 5,
			random: true,
			anim: {
				enable: false,
				speed: 10,
				size_min: 10,
				sync: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: '#FFE90B',
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 10,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: {
				enable: true,
				mode: 'repulse'
			},
			onclick: {
				enable: true,
				mode: 'push'
			}
		},
		modes: {
			'repulse' : {
				distance: 200,
				duration: 0.1
			},
			'push' : {
				particles_nb: 4
			}
		}
	},
	retina_detect: true
});

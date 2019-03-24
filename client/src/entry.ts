import Vue from 'vue';
import store, { sessionModule } from './store';
import router from './router';
import App from './components/app.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';

import 'normalize.css';

async function entry() {
	// * font awesome
	library.add(
		faUser,
		faPalette,
		faSignInAlt,
		faUserPlus,
		faSignOutAlt
	);
	Vue.component('fa', FontAwesomeIcon);

	const app = new Vue({
		store: store,
		router: router(),
		components: { App },
		template: '<App/>'
	});

	console.log('loading session ...');
	try {
		await sessionModule.loadSession();
	}
	catch (err) {
		if (err.message == 'no_session') { }
	}

	console.log('mouting app ...');
	app.$mount('#app');
};

entry()
.catch(err => {
	console.error(err);
});

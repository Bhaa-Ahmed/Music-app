<template>
	<app-header />

	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component"></component>
		</transition>
	</router-view>

	<app-player />

	<app-auth />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppAuth from "./components/AppAuth.vue";
import AppPlayer from "./components/AppPlayer.vue";
import { mapWritableState } from "pinia";
import useUSerStore from "./stores/user";
import { auth } from "./includes/firebase";

export default {
	name: "App",
	components: { AppHeader, AppAuth, AppPlayer },
	computed: {
		...mapWritableState(useUSerStore, ["userLoggedIn"]),
	},
	created() {
		if (auth.currentUser) this.userLoggedIn = true;
	},
};
</script>

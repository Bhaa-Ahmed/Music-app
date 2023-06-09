<template>
	<!-- Registration Form -->
	<div
		class="text-white text-center font-bold p-4 rounded mb-4"
		v-if="regShowAlert"
		:class="regAlertVariant"
	>
		{{ regAlertMsg }}
	</div>
	<vee-form
		:validation-schema="schema"
		:initial-values="userData"
		@submit="register"
	>
		<!-- Name -->
		<div class="mb-3">
			<label class="inline-block mb-2">Name</label>
			<vee-field
				name="name"
				type="text"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Name"
			/>
			<ErrorMessage class="text-red-600" name="name" />
		</div>
		<!-- Email -->
		<div class="mb-3">
			<label class="inline-block mb-2">Email</label>
			<vee-field
				name="email"
				type="email"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Email"
			/>
			<ErrorMessage class="text-red-600" name="email" />
		</div>
		<!-- Age -->
		<div class="mb-3">
			<label class="inline-block mb-2">Age</label>
			<vee-field
				name="age"
				type="number"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
			/>
			<ErrorMessage class="text-red-600" name="age" />
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Password</label>
			<vee-field name="password" :bails="false" v-slot="{ field, errors }">
				<input
					type="password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Password"
					v-bind="field"
				/>
				<p class="text-red-600" v-for="error in errors" :key="error">
					{{ error }}
				</p>
			</vee-field>
		</div>
		<!-- Confirm Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Confirm Password</label>
			<vee-field
				name="confirm_password"
				type="password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Confirm Password"
			/>
			<ErrorMessage class="text-red-600" name="confirm_password" />
		</div>
		<!-- Country -->
		<div class="mb-3">
			<label class="inline-block mb-2">Country</label>
			<vee-field
				as="select"
				name="country"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
			>
				<option value="Egypt">Egypt</option>
				<option value="USA">USA</option>
				<option value="Germany">Germany</option>
				<option value="Valhalla">Valhalla</option>
			</vee-field>
			<ErrorMessage class="text-red-600" name="country" />
		</div>
		<!-- TOS -->
		<div class="mb-3 pl-6">
			<vee-field
				name="tos"
				value="1"
				type="checkbox"
				class="w-4 h-4 float-left -ml-6 mt-1 rounded"
			/>
			<label class="block">Accept terms of service</label>
			<ErrorMessage class="text-red-600" name="tos" />
		</div>
		<button
			type="submit"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
			:disabled="regInSubmission"
		>
			Submit
		</button>
	</vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";

export default {
	name: "app-register-form",
	data() {
		return {
			schema: {
				name: "required|min:3|max:100|alpha_spaces",
				email: "required|min:3|max:100|email",
				age: "required|min_value:18|max_value:100",
				password: "required|min:9|max:100|excluded:password",
				confirm_password: "passwords_mismatch:@password",
				country: "required|country_excluded:Valhalla",
				tos: "tos",
			},
			userData: {
				country: "Egypt",
			},
			regInSubmission: false,
			regShowAlert: false,
			regAlertVariant: "bg-blue-500",
			regAlertMsg: "Please wait! Your account is being created.",
		};
	},
	methods: {
		...mapActions(useUserStore, { createUser: "register" }),

		async register(values) {
			this.regShowAlert = true;
			this.regInSubmission = true;
			this.regAlertVariant = "bg-blue-500";
			this.regAlertMsg = "Please wait! Your account is being created.";

			try {
				await this.createUser(values);
			} catch (error) {
				this.regInSubmission = false;
				this.regAlertVariant = "bg-red-500";
				this.regAlertMsg =
					"An unexpected error occurred. Please try again later.";
				return;
			}

			this.regAlertVariant = "bg-green-500";
			this.regAlertMsg = "Success! Your account has been created.";
			window.location.reload();
		},
	},
};
</script>

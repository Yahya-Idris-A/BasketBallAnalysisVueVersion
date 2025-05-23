<template>
  <div class="mx-[5%] md:mx-[30%] my-[16px] md:my-[32px]">
    <AuthenticationCard authType="Sign Up">
      <template #form>
        <form class="flex flex-col justify-center w-full">
          <!-- Username -->
          <v-text-field
            class="mb-[22px]"
            v-model="userData.name"
            label="Username"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          ></v-text-field>
          <!-- Email -->
          <v-text-field
            class="mb-[22px]"
            v-model="userData.email"
            label="Email"
            type="email"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          ></v-text-field>
          <!-- Password -->
          <v-text-field
            class="mb-[22px]"
            v-model="userData.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          >
            <template v-slot:append-inner>
              <v-icon @click="togglePassword" class="cursor-pointer">
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>
          <!-- Confirm Password -->
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            :type="showConfirmPassword ? 'text' : 'password'"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          >
            <template v-slot:append-inner>
              <v-icon @click="toggleConfirmPassword" class="cursor-pointer">
                {{ showConfirmPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>
          <v-checkbox
            class="text-black custom-checkbox"
            :ripple="false"
            density="compact"
            hide-details="auto"
          >
            <template v-slot:label>
              <span class="text-[14px] font-semibold text-[#667085]"
                >Remember me</span
              >
            </template>
          </v-checkbox>
        </form>
        <button
          class="bg-[#FD6A2A] px-[40%] py-[12px] rounded-[8px] text-white text-[16px] font-semibold cursor-pointer"
          @click="submit"
        >
          <span v-if="!isLoading">Sign Up</span>
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="#FD6A2A"
            size="22"
            class="px-[27px]"
          ></v-progress-circular>
        </button>
        <p
          class="text-[#4B465C] text-[15px] text-center leading-[20px] my-[32px]"
        >
          By clicking the Sign Up button you agree to our Term and Condition and
          Privacy Policy
        </p>
      </template>
      <template #autChoice>
        <div class="flex flex-col w-full items-center mt-[32px]">
          <span class="text-black text-[15px] font-normal text-center"
            >Already have an account?
            <router-link class="text-[#403D91] hover:underline" to="/sign-in"
              >Sign In</router-link
            ></span
          >
        </div>
      </template>
    </AuthenticationCard>
  </div>
</template>
<script setup>
import AuthenticationCard from "../../components/cards/AuthenticationCard.vue";
import * as authService from "@/services/authService";
import * as utils from "@/plugins/utils";

import { ref } from "vue";

const isLoading = ref(false);
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const userData = ref({
  name: "",
  email: "",
  password: "",
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const submit = async () => {
  if (validate()) {
    isLoading.value = true;
    try {
      const response = await authService.signup(userData.value);
      console.log(response);
      if (response.statusCode == 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        utils.callToaster("success", "Sign Up Berhasil");

        window.location.href = "/profile/dashboard";
      } else {
        utils.callToaster("error", error.response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      utils.callToaster("error", error.response.data.message);
    } finally {
      isLoading.value = false;
    }
  }
};

const validate = () => {
  if (userData.value.name == "") {
    utils.callToaster("error", "Nama Tidak Boleh Kosong");
    return false;
  }
  if (userData.value.email == "") {
    utils.callToaster("error", "Email Tidak Boleh Kosong");
    return false;
  }
  if (userData.value.password == "") {
    utils.callToaster("error", "Password Tidak Boleh Kosong");
    return false;
  }
  if (confirmPassword.value != userData.value.password) {
    utils.callToaster("error", "Password Tidak Sesuai");
    return false;
  }
  return true;
};
</script>
<style scoped>
.custom-checkbox {
  color: #667085 !important;
}
</style>

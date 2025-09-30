<template>
  <div class="app">
    <h1>Dynamic Pricing Plans</h1>

    <div class="buttons">
      <button @click="loadPricing('blue')">Force Blue</button>
      <button @click="loadPricing('green')">Force Green</button>
      <button @click="randomVersion">Random Route</button>
      <button @click="clearVersion">Clear Cookie</button>
    </div>

    <div v-if="loading">Loading pricing...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="pricing" class="pricing">
      <h2>Served Version: {{ pricing.version }}</h2>
      <div class="plans">
        <div v-for="plan in pricing.plans" :key="plan.name" class="plan">
          <h3>{{ plan.name }} - ${{ plan.price }}</h3>
          <ul>
            <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchPricingData, clearVersionCookie } from "../api";

const pricing = ref(null);
const loading = ref(false);
const error = ref(null);

const loadPricing = async (forceVersion = null) => {
  loading.value = true;
  error.value = null;
  pricing.value = null;

  const result = await fetchPricingData(forceVersion);
  if (result.success) {
    pricing.value = result.data;
  } else {
    error.value = result.error;
  }
  loading.value = false;
};

const randomVersion = () => {
  const versions = ["blue", "green"];
  const choice = versions[Math.floor(Math.random() * versions.length)];
  loadPricing(choice);
};

const clearVersion = () => {
  clearVersionCookie();
  pricing.value = null;
};

onMounted(() => {
  loadPricing();
});
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.buttons {
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
.pricing {
  margin-top: 20px;
}
.plans {
  display: flex;
  gap: 20px;
}
.plan {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  width: 200px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>

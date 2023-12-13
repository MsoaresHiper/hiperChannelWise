<template>
  <div>
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h1>HiperHUB</h1>
      <select v-model="selectedOperator" @change="updateData">
        <option value="vivo">Vivo</option>
        <option value="claro">Claro</option>
      </select>
    </header>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>CPF</th>
          <th>WhatsApp</th>
          <th>SMS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.cpf }}</td>
          <td>{{ user.channels.whatsapp }}</td>
          <td>{{ user.channels.sms }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Client, Company } from '../types';

export default defineComponent({
  name: 'CommunicationChannelAnalysis',
  setup() {
    const users = ref<Client[]>([]);
    const selectedOperator = ref<string>('vivo');

    async function fetchUsers() {
      try {
        const response = await fetch(process.env.VUE_APP_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const selectedData = data.find((item: Company) =>
          item.company.toLowerCase() === selectedOperator.value.toLowerCase()
        );
        users.value = selectedData ? selectedData.customers : [];
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }


    function updateData(): void {
      fetchUsers();
    }

    onMounted(fetchUsers);

    return {
      users,
      selectedOperator,
      updateData
    };
  }
});
</script>

<style scoped>
header {
  background-color: #f5f5f5;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>

<template>
  <div>
    <div class="header-container">
      <img src="https://via.placeholder.com/1500x500" alt="Header Image" class="header-image">
      <div class="search-container">
        <input type="text" v-model="searchQuery" @keyup.enter="updateData" placeholder="Search..." class="search-input">
        <select v-model="selectedOperator" @change="updateData" class="operator-select">
          <option value="vivo">Vivo</option>
          <option value="claro">Claro</option>
        </select>
      </div>
    </div>
    <table v-if="searchQuery">
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
import { defineComponent, ref, onMounted, watch } from 'vue';
import { Client, Company } from '../types';

export default defineComponent({
  name: 'CommunicationChannelAnalysis',
  setup() {
    const users = ref<Client[]>([]);
    const selectedOperator = ref<string>('vivo');
    const searchQuery = ref('');

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
        if (searchQuery.value) {
          users.value = users.value.filter(user =>
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }


    function updateData(): void {
      fetchUsers();
    }

    onMounted(fetchUsers);

    watch(searchQuery, () => {
      fetchUsers();
    });

    return {
      users,
      selectedOperator,
      searchQuery,
      updateData
    };
  }
});
</script>

<style scoped>
.header-container {
  position: relative;
  margin-bottom: 20px;
}

.header-image {
  width: 100%;
  height: auto;
  transition: height 0.3s;
}

.search-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
}

.search-input {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 15px;
  margin-right: 10px;
  flex-grow: 1;
}

.operator-select {
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>


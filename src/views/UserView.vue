<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import type { UserModel } from '@/types/user.model';

const user = ref<UserModel | null>(null);
const isLoading = ref(true);


const isEditing = ref<{
  username: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
}>({
  username: false,
  email: false,
  phone: false,
  password: false,
});

const editedUser = ref<Omit<UserModel, 'userId' | 'access' | 'refresh'>>({
  username: '',
  email: '',
  phone: '',
  password: ''
});

async function loadUser() {
  try {
    const auth = AuthService.getAuth();
    const userId = auth.userId;
    if (userId !== undefined) {
      const fetchedUser = await UserService.getUserById(userId);
      user.value = fetchedUser;
      editedUser.value = {
        username: fetchedUser.username,
        email: fetchedUser.email,
        phone: fetchedUser.phone,
        password: ''
      };
    } else {
      console.error('User ID is undefined');
    }
  } catch (error) {
    console.error('Failed to load user:', error);
  } finally {
    isLoading.value = false;
  }
}

// Funkcija za prebacivanje između rezima uređivanja
function toggleEdit(field: keyof Omit<UserModel, 'userId' | 'access' | 'refresh'>) {
  if (field in isEditing.value) {
    isEditing.value[field] = !isEditing.value[field];
  }
}


async function saveChanges() {
    try {
        if (user.value) {
            const updatePayload = {
                username: editedUser.value.username,
                email: editedUser.value.email,
                phone: editedUser.value.phone,
                password: ''
            };
            
          const res = await UserService.updateUser(user.value.userId, updatePayload);
          user.value = res;
            //console.log('PROVERA', res);
            //loadUser();
        }
    } catch (error) {
        console.error('Failed to update user:', error);
    } finally {
        Object.keys(isEditing.value).forEach((key) => {
            if (key in isEditing.value) {
                isEditing.value[key as keyof typeof isEditing.value] = false;
            }
        });
    }
}

onMounted(() => {
  loadUser();
});
</script>

<template>
  <div class="container mt-5">
    <div v-if="isLoading" class="text-center text-light">Loading your data...</div>
    <div v-else-if="user">
      <h1 class="h3 text-center text-light mb-4">User Information</h1>
      <table class="table table-dark table-hover rounded">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{ user.userId }}</th>

            <!-- Username -->
            <td>
              <div class="d-flex justify-content-start align-items-center">
                <input
                  v-if="isEditing.username"
                  v-model="editedUser.username"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Enter username"
                />
                <span v-else>{{ user.username }}</span>
                <button 
                  class="btn btn-sm btn-outline-primary ms-2"
                  v-if="!isEditing.username"
                  @click="toggleEdit('username')"
                >
                  Edit
                </button>
              </div>
            </td>

            <!-- Password -->
            <td>
              <div class="d-flex justify-content-start align-items-center">
                <input
                  v-if="isEditing.password"
                  v-model="editedUser.password"
                  type="password"
                  class="form-control form-control-sm"
                  placeholder="Enter password"
                />
                <span v-else>••••••••••</span>
                <button 
                  class="btn btn-sm btn-outline-primary ms-2"
                  v-if="!isEditing.password"
                  @click="toggleEdit('password')"
                >
                  Edit
                </button>
              </div>
            </td>

            <!-- Email -->
            <td>
              <div class="d-flex justify-content-start align-items-center">
                <input
                  v-if="isEditing.email"
                  v-model="editedUser.email"
                  type="email"
                  class="form-control form-control-sm"
                  placeholder="Enter email"
                />
                <span v-else>{{ user.email }}</span>
                <button 
                  class="btn btn-sm btn-outline-primary ms-2"
                  v-if="!isEditing.email"
                  @click="toggleEdit('email')"
                >
                  Edit
                </button>
              </div>
            </td>

            <!-- Phone -->
            <td>
              <div class="d-flex justify-content-start align-items-center">
                <input
                  v-if="isEditing.phone"
                  v-model="editedUser.phone"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Enter phone"
                />
                <span v-else>{{ user.phone }}</span>
                <button 
                  class="btn btn-sm btn-outline-primary ms-2"
                  v-if="!isEditing.phone"
                  @click="toggleEdit('phone')"
                >
                  Edit
                </button>
              </div>
            </td>

            <!-- Save Changes -->
            <td class="text-center">
              <button
                v-if="isEditing.username || isEditing.password || isEditing.email || isEditing.phone"
                @click="saveChanges"
                class="btn btn-success btn-sm"
              >
                Save All
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-light">No user data available.</div>
  </div>
</template>

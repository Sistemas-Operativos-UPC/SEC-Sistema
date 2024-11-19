import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAuthStore = defineStore( 'auth', ()=>{
    const token = ref('');

    const isAuthenticated = computed(() =>
        token.value !== '' &&
        user.value.id !== '' &&
        user.value.role !== '' &&
        user.value.name !== ''
    );

    const user = ref({
        id: '',
        role: '',
        name: '',
    });

    function setAuth(newToken){
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    function setUserId(newUserId){
        user.value.id = newUserId;
        localStorage.setItem('userId', newUserId);
    }

    function setRole(newRole){
        user.value.role = newRole;
        localStorage.setItem('role', newRole);
    }

    function setName(newName){
        user.value.name = newName;
        localStorage.setItem('name', newName);
    }
    

    function refresh(){
        token.value = localStorage.getItem('token') || '';
        user.value.id = localStorage.getItem('userId') || '';
        user.value.role = localStorage.getItem('role')|| '';
        user.value.name = localStorage.getItem('name')|| '';
    }

    function logout(){
        token.value = '';
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
    }

    return {
        token,
        isAuthenticated,
        user,
        setUserId,
        setRole,
        setAuth,
        setName,
        refresh,
        logout,
    };
});
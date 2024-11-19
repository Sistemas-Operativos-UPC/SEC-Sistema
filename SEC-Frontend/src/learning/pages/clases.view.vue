<script setup>
import {useAuthStore} from "../../iam/services/auth-store.js";
import router from "../../router/index.js";
import {EducationalInstitutionsService} from "../services/educational-institucions.service.js";
import {onMounted, ref} from "vue";
import {useToast} from "primevue/usetoast";

const educationalInstitutionsService = new EducationalInstitutionsService();
const authStore = useAuthStore();
const toast = useToast();

const user = authStore?.user;
const visibleDialogPrincipal = ref(false);
const visibleDialogTeacher = ref(false);
const institutions = ref([]);

function getInstitutions() {
  educationalInstitutionsService.getAll()
      .then(response => {
        institutions.value = response.data;
      })
      .catch(() => {
        console.log('Error al obtener las instituciones');
      });
}

onMounted(() => {
  getInstitutions();
});


/**
 * Fields for creating institution
 */
const institutionName = ref('');
const institutionAddress = ref('');

function createInstitucional() {
  if (!isValidateInstitution()) return;

  educationalInstitutionsService.create({
    name: institutionName.value,
    address: institutionAddress.value
  })
      .then(() => {
        toast.add({severity: 'success', summary: 'Success', detail: "Institución creada correctamente", life: 3000});
      })
      .catch(() => {
        toast.add({severity: 'error', summary: 'Error', detail: "Error al crear la institución", life: 3000});
      })
      .finally(() => {
        getInstitutions();
        institutionName.value = '';
        institutionAddress.value = '';
        visibleDialogPrincipal.value = false;
      });
}

function isValidateInstitution() {
  return institutionName.value.length > 0 && institutionAddress.value.length > 0;
}


/**
 * Fields for creating class
 */

const className = ref('');
const selectedInstitution = ref(null);

function createClass(){
  if (!isValidateClass()) return;
  educationalInstitutionsService.createClass(
      selectedInstitution.value,
      {
    teacher_id: user.id,
    name: className.value
      }
  )
      .then(() => {
        toast.add({severity: 'success', summary: 'Success', detail: "Clase creada correctamente", life: 3000});
      })
      .catch(() => {
        toast.add({severity: 'error', summary: 'Error', detail: "Error al crear la clase", life: 3000});
      })
      .finally(() => {
        getInstitutions();
        className.value = '';
        visibleDialogTeacher.value = false;
      });
}

function isValidateClass() {
  return className.value.length > 0 && selectedInstitution.value !== null;
}


/**
 * Sign out
 */
function signOut(){
  authStore.logout();
  router.push({name: 'login'});
}

function goHome(){
  router.push({name: 'clases'});
}

function goToClass(classItemId, institutionId){
  router.push({name: 'class', params: { id: classItemId } , query:{ institutionId: institutionId }});
}

</script>

<template>
  <div class="login-container background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <pv-toolbar class="custom-toolbar">
      <template #start>
        <span style="cursor: pointer" class="toolbar-title" @click="goHome">Bienvenido {{user?.name}}</span>
      </template>

      <template #end>
        <pv-button v-if="user?.role === 'principal'" label="Crear Institución Educativa" class="toolbar-btn create-class-btn" @click="visibleDialogPrincipal = true"></pv-button>
        <pv-button v-if="user?.role === 'teacher'" label="Crear Clase" class="toolbar-btn create-class-btn" @click="visibleDialogTeacher = true"></pv-button>
        <pv-button label="Sign Out" class="toolbar-btn sign-out-btn" @click="signOut"></pv-button>
      </template>
    </pv-toolbar>

    <pv-dialog
        v-model:visible="visibleDialogPrincipal"
        modal
        header="Crear Institución Educativa"
        :style="{ width: '30rem', borderRadius: '8px', padding: '1.5rem' }"
        class="custom-dialog"
    >
      <span class="dialog-description">Ingresa información.</span>

      <div class="input-group">
        <label for="username" class="input-label">Nombre</label>
        <pv-inputtext id="username" v-model="institutionName" class="input-field" autocomplete="off" />
      </div>

      <div class="input-group">
        <label for="email" class="input-label">Dirección</label>
        <pv-inputtext id="email" v-model="institutionAddress" class="input-field" autocomplete="off" />
      </div>

      <div class="dialog-actions">
        <pv-button
            type="button"
            label="Cancelar"
            severity="secondary"
            @click="visibleDialogPrincipal = false"
            class="cancel-btn"
        ></pv-button>
        <pv-button
            type="button"
            label="Guardar"
            @click="createInstitucional"
            class="save-btn"
        ></pv-button>
      </div>
    </pv-dialog>

    <pv-dialog
        v-model:visible="visibleDialogTeacher"
        modal
        header="Crear Clase"
        :style="{ width: '30rem', borderRadius: '8px', padding: '1.5rem' }"
        class="custom-dialog"
    >
      <span class="dialog-description">Ingresa información.</span>

      <div class="input-group">
        <label for="username" class="input-label">Nombre</label>
        <pv-inputtext id="username" v-model="className" class="input-field" autocomplete="off" />
      </div>

      <div class="input-group">
        <label for="institution" class="input-label">Institución</label>
        <pv-select id="institution" v-model="selectedInstitution" class="input-field" :options="institutions" optionLabel="name" optionValue="id" />
      </div>

      <div class="dialog-actions">
        <pv-button
            type="button"
            label="Cancelar"
            severity="secondary"
            @click="visibleDialogTeacher = false"
            class="cancel-btn"
        ></pv-button>
        <pv-button
            type="button"
            label="Guardar"
            @click="createClass"
            class="save-btn"
        ></pv-button>
      </div>
    </pv-dialog>

    <div class="institutions-container">
      <div
          v-for="institution in institutions"
          :key="institution.id"
          class="institution-card"
      >
        <h2 class="institution-name">{{ institution.name }}</h2>
        <p class="institution-address">{{ institution.address }}</p>

        <div v-if="institution.classes.length > 0" class="classes-container">
          <div
              v-for="classItem in institution.classes"
              :key="classItem.id"
              class="class-card"
          >
            <span class="class-name">{{ classItem.name }}</span>
            <button
                class="go-to-class-btn"
                @click="goToClass(classItem.id, institution.id)"
            >Ir a la clase</button>
          </div>
        </div>
        <p v-else class="no-classes-text">No hay clases disponibles.</p>
      </div>
    </div>


  </div>
</template>

<style scoped>
.custom-toolbar {
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.toolbar-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: #ffffff;
  transition: color 0.3s ease;
}

.toolbar-btn {
  background-color: #3498db; /* Azul medio */
  border: none;
  color: #fff;
  font-weight: bold;
  margin-left: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  transition: background-color 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  font-size: 1.4rem;
}

.toolbar-btn:hover {
  background-color: #2e86c1; /* Azul más oscuro al pasar el ratón */
  transform: translateY(-3px); /* Efecto de elevación */
  box-shadow: 0 6px 18px rgba(46, 134, 193, 0.4);
}

.toolbar-btn:active {
  background-color: #1f618d; /* Azul aún más oscuro al hacer clic */
  transform: translateY(1px); /* Efecto de compresión */
  box-shadow: 0 2px 8px rgba(31, 97, 141, 0.4);
}


/**
  * Dialog for creating
*/
.custom-dialog {
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: scale(0.95);
  opacity: 0;
}

.custom-dialog .p-dialog-enter-active,
.custom-dialog .p-dialog-leave-active {
  transform: scale(1);
  opacity: 1;
}

.dialog-description {
  color: #607d8b;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: block;
  transition: color 0.3s ease;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-label {
  font-weight: 600;
  width: 6rem;
  color: #37474f;
  transition: color 0.3s ease;
}

.input-field {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #cfd8dc;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #0288d1;
  box-shadow: 0 0 8px rgba(2, 136, 209, 0.2);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #757575;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
  color: #616161;
}

.save-btn {
  background-color: #0288d1;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.save-btn:hover {
  background-color: #0277bd;
  transform: translateY(-2px);
}

.save-btn:active {
  transform: translateY(1px);
}


/**
  * Institutions and classes
*/
.institutions-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0);
}

.institution-card {
  padding: 1.5rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2); /* Fondo muy transparente */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.institution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.3), 0 0 20px rgba(151, 196, 215, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
}

.institution-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
}

.institution-address {
  color: #000000;
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

.classes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.class-card {
  width: auto;
  max-width: 30rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15); /* Fondo translúcido */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  min-width: 14rem;
}

.class-card:hover {
  background-color: rgba(255, 255, 255, 0.3); /* Fondo más claro al pasar el ratón */
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3), 0 0 10px rgba(0, 123, 255, 0.5);
}

.class-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.go-to-class-btn {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.go-to-class-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 86, 179, 0.5);
}

.no-classes-text {
  color: #ffffff;
  font-size: 1.2rem;
  font-style: italic;
  margin-top: 1.5rem;
}






@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #71b7e6, #00185b);
  overflow: hidden;
}

.background > span {
  width: 20vmin;
  height: 20vmin;
  z-index: -1;
  border-radius: 20vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: move;
  animation-duration: 45s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.background > span:nth-child(0) {
  color: #00ffe1;
  top: 58%;
  left: 53%;
  animation-duration: 23s;
  animation-delay: -3s;
  transform-origin: -7vw 15vh;
  box-shadow: 40vmin 0 5.176595533161283vmin currentColor;
}
.background > span:nth-child(1) {
  color: #5a81e4;
  top: 53%;
  left: 39%;
  animation-duration: 44s;
  animation-delay: -22s;
  transform-origin: 5vw 10vh;
  box-shadow: -40vmin 0 5.534879177075572vmin currentColor;
}
.background > span:nth-child(2) {
  color: #3c5687;
  top: 8%;
  left: 28%;
  animation-duration: 9s;
  animation-delay: -43s;
  transform-origin: -2vw 9vh;
  box-shadow: 40vmin 0 5.3338857346990185vmin currentColor;
}
.background > span:nth-child(3) {
  color: #5ae4e4;
  top: 91%;
  left: 71%;
  animation-duration: 26s;
  animation-delay: -35s;
  transform-origin: -20vw -7vh;
  box-shadow: 40vmin 0 5.144052913178565vmin currentColor;
}
.background > span:nth-child(4) {
  color: #5a91e4;
  top: 22%;
  left: 16%;
  animation-duration: 30s;
  animation-delay: -6s;
  transform-origin: 13vw -5vh;
  box-shadow: -40vmin 0 5.0179488232776vmin currentColor;
}
.background > span:nth-child(5) {
  color: #3c5187;
  top: 32%;
  left: 56%;
  animation-duration: 39s;
  animation-delay: -30s;
  transform-origin: -13vw -10vh;
  box-shadow: 40vmin 0 5.74162874244422vmin currentColor;
}
.background > span:nth-child(6) {
  color: #3c5f87;
  top: 15%;
  left: 43%;
  animation-duration: 14s;
  animation-delay: -34s;
  transform-origin: 2vw 4vh;
  box-shadow: -40vmin 0 5.23603017387423vmin currentColor;
}
.background > span:nth-child(7) {
  color: #acf5ff;
  top: 83%;
  left: 46%;
  animation-duration: 41s;
  animation-delay: -16s;
  transform-origin: -6vw 4vh;
  box-shadow: 40vmin 0 5.968657162274097vmin currentColor;
}
.background > span:nth-child(8) {
  color: #3c7387;
  top: 17%;
  left: 65%;
  animation-duration: 54s;
  animation-delay: -48s;
  transform-origin: -9vw 7vh;
  box-shadow: -40vmin 0 5.135904289019175vmin currentColor;
}
.background > span:nth-child(9) {
  color: #acdcff;
  top: 52%;
  left: 64%;
  animation-duration: 34s;
  animation-delay: -14s;
  transform-origin: 7vw 7vh;
  box-shadow: -40vmin 0 5.692954844076822vmin currentColor;
}
.background > span:nth-child(10) {
  color: #3c4b87;
  top: 12%;
  left: 42%;
  animation-duration: 6s;
  animation-delay: -36s;
  transform-origin: 8vw 9vh;
  box-shadow: -40vmin 0 5.950233220710903vmin currentColor;
}
.background > span:nth-child(11) {
  color: #3c4b87;
  top: 5%;
  left: 51%;
  animation-duration: 49s;
  animation-delay: -16s;
  transform-origin: -13vw -23vh;
  box-shadow: 40vmin 0 5.242227084588272vmin currentColor;
}
.background > span:nth-child(12) {
  color: #3c4e87;
  top: 55%;
  left: 62%;
  animation-duration: 46s;
  animation-delay: -44s;
  transform-origin: -23vw -2vh;
  box-shadow: 40vmin 0 5.892195299247033vmin currentColor;
}
.background > span:nth-child(13) {
  color: #5a76e4;
  top: 31%;
  left: 51%;
  animation-duration: 37s;
  animation-delay: -20s;
  transform-origin: -23vw -23vh;
  box-shadow: 40vmin 0 5.637218709000092vmin currentColor;
}
.background > span:nth-child(14) {
  color: #acbdff;
  top: 77%;
  left: 91%;
  animation-duration: 31s;
  animation-delay: -2s;
  transform-origin: -10vw 19vh;
  box-shadow: -40vmin 0 5.015925952755738vmin currentColor;
}
.background > span:nth-child(15) {
  color: #5a71e4;
  top: 18%;
  left: 72%;
  animation-duration: 23s;
  animation-delay: -36s;
  transform-origin: -18vw 13vh;
  box-shadow: -40vmin 0 5.279589277116813vmin currentColor;
}
.background > span:nth-child(16) {
  color: #5a8ae4;
  top: 98%;
  left: 99%;
  animation-duration: 6s;
  animation-delay: -9s;
  transform-origin: 18vw 16vh;
  box-shadow: 40vmin 0 5.666999065774667vmin currentColor;
}
.background > span:nth-child(17) {
  color: #5a81e4;
  top: 95%;
  left: 73%;
  animation-duration: 23s;
  animation-delay: -47s;
  transform-origin: -15vw 13vh;
  box-shadow: 40vmin 0 5.069137396264436vmin currentColor;
}
.background > span:nth-child(18) {
  color: #5a9ae4;
  top: 87%;
  left: 94%;
  animation-duration: 15s;
  animation-delay: -33s;
  transform-origin: -4vw 18vh;
  box-shadow: 40vmin 0 5.52669289232621vmin currentColor;
}
.background > span:nth-child(19) {
  color: #3c5187;
  top: 97%;
  left: 64%;
  animation-duration: 40s;
  animation-delay: -46s;
  transform-origin: -8vw -13vh;
  box-shadow: -40vmin 0 5.283217922715748vmin currentColor;
}
</style>
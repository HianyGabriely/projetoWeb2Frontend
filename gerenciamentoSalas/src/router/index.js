import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex'; // Importa o Vuex para verificar o login
import MainLayout from "../layouts/MainLayout.vue";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import RegisterAluno from '../views/RegisterAluno.vue';
import RegisterCoordenador from '../views/RegisterCoordenador.vue';
import RegisterProfessor from '../views/RegisterProfessor.vue';
import ImportantDates from '../views/ImportantDates.vue';
import Faq from '../views/Faq.vue';
import Contato from '../views/Contato.vue';
import SobreEquipe from '../views/SobreEquipe.vue';
import SaibaMais from '../views/SaibaMais.vue';
import Dashboard from '../views/Dashboard.vue';
import AddRecurso from '../views/AddRecurso.vue';
import EditRecurso from '../views/EditRecurso.vue';
import ResouceManagement from '../views/ResouceManagement.vue';
import ApproveReserva from '../views/ApproveReserva.vue';
import ApproveUser from '../views/ApproveUser.vue';
import UsuariosList from '../views/UsuariosList.vue';
import VerificarEmail from '../views/VerificarEmail.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'Home', component: Home, },
            { path: '/login', name: 'Login', component: Login },
            { path: '/esqueceu-senha', name: 'EsqueceuSenha', component: ForgotPassword },
            { path: '/redefinir-senha', name: 'ResetPassword ', component: ResetPassword },
            { path: '/register-aluno', name: 'RegisterAluno', component: RegisterAluno },
            { path: '/register-coordenador', name: 'RegisterCoordenador', component: RegisterCoordenador },
            { path: '/register-professor', name: 'RegisterProfessor', component: RegisterProfessor },
            { path: '/important-dates', name: 'ImportantDates', component: ImportantDates, meta: { requiresAuth: true }, },
            { path: '/contato', name: 'Contato', component: Contato },
            { path: '/perguntas-frequentes', name: 'Faq', component: Faq },
            { path: '/sobre-equipe', name: 'SobreEquipe', component: SobreEquipe },
            { path: '/saiba-mais', name: 'SaibaMais', component: SaibaMais },
            { path: '/approveReserva/:id', name: 'ApproveReserva', component: ApproveReserva },
            { path: '/approve/:id', name: 'ApproveUser', component: ApproveUser },
            { path: '/verificar-email', name: 'VerificarEmail', component: VerificarEmail },
            { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true }, },
            { path: '/add-recurso', name: 'AddRecurso', component: AddRecurso, meta: { requiresAuth: true }, },
            { path: '/recursos', name: 'Recursos', component: ResouceManagement, meta: { requiresAuth: true }, },
            { path: '/usuarios', name: 'Usuarios', component: UsuariosList, meta: { requiresAuth: true }, },
        ]
    },
    { path: '/editar-recurso/:tipo/:id', name: 'EditRecurso', component: EditRecurso, meta: { requiresAuth: true }, },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Guard de Navegação Global
router.beforeEach((to, from, next) => {
    const store = useStore(); // Acessa a store do Vuex para verificar o login

    // Verifica se a rota requer autenticação
    if (to.meta.requiresAuth && !store.state.user.name) {
        // Redireciona para o login se o usuário não estiver logado
        next({ name: 'Login' });
    } else {
        next(); // Permite a navegação
    }
});

export default router;

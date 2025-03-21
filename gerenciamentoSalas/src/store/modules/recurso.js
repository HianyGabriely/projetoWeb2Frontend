const state = {
    tipoRecursoOpts: {
        SALA: "Sala",
        LABORATORIO: "Laboratório",
    },
    selectedTipoRecurso: '', // Tipo de recurso selecionado
    selectedResource: null, // Recurso selecionado
    recursos: [], // Lista de recursos
};

const getters = {
    getTipoRecursoOpts: (state) => state.tipoRecursoOpts,
    getSelectedTipoRecurso: (state) => state.selectedTipoRecurso,
    getRecursos: (state) => state.recursos, // Getter para acessar a lista de recursos
    getSelectedResource: (state) => state.selectedResource,
};

const mutations = {
    setSelectedTipoRecurso(state, tipoRecurso) {
        state.selectedTipoRecurso = tipoRecurso;
    },
    setRecursos(state, recursos) {
        state.recursos = recursos;
    },
    addRecurso(state, recurso) {
        // Garantir que o status seja "DISPONIVEL" por padrão
        recurso.status = recurso.status || "DISPONIVEL";
        state.recursos.push(recurso);
    },
    updateRecurso(state, recursoAtualizado) {
        const index = state.recursos.findIndex(recurso => recurso.id === recursoAtualizado.id);
        if (index !== -1) {
            state.recursos[index] = recursoAtualizado;
        }
    },
    deleteRecurso(state, id) {
        state.recursos = state.recursos.filter(recurso => recurso.id !== id);
    },
    setSelectedResource(state, recurso) {
        state.selectedResource = recurso;
    },
};

const actions = {
    setTipoRecurso({ commit }, tipoRecurso) {
        commit('setSelectedTipoRecurso', tipoRecurso);
    },
    async fetchRecursos({ commit }) {
        try {
            const response = await fetch('http://localhost:8080/api/recursos');
            if (!response.ok) {
                throw new Error('Erro ao buscar recursos');
            }
            const recursos = await response.json();
            commit('setRecursos', recursos);
        } catch (error) {
            console.error('Erro ao buscar recursos:', error);
        }
    },
    async deleteRecurso({ commit }, id) {
        try {
            const response = await fetch(`http://localhost:8080/api/recursos/${id}`, { method: 'DELETE' });
            if (response.ok) {
                commit('deleteRecurso', id);
            } else {
                throw new Error('Erro ao excluir recurso');
            }
        } catch (error) {
            console.error('Erro ao excluir recurso:', error);
        }
    },
    setSelectedResource({ commit }, recurso) {
        commit('setSelectedResource', recurso);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

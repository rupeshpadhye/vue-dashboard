// import _ from 'lodash';
const actions = {
  ADD_NODE: ({ commit }, node) => {
    commit('ADD_NODE', { node });
  },
  UPDATE_NODE_XY: ({ commit }, node) => {
    commit('UPDATE_NODE_XY', { item: node });
  },
};

const mutations = {
  ADD_NODE: (state, { node }) => {
    node.id = state.nodes.length;
    state.nodes.push(node);
  },
  UPDATE_NODE_XY: (state, { item }) => {
    const index = state.nodes.map(p => p.id).indexOf(item.id);
    const node = state.nodes[index];
    node.nodeinfo.attrs.transform = item.transform;
    state.nodes.splice(index, 1, node);
  },
};

const getters = {
  getNodes: state => state.nodes,
};

const state = {
  nodes: [],
};


export default {
  state,
  getters,
  actions,
  mutations,
};

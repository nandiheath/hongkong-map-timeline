import IPlace from '~/lib/models/place';
import IPlaceLinkage from '~/lib/models/place-linkage';
import { ActionTree, MutationTree, ActionContext } from 'vuex';
import { RootState } from '../index';
import { getPlaceLinkage } from '~/lib/api';


export interface State {
  selectedPlace: IPlace | null,
  selectedPlaceLinkage: IPlaceLinkage | null
};

export interface Actions<S, R> extends ActionTree<S, R> {

  setSelectedPlace(context: ActionContext<S, R>, place: IPlace | null): Promise<void>;

  clearSelectedPlace(context: ActionContext<S, R>): void;
}


export const state = (): State => ({
  selectedPlace: null,
  selectedPlaceLinkage: null,
})


export const actions: Actions<State, RootState> = {
  async setSelectedPlace({ commit }, place: IPlace) {
    console.log(place);
    commit('setPlace', place);
    const placeLinkage:IPlaceLinkage = await getPlaceLinkage(place.id);

    commit('setPlaceLinkage', placeLinkage);
  },

  clearSelectedPlace({ commit }): void {
    commit('setPlace', null);
    commit('setPlaceLinkage', null);
  }

}

export const mutations: MutationTree<State> = {
  setPlace(state: State, place: IPlace) {
    state.selectedPlace = place;
  },

  setPlaceLinkage(state: State, placeLinkage: IPlaceLinkage) {
    state.selectedPlaceLinkage = placeLinkage;
  }
}

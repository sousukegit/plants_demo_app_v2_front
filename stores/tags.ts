import { defineStore } from 'pinia'


/** counterストア */
export const useTagsStore = defineStore('Tags', {
  state: () => ({
    //tagの保存
      placeTag:"#top"

  }),
  getters: {


  },
  actions: {
   resetPlaceTag(){
    this.placeTag="#top"
   }
  },
})
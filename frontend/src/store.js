import { create } from 'zustand';

export const useHandlePopUp = create((set, get) => ({
  //Variables
  popUpShow: false,
  //Selected component key
  crtKey: '',
  //Popup show function
  showPopUp: () => set((state) => ({ popUpShow: true })),
  shutPopUp: () => set((state) => ({ popUpShow: false })),
  //Selected component key function
  sltCrtKey: (keyValue) => set((state) => ({ crtKey: keyValue })),
}));

export const useComponent = create((set, get) => ({

  //Variables
  sltCom: null,
  allCom: [],
  isShowCom: false,

  //Functions
  handleSltCom: (value) => set((state) => ({ sltCom: value })),
  handleAllCom: (value) => set((state) => ({ allCom: value })),
  showCom: () => set((state) => ({ isShowCom: true })),
  shutCom: () => set((state) => ({ isShowCom: false })),

}));
//Draw Lines
export const useDraw = create((set, get) => ({

  //Variables
  isDrawing: false,
  startPoint: {},
  endPoint: {},
  sPId: '',
  allLines: [],

  //Functions
  enableDraw: () => set((state) => ({ isDrawing: true })),
  disableDraw: () => set((state) => ({ isDrawing: false })),
  setSP: (value) => set((state) => ({ startPoint: value })),
  setEP: (value) => set((state) => ({ endPoint: value })),
  setSPId: (value) => set((state) => ({ sPId: value })),
  setAllLines: (value) => set((state) => ({ allLines: value })),

}));

export const useTest = create((set, get) => ({
  isTest: false,
  allTest: [],

  startTest: () => set((state) => ({ isTest: true })),
  endTest: () => set((state) => ({ isTest: false })),
  setAllTest: (value) => set((state) => ({ allTest: value })),
}))

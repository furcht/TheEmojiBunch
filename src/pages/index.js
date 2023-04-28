import { useEffect, useReducer } from "react";
import MenuBar from "@/components/menuBar";
import EmojiGroups from "@/components/emojiGroups";
import st from "string-therapy";

let ignition;
const baseReducer = (state, action) => {
  let target, name, amtOfEmojis;
  let emojiCount = 0;
  switch(action.type) {
    case "INITIALIZE_SITE":
      return {
        isLoading: false,
        mobileMenu: false,
        editMode: false,
        selected: {},
        emojis: action.data
      }
    case "SELECT_CATEGORY":
      target = state.emojis[action.target];
      if(!target.active) target.active = true;
      target.emojis.forEach(emoji => {
        name = st(emoji.name).toSnakeCase;
        emoji.active = target.active;
        if(!state.selected[name] && emoji.active)
          state.selected[name] = emoji;
      });
      return {...state};
    case "DESELECT_CATEGORY":
      target = state.emojis[action.target];
      if(target.active) target.active = false;
      target.emojis.forEach(emoji => {
        name = st(emoji.name).toSnakeCase;
        emoji.active = target.active;
        if(state.selected[name])
          delete state.selected[name];
      });
      return {...state};
    case "SELECT_EMOJI":
      target = state.emojis[action.target.category];
      amtOfEmojis = target.emojis.length;
      name = action.target.name;
      target.emojis.forEach(emoji => {
        if(emoji.active) emojiCount++;
        if(emoji.name === action.target.name) {
          emoji.active = true;
          if(!state.selected[st(name).toSnakeCase])
            state.selected[st(name).toSnakeCase] = emoji;
        }
      });
      if(!emojiCount) target.active = false;
      else if(emojiCount===amtOfEmojis) target.active = true;
      else target.active = 'partial';
      return {...state};
    case "DESELECT_EMOJI":
      target = state.emojis[action.target.category];
      amtOfEmojis = target.emojis.length;
      name = action.target.name;
      target.emojis.forEach(emoji => {
        if(emoji.active) emojiCount++;
        if(emoji.name === action.target.name) {
          emoji.active = false;
          if(state.selected[st(name).toSnakeCase])
            delete state.selected[st(name).toSnakeCase];
        }
      });
      if(!emojiCount) target.active = false;
      else if(emojiCount===amtOfEmojis) target.active = true;
      else target.active = 'partial';
      return {...state};
    case "CUSTOM_ENABLE":
      state.editMode = action.customize;
      return {...state};
    case "CUSTOM_DISABLE":
      let selectedEntries = Object.entries(state.selected);
      state.editMode = action.customize;
      selectedEntries.forEach(([key, obj]) => {
        let categoryID = st(obj.category).toSnakeCase;
        state.emojis[categoryID].active = false;
        delete state.selected[key];
      })
      return {...state};
    case "DOWNLOAD_CUSTOM":
      if(!ignition) {
        ignition = setTimeout(() => {
          fetch("/api/emojis", {
            method: "POST",
            body: JSON.stringify(state.selected),
          })
          .then(res => res.json())
          .then(data => {
            ignition = null;
            data = JSON.stringify(data);
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'emojis.json');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
        }, 1000);   
      }   
      return {...state};
    case "MENU_TOGGLE":
      state.mobileMenu = action.menu;
      return {...state}
    default:
      throw new Error("Action Missing Yo!");
  }
};

export default function Home() {
  const [baseState, dispatchState] = useReducer(baseReducer, {
    isLoading: true,
    emojis: []
  });

  useEffect(() => {
    fetch("/emojis.json")
      .then(res => res.json())
      .then(data => {
        let objID;
        data = data.reduce((acc, emoji) => {
          objID = st(emoji.category).toSnakeCase;
          emoji.active = false;
          if(!acc[objID]) {
            //- reconfigured object
            acc[objID] = {
              name: emoji.category,
              active: false,
              emojis: []
            };
          }
          acc[objID]["emojis"].push(emoji);
          return acc;
        }, {});
        dispatchState({type: "INITIALIZE_SITE", data})
      });
  }, []);

  if(baseState.isLoading) {
    return (
      <div className="c-loading">Loading...</div>
    )
  }
  
  return (
    <main className="c-viewPort">
      <div id="viewMenu" className="c-viewPort__menu">
        <MenuBar
          categories={baseState.emojis}
          editable={baseState.editMode}
          menu={baseState.mobileMenu}
          dispatcher={dispatchState}
        />
      </div>
      <div className="c-viewPort__body">
        <EmojiGroups
          selected={baseState.selected}
          categories={baseState.emojis}
          editable={baseState.editMode}
          dispatcher={dispatchState}
        />
      </div>
    </main>
  )
}

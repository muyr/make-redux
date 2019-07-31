import {createStore} from './store'


function renderApp(newAppState, oldAppState = {}) {
    if (newAppState === oldAppState) return
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent) {
    if (newContent === oldContent) return
    console.log('render content')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}


function reducer(state, action) {
    if (!state) {
        return {
            title: {
                text: 'React.js 小书',
                color: 'red'
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        }
    }
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }

}

function themeReducer(state, action) {
    if (!state) {
        return {
            themeName: 'Red Theme',
            themeColor: 'red'
        }
    }
    switch (action.type) {
        case 'UPDATE_THEME_COLOR':
            return {
                ...state,
                themeColor: action.themeColor
            }
        case 'UPDATE_THEME_NAME':
            return {
                ...state,
                themeName: action.themeName
            }
        default:
            return state
    }
}


const store = createStore(reducer)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState, oldState)
    oldState = newState
})

const themeStore = createStore(themeReducer)
let oldTheme = themeStore.getState()
themeStore.subscribe(()=>{
    const newTheme = themeStore.getState()
    renderApp(newTheme, oldTheme)
    oldTheme = newTheme
})

renderApp(store.getState())
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'})

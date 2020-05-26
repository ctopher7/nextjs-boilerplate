import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import App from 'next/app';
import React from 'react'

import home from './reducers/home'

const rootReducer = combineReducers({
    home
});

const initializeStore =(preloadedState={})=>createStore(rootReducer,preloadedState,applyMiddleware(thunk))

export default (PageComponent, { ssr =true } = {}) => {
    const WithRedux = ({ initialReduxState, ...props }) => {
        const store = getOrInitializeStore(initialReduxState)
        return (
            <Provider store={store}>
                <PageComponent {...props} />
            </Provider>
        )
    }

    if (process.env.NODE_ENV !== 'production') {
        const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App
        if (isAppHoc) throw new Error('The withRedux HOC only works with PageComponents')
    }

    if (process.env.NODE_ENV !== 'production') {
        const displayName =PageComponent.displayName || PageComponent.name || 'Component'
        WithRedux.displayName = `withRedux(${displayName})`
    }

    if (ssr || PageComponent.getInitialProps) {
        WithRedux.getInitialProps = async context => {
            const reduxStore = getOrInitializeStore()

            context.reduxStore = reduxStore
            const pageProps =typeof PageComponent.getInitialProps === 'function'? await PageComponent.getInitialProps(context): {}
            return {
                ...pageProps,
                initialReduxState: reduxStore.getState(),
            }
        }
    }

    return WithRedux
}
  
let reduxStore
const getOrInitializeStore = initialState => {
    if (typeof window === 'undefined') return initializeStore(initialState)

    if (!reduxStore) reduxStore = initializeStore(initialState)

    return reduxStore
}
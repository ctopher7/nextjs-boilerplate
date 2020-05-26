import { connect } from 'react-redux'
import {setLoading} from '../redux/actions/home'
import withRedux from '../redux'
import Layout from '../utils/Layout'

const Main =(props)=>{
    return(
        <Layout>
            <div>
                <h1>HELLO WORLD!</h1>
            </div>
        </Layout>
    )
}

const stateProps = state=>({
    loading: state.home.loading
})

const dispatchProps = dispatch=>({
    setLoading:(payload)=>dispatch(setLoading(payload))
})

export default withRedux(connect(stateProps,dispatchProps)(Main))
import Head from 'next/head'
import withRedux from '../redux'
import {connect} from 'react-redux'

const Layout = (props)=>
<>
    <Head>
        <title>{props.title??'Hi There'}</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Your Description"/>
        <meta name="keywords" content="Your Keywords"/>
        <meta name="author" content="Christopher Tok"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    {props.children}
</>

const stateProps = state =>({
    lang:state.global.lang
})

export default withRedux(connect(stateProps)(Layout))
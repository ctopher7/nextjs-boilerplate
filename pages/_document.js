import Document, { Head, Main, NextScript } from 'next/document'
import Cookies from 'js-cookie'

class MyDocument extends Document {
    state={
        locale:'en'
    }

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, locale:Cookies.get('locale')??null };
    }

    componentDidMount(){
        this.setState({locale:window.navigator.languages[0]??window.navigator.language})
    }

    render() {
        return (
            <html lang={this.props.locale??this.state.locale}>
                <Head >
                    <style>
                    {`html,body,h1,h2,h3,h4,h5 {margin:0;}`}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
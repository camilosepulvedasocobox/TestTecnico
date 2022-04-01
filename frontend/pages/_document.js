import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider } from 'react-redux'
import store from '../store/index'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Provider store={ store }>
				<Html>
					<Head>
						<title>Test Técnico - React + Redux + NextJS</title>
						<meta name="description" content="Test Técnico para Socobox hecho con React, Redux y NextJS" />
					</Head>
					<body>
						<Main />
						<NextScript />
					</body>
				</Html>
			</Provider>
		)
	}
}

export default MyDocument
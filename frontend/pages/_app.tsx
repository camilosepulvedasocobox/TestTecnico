import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import Layout from "../components/layout/layout";

const MyApp = ({ Component, pageProps }): JSX.Element => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

export default MyApp;

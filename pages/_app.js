import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies , destroyCookie} from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import Axios from "axios";
import Router from "next/router";
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await Axios.get(url, payload);
        const user  = response.data;
        pageProps.user = user;
        //authenticated but is not admin or root
        const isAdmin = user.role === "admin";
        const isRoot = user.role === "root";
      const isNotPermited =!(isRoot || isAdmin) && ctx.pathname==='/create';
      if(isNotPermited){
        redirectUser(ctx,'/');
      }
            } catch (error) {
        console.error("Error getting current user", error);
        //throw invalid cookies
destroyCookie(ctx,"token");
redirectUser(ctx,"/login");
      }
    }

    return { pageProps };
  }

  componentDidMount(){
    window.addEventListener('storage', this.syncLogout)
  }
  syncLogout = event =>{
    if(event.key === 'logout'){
      console.log("Logged out from storage");
      Router.push('/login');
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;

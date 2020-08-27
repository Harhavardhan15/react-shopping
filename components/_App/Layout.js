import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children, user }) {
  //console.log("Layout" +user)
  return (
    
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>ReactShopping</title> 
      </Head>
      <Header user={user} />
      <Container fluid style={{ paddingTop: "1em" ,
    padding: '20px' }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;

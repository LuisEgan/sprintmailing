import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class ExtendedDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white text-gray-900 dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExtendedDocument;

export async function getServerSideProps(context) {
  const initialProps = await Document.getInitialProps(context);
  return { ...initialProps };
}

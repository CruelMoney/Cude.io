import React from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

const App = (props) =>{
    const meta = {
      title: 'Cude CMS',
      description: 'React, redux, auto API',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };

  return (
    <main>
      <header>
        <DocumentMeta {...meta} extend />
        <section>
            <Link to={'/'}>Home</Link>
            <Link to={'/counter'}>Counter</Link>
            <Link to={'/posts'}>Blog</Link>
            <a href={'/keystone'}>Login</a>
          </section>
      </header>

      {props.children}

    </main>
) };

export default App;

import type { GetStaticProps, NextPage } from 'next';
import {getAllPosts, PostMeta} from '../src/api';
import { withLayout } from '../layout/Layout';
import React from 'react';
import IPost from '../interface/IPost';
import Articles from '../src/Components/Articles';

export interface IProps extends Record<string,unknown> {
  posts:PostMeta[]
}

const Home: NextPage<IProps> = ({ posts }: {posts:PostMeta[]}): JSX.Element => {

  return (
    <div>
   <Articles posts ={posts}/>
    </div>
  );
};





export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {

  const posts = getAllPosts()
  .slice(0,9)
  .map(post => post.meta);

  return {
    props: {
      posts
    }
  };
};

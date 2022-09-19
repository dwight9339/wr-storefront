import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useQuery } from "react-query";
import { useMemo, useEffect } from 'react';

import Sidebar from "../components/Sidebar";
import Gallery from '../components/Gallery';
import axios from 'axios';

const Home: NextPage = () => {
  const { data: collections, isLoading, isError, isSuccess } = useQuery(
    ["getCollections"],
    async () => {
      const res = await axios.get("http://localhost:9000/store/collections");
      return res.data.collections;
    }
  )

  useEffect(() => {
    if (isSuccess) {
      console.log(JSON.stringify(collections));
    }
  }, [isSuccess, collections]);

  const content = useMemo(() => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    if (isError) {
      return <h1>Can't load data</h1>;
    }

    if (isSuccess) {
      return (
        <main className={styles.main}>
          <Sidebar collections={collections} />
          <Gallery />
        </main>
      );
    }
  }, [isLoading, isError, isSuccess, collections]);

  return (
    <div>
      <Head>
        <title>Winter Riddle Store</title>
        <meta name="description" content="Official online store of Winter Riddle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content}
    </div>
  )
}

export default Home

import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import styles from '@/styles/page.module.css'
import axios from "axios";
import Image from "next/image";
import ReactPaginate from "react-paginate";

const index = () => {
  
  const [giphyData, setGiphyData] = useState([]);
  const [filterContent, setFilterContent] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1)

  const getAllData = async () => {
    const res = await axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=20&offset=0&rating=g&bundle=messaging_non_clips"
    );
    console.log(res);
    setGiphyData(res.data.data);
  };

  const searchGiphy = async () => {
    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${search}&limit=20n&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    console.log(res);
    setFilterContent(res.data.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    searchGiphy();
  }, [pageCount]);

  const changePage = (x) => {
    // console.log(x);
    setPageCount(x.selected + 1);
    // console.log(pageCount);
  };

  return (
    <Fragment>
      <Box className={styles.page}>
        <Box className={styles.navigation}>
          <InputBase className={styles.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Article name or keywords..."
          />
          <Button className={styles.search_icon}
            onClick={() => searchGiphy()}>
            Search
          </Button>
        </Box>
        <div className={styles.container}>
          {search ? (
            <Fragment>
              {filterContent.map((item) => (
                <Box className={styles.row}>
                  <Box className={styles.box}>
                    <img className={styles.img}
                      src={item.images?.fixed_height?.url}
                      alt="photos"
                    />
                  </Box>
                  <Typography className={styles.text}>
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {giphyData.map((item) => (
                <Box className={styles.row}>
                  <Box className={styles.box}>
                    <img className={styles.img}
                      src={item.images?.fixed_height?.url}
                      alt="photos"
                    />
                  </Box>
                  <Typography className={styles.text}>
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Fragment>
          )}
        </div>
        <div>
          <ReactPaginate
            nextLabel="Next"
            onPageChange={changePage}
            pageCount={5}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </Box>
    </Fragment >
  );
};

export default index;

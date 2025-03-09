import { useEffect, useState } from "react";

import { Grid2, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { showAllPosts } from "../../service/api";

import Post from "./Post";

const Posts = () => {
  const [posts, getPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await showAllPosts(category || "");
      getPosts(response.data);
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts?.length ? (
        posts.map((post) => (
          <Grid2 item lg={3} sm={4} xs={12} key={post._id}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid2>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available for selected category
        </Box>
      )}
    </>
  );
};

export default Posts;

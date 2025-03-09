import Box from "@mui/material/Box";
import { Button, FormControl, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { InputBase, TextareaAutosize } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadApi, getPostById, updatePost } from "../../service/api.js";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  background-color: rgb(233, 210, 210);
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

export const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const nav = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const { id } = useParams();
  const url = post.picture || "/create.jpg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const res = await UploadApi(data);
        setPost({ ...post, picture: res.data.imageUrl });
      }
    };
    getImage();
  }, [file]);

  const UpdateBlogPost = async () => {
    try {
      await updatePost(post, id);
      nav(`/update/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Image src={url} alt="blog"></Image>
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddIcon fontSize="large" />
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        ></input>
        <InputTextField
          placeholder="Title"
          onChange={handleInput}
          value={post.title}
          name="title"
        />
        <Button variant="contained" onClick={UpdateBlogPost}>
          Update
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell your story"
        onChange={handleInput}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

import Box from "@mui/material/Box";
import { Button, FormControl, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { InputBase, TextareaAutosize } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { UploadApi, SavePostApi } from "../../service/api.js";

const Container = styled(Box)`
  margin: 50px 100px;
`;

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

export const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [searchParams] = useSearchParams();
  const { account } = useContext(DataContext);
  const nav = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const url =
    post.picture ||
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    setPost({
      ...post,
      username: account.username,
      categories: searchParams.get("category") || "All",
    });
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

  const savePost = async () => {
    try {
      console.log(post);
      await SavePostApi(post);
      nav("/");
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
          name="title"
        />
        <Button variant="contained" onClick={savePost}>
          Publish
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell your story"
        onChange={handleInput}
        name="description"
      />
    </Container>
  );
};

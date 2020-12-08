import React, { useEffect, useState } from 'react';
import Posts from '../Posts/ViewPost/Posts';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropzoneDialog } from 'material-ui-dropzone';

//import Friends from './Friends';
//import AddPost from '../Posts/AddPost/AddPosts';
//import User from './User';
import {
  changeAvatar,
  getUser,
  getUserPosts,
} from '../../Redux/Action/userAction';
import { Avatar } from '@material-ui/core';

function MyProfile() {
  const { id } = useParams();
  const history = useHistory();
  const authorPost = useSelector((state) => state.users);
  const author = useSelector((state) => state.auth.userData.user);
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserPosts(id));
  }, [dispatch, id]);

  function handleOpen() {
    setState({ ...state, open: true });
  }

  function handleSave(files) {
    const reader = new FileReader();

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
    reader.addEventListener(
      'load',
      function () {
        dispatch(changeAvatar(reader.result));
        setState({ ...state, open: false, files: reader.result });
      },
      false
    );
  }

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <>
      <Avatar
        src={
          author.avatar ||
          state.files ||
          'https://i.pinimg.com/originals/2e/f5/38/2ef538b144db555f8dcd4bbc34c17e84.jpg'
        }
        style={{
          width: '150px',
          height: '150px',
          padding: '20px',
        }}
        onClick={handleOpen}
      />
      <DropzoneDialog
        open={state.open}
        onSave={handleSave}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />

      <h1>{author.name}</h1>
      <h2>{author.email}</h2>
      {authorPost.userPosts.map((post) => (
        <div>
          <h3>{post.message}</h3>
        </div>
      ))}
    </>
  );
}

export default MyProfile;

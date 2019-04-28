import React from 'react';
import { NavLink } from 'react-router-dom';


const PostThumbnail = (props) => {
  return (
    <NavLink exact to={`/posts/${props.post.id}`}>
      <div onClick={() => props.goTo(props.post.id)} role="button" tabIndex="0">
        {props.post.title}
        {props.post.tags}
        <img src={props.post.cover_url} alt="post cover_url" />
      </div>
    </NavLink>
  );
};

export default PostThumbnail;

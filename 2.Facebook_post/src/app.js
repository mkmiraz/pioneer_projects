const post_photo = document.getElementById("post_photo");
const post_video = document.getElementById("post_video");
const photo_area = document.querySelector(".photo");
const video_area = document.querySelector(".video");

// get elements
const post_form = document.getElementById("post_add_form");
const msg = document.querySelector(".msg");
const all_posts = document.querySelector(".all_posts");
const btn_close = document.getElementById("btn_close");

const post_edite_form = document.getElementById("post_edite_form");
const edite_btn_close = document.getElementById("edite_btn_close");
// // photo input hide
if (post_video) {
  post_video.oninput = () => {
    photo_area.style.display = "none";
  };
}

// video input hide
if (post_photo) {
  post_photo.oninput = () => {
    video_area.style.display = "none";
  };
}

// get all post
const getAllPost = () => {
  let posts = JSON.parse(localStorage.getItem("fb_post"));
  let list = "";
  if (posts) {
    posts.reverse().map((post, index) => {
      list += `
      <div class="post-timeine-area my-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="post-auth-area">
            <div class="user-info">
              <img
                src="${post.user_photo}"
                alt=""
              />
              <div class="details">
                <span>${post.user_name}</span>
                <span>${timeAgo(
                  post.createAt
                )}. <i class="fas fa-globe-asia"></i></span>
              </div>
            </div>
            <div class="dropdown">
              <a
                class="dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-ellipsis-h"></i>
              </a>

              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
              >
                <li><a class="dropdown-item" data-bs-toggle="modal"
                data-bs-target="#postUpdateMdoal" onclick="editePost('${
                  post.id
                }')"  href="#">Edit</a></li>
                <li><a class="dropdown-item" onclick="deletePost('${
                  post.id
                }')" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <div class="post-content-area my-2">
            <p>
            ${post.post_content}
            </p>
          </div>
        </div>

        ${
          post.post_photo
            ? '<img id="post_img" src="' + post.post_photo + '" alt="">'
            : ""
        }

        ${
          post.post_video
            ? "<iframe id='post_video_area' src='" +
              post.post_video +
              "'  frameborder='0' allow='autoplay; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>"
            : ""
        }

        <div class="like_area">
          <div class="counter">
            <div class="img">
              <img src="./images/thumb-up.png" alt="" />
              <span class="count"></span>
            </div>
            <div class="comment">
              <span>21 comments</span>
            </div>
          </div>

          <div class="like_btn">
            <button class="like_button">
              <img src="./images/b_like.png" alt="" /> Like
            </button>
            <button>
              <img src="./images/b_chat.png" alt="" /> Comment
            </button>
            <button>
              <img src="./images/b_share.png" alt="" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
      `;
    });
  } else {
    all_posts.innerHTML = `<div class="card shadow-sm text-center" style="border-radius:10px;"><div class="card-body">No post found</div></div>`;
  }

  all_posts.innerHTML = list;
};
getAllPost();

/**
 * post create
 * @param {*} e
 */
// post_form.onsubmit = (e) => {
//   alert("hi");
//   e.preventDefault();

// };

post_form.onsubmit = (e) => {
  e.preventDefault();

  // form data get
  const form_data = new FormData(e.target);
  const { user_name, user_photo, post_content, post_photo, post_video } =
    Object.fromEntries(form_data);

  if (!user_name || !user_photo) {
    msg.innerHTML = createAlert("All fields are required");
  }
  // // create post
  const old_data = localStorage.getItem("fb_post");

  let ls_data = [];
  if (old_data) {
    ls_data = JSON.parse(old_data);
  }

  ls_data.push({
    id: createID(),
    user_name,
    user_photo,
    post_content,
    post_photo,
    post_video,
    createAt: Date.now(),
  });

  localStorage.setItem("fb_post", JSON.stringify(ls_data));
  e.target.reset();
  getAllPost();
  btn_close.click();
};

// delete post
const deletePost = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary Post!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const posts = JSON.parse(localStorage.getItem("fb_post"));
      const update_post = posts.filter((post) => post.id !== id);
      localStorage.setItem("fb_post", JSON.stringify(update_post));
      getAllPost();
      swal("Poof! Your imaginary Post has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary Post is safe!");
    }
  });
};

/**
 * edite post
 */

const editePost = (id) => {
  const post = JSON.parse(localStorage.getItem("fb_post"));
  const { user_name, user_photo, post_content, post_photo, post_video } =
    post.find((data) => data.id === id);

  post_edite_form.querySelector('input[name="user_name"]').value = user_name;
  post_edite_form.querySelector('input[name="user_photo"]').value = user_photo;
  post_edite_form.querySelector('textarea[name="post_content"]').value =
    post_content;
  post_edite_form.querySelector('input[name="post_photo"]').value = post_photo;
  post_edite_form.querySelector('input[name="post_video"]').value = post_video;

  post_edite_form.querySelector('input[name="id"]').value = id;
};

/**
 * edite form submit
 */
post_edite_form.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const { user_name, user_photo, post_content, post_photo, post_video, id } =
    Object.fromEntries(form_data);

  const post = JSON.parse(localStorage.getItem("fb_post"));

  const new_post = post.map((data) => {
    if (data.id === id) {
      return {
        ...data,
        user_name,
        user_photo,
        post_content,
        post_photo,
        post_video,
      };
    } else {
      return data;
    }
  });

  localStorage.setItem("fb_post", JSON.stringify(new_post));
  getAllPost();
  edite_btn_close.click();
};

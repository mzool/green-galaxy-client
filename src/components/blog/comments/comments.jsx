import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Comments() {
  /// get blog id
  const { blog_id } = useParams();
  /// style
  let style = {
    inputs:
      "border-2 border-gray-200 rounded-md p-2 outline-0 w-full hover:border-green-500 focus:border-green-500 transtion duration-300",
  };
  /// variables
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    body: "",
  });
  // msgs
  const [msg, setMsg] = useState("");
  const [fetching, setFetching] = useState(false);
  /// handle submit
  function submitComment(e) {
    e.preventDefault();
    setFetching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_new_comment
      }`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          blog_id: blog_id,
        },
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          body: formValues.body,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setComments((pr) => [
            ...pr,
            { user_name: formValues.username, body: formValues.body },
          ]);
          setFormValues({
            username: "",
            email: "",
            body: "",
          });
        } else {
          setMsg(data.message);
          setFormValues({
            username: "",
            email: "",
            body: "",
          });
        }
      })
      .finally(() => {
        setFetching(false);
      });
  }
  /// get all comments
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setFetching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_all_blog_comments
      }`,
      {
        method: "get",
        mode: "cors",
        headers: {
          blog_id: blog_id,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.data);
        }
      })
      .finally(() => {
        setFetching(false);
      });
  }, [blog_id]);
  /// rendering
  return (
    <div className="w-full bg-gray-50 text-gray-700 p-2 mt-10">
      <form
        onSubmit={submitComment}
        className="p-4 w-full rounded-lg h-fit flex flex-col gap-2"
      >
        {/* user name */}
        <div className="flex flex-row gap-4 w-full">
          <input
            type="text"
            required
            placeholder="username"
            className={style.inputs}
            value={formValues.username}
            onChange={(e) =>
              setFormValues({ ...formValues, username: e.target.value })
            }
          />
          {/* email */}
          <input
            type="email"
            required
            placeholder="email"
            className={style.inputs}
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>

        <div></div>
        {/* comment */}
        <div>
          <textarea
            required
            maxLength={300}
            placeholder="comment"
            className={style.inputs}
            rows={5}
            cols={10}
            value={formValues.body}
            onChange={(e) =>
              setFormValues({ ...formValues, body: e.target.value })
            }
          />
        </div>
        {/* msgs */}
        <div className="w-full">
          {msg && <p className="text-gray-700"> {msg}</p>}
        </div>
        {/* submit */}
        <div>
          <input
            type="submit"
            disabled={fetching}
            value={!fetching ? "add new comment" : "sending your comment..."}
            className="border-2 border-green-500 bg-green-700 text-white p-2 hover:bg-green-500 transiton duration-300 rounded-lg"
          />
        </div>
      </form>
      {/* past comments */}
      <div className="mt-2 flex flex-col w-full p-4 ">
        <h2 className="font-semibold mb-2">All comments:</h2>
        {comments.length == 0
          ? "no comments"
          : comments.map((comment, i) => {
              return (
                <div
                  key={i}
                  className={i % 2 != 0 ? "bg-gray-50 p-2" : "bg-green-600 text-white p-2"}
                >
                  <p className="text-sm font-semibold mb-1">@{comment.user_name}</p>
                  <p>{comment.body}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Comments;

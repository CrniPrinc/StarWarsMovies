import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occured";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    title = "Page not found";
    message = "Could not find resources or page";
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;

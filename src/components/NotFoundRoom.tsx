import { Link, useLocation } from "react-router-dom";
function NotFoundRoom() {
  const location = useLocation();

  return (
    <>
      <div>Room with id {location.state.roomId} does not exist</div>
      <Link className="text-blue-500" to="/">
        To home page
      </Link>
    </>
  );
}

export default NotFoundRoom;

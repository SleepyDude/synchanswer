import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoomCreationForm from "./components/RoomCreation";
import RoomLobby from "./components/RoomLobby";
import NotFoundRoom from "./components/NotFoundRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomCreationForm />} />
        <Route path="/404" element={<NotFoundRoom />} />
        <Route path="/rooms/:roomId" element={<RoomLobby />} />
      </Routes>
    </>
  );
}

export default App;

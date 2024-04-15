import plus from "../../images/plus.png";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/appContext";

export function PlaylistTiles({ playlist }) {
  const navigate = useNavigate();

  function addSongsToPlaylistClickHandler(e) {
    e.stopPropagation(); // Stop event propagation to prevent parent div click
    navigate(`playlist/${playlist._id}/add/songs`);
  }



  return (
    <div
      key={playlist._id}
      onClick={() => navigate(`playlist/${playlist._id}`)}
      className=" h-1/5 will-change-auto p-1 text-white  m-1 flex flex-row gap-4 hover:bg-customGray hover:cursor-pointer rounded-md"
    >
      <div className="h-9/10 w-1/5 ">
        <img src={playlist.thumbnail} className="h-full w-full rounded" />
      </div>

      <div className="h-full w-3/5 flex flex-col justify-around ">
        <div className="text-lg">{playlist.name}</div>
        <div className="text-sm">
          {playlist.songs.length}
          <span> songs</span>
          <span>
            {" "}
            <button className="hover:cursor-default  border-2 px-1 border-black border-solid bg-customGray rounded-full">
              {playlist.visibilityMode}
            </button>
          </span>
        </div>
      </div>

      <div className="h-full w-1/5 flex items-center justify-center ">
        <img
          src={plus}
          onClick={addSongsToPlaylistClickHandler}
          className="h-6 w-6 hover:scale-125 hover:cursor-pointer "
        />
      </div>
    </div>
  );
}

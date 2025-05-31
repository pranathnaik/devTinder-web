import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, photoUrl, gender, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (error) {}
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex">
          {age && <div className="badge badge-primary mr-2">{age}</div>}
          {gender && <div className="badge badge-primary">{gender}</div>}
        </div>
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

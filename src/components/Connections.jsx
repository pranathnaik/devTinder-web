import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="flex justify-center my-10">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        {connections.map((connection) => (
          <li className="list-row">
            <div>
              <img className="size-10 rounded-box" src={connection.photoUrl} />
            </div>
            <div>
              <div>
                {connection.firstName} {connection.lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {connection.about}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;

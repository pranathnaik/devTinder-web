import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
    } catch (error) {}
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="justify-center my-10">
      <h1 className="text-bold text-xl">New Requests</h1>
      {requests.map((request) => (
        <>
          <div>{request.fromUserId.firstName}</div>
          <button
            className="btn btn-primary"
            onClick={() => reviewRequest("rejected", request._id)}
          >
            Reject
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => reviewRequest("accepted", request._id)}
          >
            Accept
          </button>
        </>
      ))}
    </div>
  );
};

export default Requests;

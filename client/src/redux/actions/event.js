import axios from "axios";
import { server } from "../../server";
import Swal from "sweetalert2";



export const createCategory = async (name) => {
  const loadingSwal = Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.post(`${server}/category/create`, { name });

    console.log("CREATE Category API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Category Details");
    }

    return response?.data?.success;
  } catch (error) {
    console.error("CREATE Category API ERROR............", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Something went wrong!",
    });
  } finally {
    Swal.close(); // Correct way to close the loading modal
  }
};


export const deleteCategory = async (id) => {
  const toastId = Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.delete(`${server}/category/delete/${id}`);


    console.log("DELETE Category API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Category");
    }

    return response;
  } catch (error) {
    console.log("DELETE Category API ERROR............", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    Swal.close(toastId);
  }
};

export const fetchCategory = async () => {
  let result = [];
  try {
    const response = await axios.get(`${server}/category/all`);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch News Categories");
    }
    result = response?.data;
  } catch (error) {
    console.log("News_CATEGORY_API API ERROR............", error);
  }
  return result;
};
// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

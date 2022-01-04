import { axiosInstance } from "./axiosInstance";

class API {
  //Return content from the DB
  getContent = async () => {
    return await axiosInstance
      .get("getContent").then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  getDroneContent = async () => {
    return await axiosInstance
      .get("getDroneContent").then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  //Create a new content to the DB
  addContent = async (objToAdd) => {
    return await axiosInstance.post("insertContent", objToAdd).then((response) => {
      return response.data;
    }).catch((err) => {
      return err;
    });
  };

  addDroneContent = async (objToAdd) => {
    return await axiosInstance.post("addDroneContent", objToAdd).then((response) => {
      return response.data;
    }).catch((err) => {
      return err;
    });
  };

  //Delete a content from the DB
  deleteContent = async (objToDelete) => {
    return await axiosInstance.delete("deleteContent", {data: {objToDelete}}).then((response) => {
      return response.data;
    }).catch((err) => {
      return err;
    });
  };

   //Edit a content in the DB
    editContent = async (objToEdit) => {
    return await axiosInstance.put("editContent", objToEdit).then((response) => {
      return response.data;
    }).catch((err) => {
      return err;
    });
  };

}

const instance = new API();
export default instance;

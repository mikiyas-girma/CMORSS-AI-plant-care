import React from "react";
import CustomModal from "../common/CustomModal";
import { Card } from "../ui/card";

const DeletePlantModal = ({ closeModal, handleDelete }) => {
  return (
    <CustomModal closeModal={closeModal}>
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-center">
            Are you sure you want to delete this plant?
          </h2>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {handleDelete(); closeModal()}}
              className="bg-destructive text-white rounded-md px-4 py-2"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="bg-primary text-white rounded-md px-4 py-2 ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>
    </CustomModal>
  );
};

export default DeletePlantModal;

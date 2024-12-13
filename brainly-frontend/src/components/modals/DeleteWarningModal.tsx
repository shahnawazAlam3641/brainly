import React from "react";
import Button from "../common/Button";
import { deleteUserNote } from "../../utils/operations";
import { RootState } from "../../reducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../slices/notesSlice";

interface propData {
  setDeleteModal: (data: boolean) => void;
  cardId: string;
}

const DeleteWarningModal = (props: propData) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  const deleteNoteHandler = async (id: string) => {
    const response = await deleteUserNote(id, token);
    if (response.data.success) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div className="absolute  p-6 w-96 max-w-full rounded-md z-30 flex flex-col justify-center items-center gap-5 top-0  left-0 bottom-0 right-0  bg-[#fefefeeb]  shadow-2xl">
      <p className="text-center font-semibold text-slate-800">
        Are you sure you want to delete this note?
      </p>
      <div className="flex justify-between gap-10   ">
        <Button
          onPress={() => props.setDeleteModal(false)}
          isPrimary={false}
          text="No"
        />
        <Button
          onPress={() => deleteNoteHandler(props.cardId)}
          isPrimary={true}
          text="Yes"
        />
      </div>
    </div>
  );
};

export default DeleteWarningModal;

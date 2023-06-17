import React , {useState} from 'react'
import AddFolder from './AddFolder';

const NewFolder = ({handleOptionChange}) => {
     const [isOpen, setIsOpen] = useState(false);
     const handleOpenDialog = () => {
       setIsOpen(!isOpen);
     };
  return (
    <>
      <div className="editDialogMain">
        <button onClick={handleOpenDialog} className="editButton">
          New File
        </button>
      </div>
      {isOpen && (
        <AddFolder
          handleOptionChange={handleOptionChange}
          handleCloseDialog={handleOpenDialog}
        />
      )}
    </>
  );
}

export default NewFolder
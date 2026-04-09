import { ToastContainer, toast } from 'react-toastify';

function Toastify() {
  const notify = () => toast("Test toastify works...", { onOpen: () => console.log("Click on Notify button"), autoClose: false, type: "error", position: "bottom-center" });

  const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
  toast.promise(
    functionThatReturnPromise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯'
    }
  )

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}

export default Toastify;
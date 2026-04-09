import { useState } from 'react';
import Modal from 'react-modal';

// Визначення кореневого елемента для доступності
Modal.setAppElement('#root');

const ModalComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Відкрити модальне вікно</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Test Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Привіт, світ!</h2>
        <button onClick={closeModal}>Закрити</button>
      </Modal>
    </div>
  );
};

export default ModalComponent;
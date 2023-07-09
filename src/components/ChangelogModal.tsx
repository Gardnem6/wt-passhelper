import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactMarkdown from 'react-markdown';
import changelog from '../../CHANGELOG.md?raw';

function ChangelogModal() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  return (
    <>
        <Button className='p-0' variant={'link'} onClick={() => handleShow()}>
          Changelog
        </Button>
      <Modal contentClassName='bg-dark text-light' show={show} onHide={() => setShow(false)}>
        <Modal.Header closeVariant='white' closeButton>
          <Modal.Title>Changelog - Version {APP_VERSION}</Modal.Title>
        </Modal.Header>
        <Modal.Body><ReactMarkdown>{changelog}</ReactMarkdown></Modal.Body>
      </Modal>
    </>
  );
}

export default ChangelogModal;
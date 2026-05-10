import React, { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ModalDataExample = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  // Datos dinámicos desde el padre
  const [modalTitle, setModalTitle] = useState('Formulario de Contacto');
  const [initialData, setInitialData] = useState<FormData | null>(null);

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Enviar datos al padre
  const handleSubmit = () => {
    console.log('Datos enviados al padre:', formData);

    // Aquí podrías pasar los datos a una función del padre
    // onSubmitToParent(formData);

    // Cerrar modal
    setShowModal(false);

    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  // Cancelar y cerrar
  const handleCancel = () => {
    setShowModal(false);
    setFormData(initialData || {
      name: '',
      email: '',
      message: ''
    });
  };

  // Ejemplo: Editar datos existentes
  const openEditModal = (data: FormData, title: string) => {
    setInitialData(data);
    setFormData(data);
    setModalTitle(title);
    setShowModal(true);
  };

  // Ejemplo: Nuevo formulario
  const openNewModal = () => {
    setInitialData(null);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setModalTitle('Nuevo Formulario');
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Ejemplo de Modal con Datos</h2>

      <div className="space-y-4">
        {/* Botones para demostrar diferentes casos */}
        <div className="flex gap-2">
          <Button onClick={openNewModal}>
            Nuevo Formulario
          </Button>

          <Button
            variant="secondary"
            onClick={() => openEditModal({
              name: 'Juan Pérez',
              email: 'juan@example.com',
              message: 'Este es un mensaje de ejemplo'
            }, 'Editar Datos')}
          >
            Editar Datos
          </Button>
        </div>

        {/* Mostrar datos actuales */}
        {formData.name && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Datos Actuales:</h3>
            <p><strong>Nombre:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Mensaje:</strong> {formData.message}</p>
          </div>
        )}

        {/* Modal con formulario */}
        <Modal
          show={showModal}
          onHide={handleCancel}
          title={modalTitle}
          size="lg"
          centered
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Escribe tu mensaje..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                Guardar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ModalDataExample;

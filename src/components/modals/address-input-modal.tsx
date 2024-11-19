import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface AddressInputModalProps {
  handleAddressComplete: ((address: Address) => void) | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const AddressInputModal: React.FC<AddressInputModalProps> = ({
  handleAddressComplete,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8 sm:max-w-3xl">
        <DaumPostcode onComplete={handleAddressComplete} style={{ height: '445px' }} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressInputModal;

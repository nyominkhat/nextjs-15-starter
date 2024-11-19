'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Address } from 'react-daum-postcode';

import AddressInputModal from '@/components/modals/address-input-modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IconInput } from '@/components/ui/customs/icon-input';

interface addressType {
  zip: string;
  addr: string;
  addrEtc: string;
}

interface AddressInputGroupProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  label: string;
  isLoading?: boolean;
}

const AddressInputGroup = <TFormValues extends FieldValues>({
  form,
  label,
  isLoading = false,
}: AddressInputGroupProps<TFormValues>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<addressType>({
    zip: '',
    addr: '',
    addrEtc: '',
  });

  const handleAddressComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress((prev) => ({
      ...prev,
      zip: data.zonecode,
      addr: fullAddress,
    }));

    setIsOpen(false);
  };

  const handleAdditionalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({
      ...prev,
      addrEtc: e.target.value,
    }));
  };

  useEffect(() => {
    (Object.keys(address) as Array<keyof addressType>).forEach((key) => {
      form.setValue(
        key as Path<TFormValues>,
        address[key] as PathValue<TFormValues, Path<TFormValues>>,
      );
    });
  }, [address, form]);

  return (
    <div className="flex flex-col gap-4">
      <FormLabel htmlFor="zip">{label}</FormLabel>

      <div className="flex gap-2">
        <FormField
          control={form.control}
          name={'zip' as Path<TFormValues>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput
                  {...field}
                  startIcon={Search}
                  value={address.zip || field.value}
                  placeholder="우평번호"
                  onClick={() => setIsOpen(true)}
                  onChange={field.onChange}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'addr' as Path<TFormValues>}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} value={address.addr || field.value} placeholder="주소" readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={'addrEtc' as Path<TFormValues>}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                {...field}
                value={address.addrEtc || field.value}
                placeholder="상세 주소"
                onChange={handleAdditionalChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AddressInputModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleAddressComplete={handleAddressComplete}
      />
    </div>
  );
};

export default AddressInputGroup;

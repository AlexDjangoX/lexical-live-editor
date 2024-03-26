import { InputProps } from '../ui/input';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="py-2">{label}</label>
      <input
        className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;

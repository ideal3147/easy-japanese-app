import { MdDelete } from "react-icons/md";

interface DeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function DeleteButton({ onClick, disabled }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-12 w-12 border-2 border-gray-300 border-dashed rounded-lg ${
        disabled
          ? 'bg-gray-50 cursor-not-allowed opacity-50'
          : 'bg-gray-50 hover:bg-red-50 hover:border-red-300 cursor-pointer'
      }`}
    >
      <MdDelete
        size={24}
        className={disabled ? 'text-gray-400' : 'text-gray-500 group-hover:text-red-500'}
      />
    </button>
  );
} 
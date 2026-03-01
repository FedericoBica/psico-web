'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChanged: ( value: number ) => void; 
}

export const QuantitySelector = ( { quantity, onQuantityChanged }: Props ) => {

  const onValueChanged = ( value: number ) => {
    if ( quantity + value < 1 ) return;
    onQuantityChanged( quantity + value );
  };

  return (
    <div className="flex items-center bg-gray-50/50 rounded-xl w-fit p-1 border border-gray-200 shadow-sm">
      <button 
        onClick={ () => onValueChanged( -1 ) }
        className="p-2 text-gray-400 hover:text-sage-600 transition-colors active:scale-90"
      >
        <IoRemoveCircleOutline size={ 22 } />
      </button>

      <span className="w-10 text-center font-semibold text-gray-700 tabular-nums">
        { quantity }
      </span>

      <button 
        onClick={ () => onValueChanged( +1 ) }
        className="p-2 text-gray-400 hover:text-sage-600 transition-colors active:scale-90"
      >
        <IoAddCircleOutline size={ 22 } />
      </button>
    </div>
  );
};
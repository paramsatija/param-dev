   // src/components/Modal.tsx
   'use client'

   import { ModalProps } from '@/types'

   export default function Modal({ isOpen, onClose, children }: ModalProps) {
     if (!isOpen) return null

     return (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
           <button 
             onClick={onClose} 
             className="text-gray-500 hover:text-gray-700 float-right"
           >
             &times;
           </button>
           {children}
         </div>
       </div>
     )
   }
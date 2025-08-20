import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({
  isOpen,
  triggerRef,
  children,
  className = '',
  onClose
}) => {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
          const windowHeight = window.innerHeight;
          const dropdownHeight = 300; // Approximate dropdown height
          
          // Check if dropdown would go below viewport
          const spaceBelow = windowHeight - rect.bottom;
          const spaceAbove = rect.top;
          
          let top = rect.bottom + 8; // Default position below button
          
          // If not enough space below, position above
          if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            top = rect.top - dropdownHeight - 8;
          }
          
          setPosition({
            top: Math.max(8, Math.min(top, windowHeight - dropdownHeight - 8)),
            right: window.innerWidth - rect.right
          });
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`fixed z-[9999] max-h-[calc(100vh-100px)] overflow-y-auto ${className}`}
          style={{
            top: `${position.top}px`,
            right: `${position.right}px`,
            maxWidth: 'calc(100vw - 2rem)'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default DropdownPortal;

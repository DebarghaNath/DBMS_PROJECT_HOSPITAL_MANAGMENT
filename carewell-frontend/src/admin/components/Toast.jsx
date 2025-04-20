import { useState, useEffect } from 'react';

const Toast = ({ type, message, title, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 h-[92px] p-[13px] bg-white rounded-xl shadow-[0px_4px_35px_0px_rgba(0,0,0,0.20)] flex justify-start items-center gap-5 z-[100]">
      <div className="h-[66px] flex items-start gap-1">
        <div className="relative pt-2 pr-1">
          {type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Frame">
              <path id="Vector" d="M18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6024 5.39795 18.3334 10.0003 18.3334C14.6027 18.3334 18.3337 14.6024 18.3337 10.0001Z" stroke="#6938EF" strokeWidth="1.2"/>
              <path id="Vector_2" opacity="0.4" d="M10.2015 14.1667V10.0001C10.2015 9.60725 10.2015 9.41083 10.0794 9.28875C9.95741 9.16675 9.761 9.16675 9.36816 9.16675" stroke="#6938EF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path id="Vector_3" opacity="0.4" d="M9.99341 6.66663H10.0012" stroke="#6938EF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M12.4995 12.5L7.5 7.5M7.50053 12.5L12.5 7.5" stroke="#F0272A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.3337 9.99996C18.3337 5.39758 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39758 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996Z" stroke="#F0272A" strokeWidth="1.2"/>
            </svg>
          )}
        </div>
        <div className="h-[66px] flex flex-col justify-center items-start gap-[5px]">
          <div className={`text-base font-medium font-['Poppins'] ${type === 'success' ? 'text-[#6938ef]' : 'text-[#f0272a]'}`}>{title}</div>
          <div className="text-[#494759] text-sm font-normal font-['Poppins'] leading-[21px]">{message}</div>
        </div>
      </div>
      <button onClick={() => setVisible(false)} className="pb-14">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group 904">
          <path id="Vector" opacity="0.4" d="M11 1L1.25 10.75" stroke="black" strokeWidth="1.21875" strokeLinecap="round" strokeLinejoin="round"/>
          <path id="Vector_2" d="M11 10.75L1.25 1" stroke="black" strokeWidth="1.21875" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Toast;
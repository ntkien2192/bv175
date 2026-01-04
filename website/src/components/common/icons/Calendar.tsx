import React from 'react';

type Props = {
  className?: string;
};

const CalendarIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 17 18"
      fill="none"
    >
      <path
        d="M5.632 12.0833V13.75H3.95801V12.0833H5.632ZM8.96208 12.0833V13.75H7.28727V12.0833H8.96208ZM5.632 8.75V10.4167H3.95801V8.75H5.632ZM8.96208 8.75V10.4167H7.28727V8.75H8.96208ZM12.2913 8.75V10.4167H10.6174V8.75H12.2913Z"
        fill="currentColor"
      />
      <path
        d="M4.1665 0V3.33333H2.9165V0H4.1665ZM13.3332 0V3.33333H12.0832V0H13.3332Z"
        fill="currentColor"
      />
      <path
        d="M15.625 1.0415C15.9702 1.0415 16.25 1.32133 16.25 1.6665V16.6665C16.25 17.0117 15.9702 17.2915 15.625 17.2915H0.625C0.279822 17.2915 0 17.0117 0 16.6665V1.6665C0 1.32133 0.279822 1.0415 0.625 1.0415H15.625ZM1.25 16.0415H15V2.2915H1.25V16.0415Z"
        fill="currentColor"
      />
      <path
        d="M15.625 5.20825C15.9702 5.20825 16.25 5.48807 16.25 5.83325C16.25 6.17843 15.9702 6.45825 15.625 6.45825H0.625C0.279822 6.45825 0 6.17843 0 5.83325C0 5.48807 0.279822 5.20825 0.625 5.20825H15.625Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CalendarIcon;

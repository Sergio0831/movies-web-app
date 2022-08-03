import clsx from 'clsx';

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  const loadingClasses = clsx(
    {
      loading: true
    },
    className
  );

  return (
    <svg
      className={loadingClasses}
      style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke='currentColor'
        strokeWidth='10'
        r='35'
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='500ms'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
    </svg>
  );
};
export default Loading;

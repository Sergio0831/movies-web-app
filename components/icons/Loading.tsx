type LoadingProps = {
  width?: string;
  height?: string;
  className?: string;
};

const Loading = ({ width, height, className }: LoadingProps) => {
  return (
    <svg
      className={className}
      style={{ margin: "auto", display: "block", shapeRendering: "auto" }}
      width={width ? width : "8rem"}
      height={height ? height : "8rem"}
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


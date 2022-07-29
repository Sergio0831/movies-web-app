type LoadingProps = {
  width?: string;
  height?: string;
  stroke?: string;
};

const Loading = ({ width, height, stroke }: LoadingProps) => {
  return (
    <svg
      style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }}
      width={width ? width : '8rem'}
      height={height ? height : '8rem'}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke={stroke ? stroke : '#fc4747'}
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

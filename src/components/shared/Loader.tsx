// const Loader = () => (
//   <div className="flex-center w-full">
//     <img
//       src="/assets/icons/loader.svg"
//       alt="loader"
//       width={24}
//       height={24}
//       className="animate-spin"
//     />
//   </div>
// );

// export default Loader;

type LoaderProps = {
  size?: number;  // Optional size prop with a default value
};

const Loader = ({ size = 24 }: LoaderProps) => (
  <div className="flex-center w-full">
    <img
      src="/assets/icons/loader.svg"
      alt="loader"
      width={size}
      height={size}
      className="animate-spin"
    />
  </div>
);

export default Loader;

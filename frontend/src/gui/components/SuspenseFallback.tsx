import LoadingComp from './common/LoadingComp';

/**
 * Suspense Fall Back Componenent for
 * Dynamically loaded components (Suspense)
 * @returns JSX
 */
const SuspenseFallback = () => {
  return (
    <LoadingComp
      message="Loading. Please wait..."
      iconType="box"
      iconColor="orange"
      className="h-[100%] w-full"
    />
  );
};

export default SuspenseFallback;

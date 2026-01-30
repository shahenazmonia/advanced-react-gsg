import { useContext, type PropsWithChildren } from "react";
import { FeatureFlagContext } from "./Context";

export type FeatureFlagsProps = {
  isProductsNewUIEnabled: boolean;
};

export const FeatureFlagProvider = ({
  children,
  value,
}: PropsWithChildren<{
  value: FeatureFlagsProps;
}>) => {
  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider"
    );
  }
  return context;
};

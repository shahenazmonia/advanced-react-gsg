import { createContext } from "react";
import type { FeatureFlagsProps } from ".";

export const FeatureFlagContext = createContext<FeatureFlagsProps | null>(null);

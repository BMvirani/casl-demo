"use client"
import { AbilityContext } from "./Can";

import defineAbilityFor from "./permissions";
import { useAuth } from "./AuthContext";

export default function AccessProvider(props) {
  const { user } = useAuth();
  return (
    <AbilityContext.Provider value={defineAbilityFor(user)}>
      {props.children}
    </AbilityContext.Provider>
  );
}

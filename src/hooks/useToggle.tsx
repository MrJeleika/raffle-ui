import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export const useToggle = (
  initialState = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prevState) => !prevState);

  return [state, toggle, setState];
};

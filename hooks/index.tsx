import { AppDispath, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";

// custom hooks for typed redux usage
export const useAppDispatch: () => AppDispath = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// promise tracker hook
export const useApiLoader = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress;
};


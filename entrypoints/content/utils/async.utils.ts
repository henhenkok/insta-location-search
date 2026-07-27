interface AsyncState<TResult> {
  step: string;
  data?: TResult;
  error?: any;
}

export function useAsyncApi<TResult>() {
  const [currentTask, setCurrentTask] = useState<Promise<TResult> | null>(null);
  const call = useCallback((task: () => Promise<TResult>) => {
    setCurrentTask((prevTask) => {
      if (prevTask) {
        throw new Error('Double call received');
      }
      return task();
    });
  }, [setCurrentTask]);
  const [asyncState, setState] = useState<AsyncState<TResult>>({
    step: 'INIT',
  });
  useEffect(() => {
    if (currentTask) {
      setState({
        step: 'LOADING',
      })
      currentTask.then((data) => setState({
        step: 'LOADED',
        data,
      }), (err) => setState({
        step: 'FAILED',
        error: err,
      }))
    }
  }, [currentTask]);
  return useMemo(() => ({
    call,
    isLoading: asyncState.step === 'LOADING',
    data: asyncState.data,
    error: asyncState.error,
  }), [call, asyncState]);
}